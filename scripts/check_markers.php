<?php
use Illuminate\Contracts\Console\Kernel;
use Illuminate\Support\Facades\DB;
use App\Models\Show;

require __DIR__ . '/../vendor/autoload.php';
$app = require __DIR__ . '/../bootstrap/app.php';
$kernel = $app->make(Kernel::class);
$kernel->bootstrap();

$count = Show::where('approve', 1)->count();
echo "approve=1 shows: {$count}\n";

$rows = Show::with('showable')->where('approve', 1)->limit(5)->get();
foreach ($rows as $r) {
    $lat = $r->showable->lat ?? null;
    $lng = $r->showable->lng ?? null;
    echo $r->showable_type . " id=" . $r->showable_id . " lat=" . var_export($lat, true) . " lng=" . var_export($lng, true) . "\n";
}

echo "Done\n";


