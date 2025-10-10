<?php

namespace Database\Seeders;

use App\Models\Sponsor;
use Illuminate\Database\Seeder;

class SponsorSeeder extends Seeder
{
    public function run(): void
    {
// hada gha bach thayad dok import mn assets o bach matinserihomch wahda b wahda fakart lik nta li katqra 
        $records = [
            ['name' => 'LionsGeek', 'type' => 'technical_partner', 'website_url' => null, 'path' => 'assets/images/sponsors/lionsgeek.png'],
            ['name' => 'IECD', 'type' => 'technical_partner', 'website_url' => null, 'path' => "assets/images/sponsors/RMed_Logo_IECD.png"],
            ['name' => 'Kamlin Lab', 'type' => 'technical_partner', 'website_url' => null, 'path' => "assets/images/sponsors/kamlin.jpeg"],
            ['name' => 'Africa 50', 'type' => 'sponsor', 'website_url' => null, 'path' => 'assets/images/sponsors/Africa_50.jpg'],
            ['name' => 'UCGC', 'type' => 'sponsor', 'website_url' => null, 'path' => 'assets/images/sponsors/ucgc.jpg'],
            ['name' => 'EPIC Africa', 'type' => 'sponsor', 'website_url' => null, 'path' => 'assets/images/sponsors/epic-afric.jpg'],
            ['name' => 'PAN', 'type' => 'sponsor', 'website_url' => null, 'path' => 'assets/images/sponsors/pan.jpeg'],
            ['name' => 'OUNUSIDA', 'type' => 'sponsor', 'website_url' => null, 'path' => 'assets/images/sponsors/1.jpeg'],
            ['name' => 'OIT', 'type' => 'sponsor', 'website_url' => null, 'path' => 'assets/images/sponsors/2.jpeg'],
            ['name' => 'UNFPA', 'type' => 'sponsor', 'website_url' => null, 'path' => 'assets/images/sponsors/3.jpeg'],
            ['name' => 'CNUCED', 'type' => 'sponsor', 'website_url' => null, 'path' => 'assets/images/sponsors/4.jpeg'],
            ['name' => 'IOM', 'type' => 'sponsor', 'website_url' => null, 'path' => 'assets/images/sponsors/5.jpeg'],
            ['name' => 'MEDNC', 'type' => 'sponsor', 'website_url' => null, 'path' => 'assets/images/sponsors/Méditerranée.jpg'],
            ['name' => 'JADARA', 'type' => 'organizer', 'website_url' => null, 'path' => 'assets/images/sponsors/Jadaralogo.png'],
        ];

        foreach ($records as $data) {
            // Create without path first to satisfy non-nullable schemas
            $sponsor = Sponsor::firstOrCreate(
                ['name' => $data['name']],
                [
                    'type' => $data['type'],
                    'website_url' => $data['website_url'],
                    'description' => $data['description'] ?? null,
                    'path' => '', // temporary default
                ]
            );

            // Attempt to set image path from public assets folder
            $candidates = [
                // common filename patterns
                str($data['name'])->lower()->replace(' ', '-').'.png',
                str($data['name'])->lower()->replace(' ', '-').'.jpg',
                str($data['name'])->lower()->replace(' ', '-').'.jpeg',
                str($data['name'])->replace(' ', '_').'.png',
                str($data['name'])->replace(' ', '_').'.jpg',
                str($data['name'])->replace(' ', '_').'.jpeg',
                // explicit known filenames from the existing code
                'lionsgeek.png',
                'epic-afric.jpg',
                'pan.jpeg',
                'ucgc.jpg',
                'Africa_50.jpg',
                '1.jpeg','2.jpeg','3.jpeg','4.jpeg','5.jpeg',
            ];

            $basePublic = public_path('assets/images/sponsors');
            // if explicit 'path' provided and exists, keep; else try candidates
            if (!empty($data['path']) && is_file(public_path($data['path']))) {
                $sponsor->path = $data['path'];
                $sponsor->save();
            } else {
                foreach (array_unique($candidates) as $file) {
                    $full = $basePublic.DIRECTORY_SEPARATOR.$file;
                    if (is_file($full)) {
                        $relative = 'assets/images/sponsors/'.$file;
                        $sponsor->path = $relative;
                        $sponsor->save();
                        break;
                    }
                }
                // If nothing matched and still empty, keep empty string to satisfy NOT NULL
            }
        }
    }
}


