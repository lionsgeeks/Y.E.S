<?php

namespace Database\Seeders;

use App\Models\ScientificCommittee;
use Illuminate\Database\Seeder;

class ScientificCommitteeSeeder extends Seeder
{
    public function run(): void
    {
        $members = [
            [
                'name' => 'M. Jean Pierre ELONG MBASSI',
                'position' => 'Secretary General of the United Cities and Local Governments of Africa - President of the Scientific Committee',
                'photo_path' => 'comittee-scientifique/Mbassi.jpg',
                'linkedin_url' => 'https://www.linkedin.com/in/jean-pierre-elong-mbassi-9b2b3ab9',
                'order' => 1,
            ],
            [
                'name' => 'M. Hamid BEN ELAFDIL',
                'position' => 'Talent and Startup Finder & Social Entrepreneur & President of Jadara Foundation',
                'photo_path' => 'comittee-scientifique/BENELAFDIL.jpg',
                'linkedin_url' => 'https://www.linkedin.com/in/hamidbenelafdil',
                'order' => 2,
            ],
            [
                'name' => 'Mme. Ileana SANTOS',
                'position' => "Strategy Consultant and Co-founder of Je M'engage pour l'Afrique",
                'photo_path' => '/comittee-scientifique/SANTOS.jfif',
                'linkedin_url' => 'https://www.linkedin.com/in/ileana-santos-243b31108',
                'order' => 3,
            ],
            [
                'name' => 'Salaheddine BAKOR',
                'position' => 'Deputy Secretary General of the Pan-African Youth Union',
                'photo_path' => 'comittee-scientifique/bakor.jpg',
                'linkedin_url' => 'https://www.linkedin.com/in/salaheddine-bakor-01913359/',
                'order' => 4,
            ],
            [
                'name' => 'BENING AHMED WIISICHONG',
                'position' => 'General Secretary of the Pan-African Youth Union',
                'photo_path' => 'comittee-scientifique/bening.jpg',
                'linkedin_url' => 'https://www.linkedin.com/in/bening-ahmed-wiisichong-76663828/',
                'order' => 5,
            ],
            [
                'name' => 'Mme Hasnaâ BOUTZIL',
                'position' => 'Speaker, trainer, moderator, coach, strategy and development advisor',
                'photo_path' => 'comittee-scientifique/BOUTZIL.jfif',
                'linkedin_url' => 'https://www.linkedin.com/in/hasna%C3%A2-boutzil-9787ab24',
                'order' => 6,
            ],
            [
                'name' => 'M. Cheikh MAMINA DIEDHIOU',
                'position' => 'Senior ESG Officer - AFRICA 50',
                'photo_path' => 'comittee-scientifique/Diedhiou.jfif',
                'linkedin_url' => 'https://www.linkedin.com/in/cheikh-mamina-diedhiou-14b2931a',
                'order' => 7,
            ],
            [
                'name' => 'Mme Khadija BOUJANOUI',
                'position' => 'Director of the Support Department at 2M, President of the Gender Equality and Diversity Committee - President of Lions Geek',
                'photo_path' => 'comittee-scientifique/BOUJANOUI.jpg',
                'linkedin_url' => 'https://www.linkedin.com/in/khadija-boujanoui',
                'order' => 8,
            ],
            [
                'name' => 'M. Abdou SOULEYE DIOP',
                'position' => 'Managing Partner - FORVIS MAZARS',
                'photo_path' => 'comittee-scientifique/DIOP.jfif',
                'linkedin_url' => 'https://www.linkedin.com/in/abdoudiop',
                'order' => 9,
            ],
        ];

        foreach ($members as $member) {
            ScientificCommittee::updateOrCreate(['name' => $member['name']], $member);
        }
    }
}


