<?php

// Simple schema dumper for SQLite tables via Laravel's DB connection
// Usage: php scripts/dump_schema.php

use Illuminate\Contracts\Console\Kernel;
use Illuminate\Support\Facades\DB;

require __DIR__ . '/../vendor/autoload.php';

$app = require __DIR__ . '/../bootstrap/app.php';

// Bootstrap the console kernel to initialize the application fully
$kernel = $app->make(Kernel::class);
$kernel->bootstrap();

// Ensure we're on SQLite
$connectionName = config('database.default');
$driver = config("database.connections.$connectionName.driver");
if ($driver !== 'sqlite') {
    fwrite(STDERR, "This script expects SQLite connection. Current driver: {$driver}\n");
}

/**
 * Dump schema for a SQLite table using PRAGMA statements.
 */
function dumpTable(string $table): void
{
    echo "\n=== TABLE: {$table} ===\n";
    try {
        $columns = DB::select("PRAGMA table_info('{$table}')");
        if (empty($columns)) {
            echo "(no such table)\n";
            return;
        }
        echo "Columns:\n";
        foreach ($columns as $col) {
            // $col->cid, $col->name, $col->type, $col->notnull, $col->dflt_value, $col->pk
            $notnull = ((int)($col->notnull ?? 0)) === 1 ? 'NOT NULL' : 'NULL';
            $pk = ((int)($col->pk ?? 0)) === 1 ? ' PRIMARY KEY' : '';
            $default = isset($col->dflt_value) ? (" DEFAULT " . $col->dflt_value) : '';
            echo " - {$col->name} {$col->type} {$notnull}{$default}{$pk}\n";
        }

        $indexes = DB::select("PRAGMA index_list('{$table}')");
        if (!empty($indexes)) {
            echo "Indexes:\n";
            foreach ($indexes as $idx) {
                $name = $idx->name ?? '';
                $unique = ((int)($idx->unique ?? 0)) === 1 ? 'UNIQUE ' : '';
                $cols = DB::select("PRAGMA index_info('{$name}')");
                $colNames = array_map(fn($c) => $c->name, $cols);
                echo " - {$unique}{$name} (" . implode(', ', $colNames) . ")\n";
            }
        }

        $fks = DB::select("PRAGMA foreign_key_list('{$table}')");
        if (!empty($fks)) {
            echo "Foreign Keys:\n";
            foreach ($fks as $fk) {
                // $fk->id, $fk->seq, $fk->table, $fk->from, $fk->to, $fk->on_update, $fk->on_delete, $fk->match
                echo " - {$fk->from} -> {$fk->table}({$fk->to}) ON UPDATE {$fk->on_update} ON DELETE {$fk->on_delete}\n";
            }
        }
    } catch (Throwable $e) {
        echo "Error dumping {$table}: " . $e->getMessage() . "\n";
    }
}

$tables = [
    'shows',
    'bailleurs',
    'organizations',
    'entreprises',
    'agences',
    'publiques',
    'academiques',
    'map_verifications',
];

foreach ($tables as $table) {
    dumpTable($table);
}

echo "\nDone.\n";


