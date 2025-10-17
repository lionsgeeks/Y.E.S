<?php

use App\Http\Controllers\ScientificCommitteeController;
use Illuminate\Support\Facades\Route;

Route::prefix('admin')->group(function () {
    Route::middleware(['auth', 'verified'])->group(function () {


        Route::get('scientific-committees', [ScientificCommitteeController::class, 'index'])->name('admin.scientific-committees.index');
        Route::post('scientific-committees', [ScientificCommitteeController::class, 'store'])->name('admin.scientific-committees.store');
        Route::post('scientific-committees/{scientificCommittee}', [ScientificCommitteeController::class, 'update'])->name('admin.scientific-committees.update');
        Route::delete('scientific-committees/{scientificCommittee}', [ScientificCommitteeController::class, 'destroy'])->name('admin.scientific-committees.destroy');

    });
});

