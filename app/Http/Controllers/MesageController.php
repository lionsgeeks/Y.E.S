<?php

namespace App\Http\Controllers;

use App\Mail\ContactMail;
use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class MesageController extends Controller
{
    public function index()
    {
        $messages = Message::all()->sortByDesc("created_at");
        return view("messages.messages", compact("messages"));
    }
    public function update(Request $request, Message $message)
    {
        $message->update(['mark_as_read' => !$message->mark_as_read]);
        return back();
    }
    public function destroy(Message $message)
    {
        $message->delete();
        return back();
    }


    public function store(Request $request)
    {
        $request->validate([
            "fullname" => "required",
            "email" => "required",
            "phone" => "required",
            "message" => "required"
        ]);
        // dd($request);
        Message::create([
            "fullname" => $request->fullname,
            "email" => $request->email,
            "phone" => $request->phone,
            "message" => $request->message,
        ]);
        $emailOrg = 'contact@youthempowermentsummit.africa';
        Mail::to($emailOrg)->send(new ContactMail($request->fullname, $request->email, $request->phone,  $request->message));
       return back();
    }
}
