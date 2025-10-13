<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Mail\PasswordMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        $users = User::orderBy('created_at', 'desc')->get();
        
        return Inertia::render('admin/users/index', [
            'users' => $users,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
        ]);

        // Generate a random password
        $password = Str::random(12);
        
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($password),
            'email_verified_at' => now(), // Auto-verify for admin-created users
        ]);

        // Send password via email
        Mail::to($user->email)->send(new PasswordMail($user, $password));

        return redirect()->back()->with('success', 'User created successfully. Password sent via email.');
    }

    public function show(User $user)
    {
        return response()->json($user);
    }

    public function update(Request $request, User $user)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
        ]);

        $user->update([
            'name' => $request->name,
            'email' => $request->email,
        ]);

        return redirect()->back()->with('success', 'User updated successfully.');
    }

    public function destroy(User $user)
    {
        $user->delete();
        return redirect()->back()->with('success', 'User deleted successfully.');
    }

    public function resendPassword(User $user)
    {
        // Generate a new random password
        $password = Str::random(12);
        
        $user->update([
            'password' => Hash::make($password),
        ]);

        // Send new password via email
        Mail::to($user->email)->send(new PasswordMail($user, $password));

        return redirect()->back()->with('success', 'New password sent via email.');
    }
}
