<?php

namespace Database\Seeders;

use App\Models\Sponsor;
use Illuminate\Database\Seeder;

class SponsorSeeder extends Seeder
{
    public function run(): void
    {
        $records = [
            [
                'name' => 'LionsGeek',
                'type' => 'technical_partner',
                'website_url' => null,
                'path' => 'lionsgeek.png',
                'description' => [
                    'en' => "LionsGeek is the result of a partnership between 2M, MolenGeek, Charlewood, the Belgian Radio and Television RTBF; as well as the Ministry of Economic Inclusion, Small Business, Employment, and Skills, the Wallonia-Brussels Region, through the General Delegation of Wallonia-Brussels in Morocco, and the Association for the Promotion of Education and Training Abroad (APEFE). It is an association focused on an inclusive action in favor of young people in NEET (Not in Education, Employment, or Training) situations. LionsGeek offers diverse support tailored to the needs of each individual, centered around three main areas of intervention: a full-time training program, an incubator for project holders, and a coworking space. LionsGeek aims to meet the various expectations of young people and the job market through long-term training, short courses, and certification programs in multimedia and digital fields."
                ]
            ],
            [
                'name' => 'IECD',
                'type' => 'technical_partner',
                'website_url' => null,
                'path' => "RMed_Logo_IECD.png",
                'description' => [
                    'en' => "The Mediterranean New Chance Network is a project led by the European Institute for Cooperation and Development (IECD), an international solidarity organization founded in 1988 and recognized as a public-interest entity. Its mission is to unite and strengthen innovative and sustainable socio-professional integration programs in the Mediterranean region, in order to offer new opportunities to young people in vulnerable situations."
                ]
            ],
            [
                'name' => 'Kamlin Lab',
                'type' => 'technical_partner',
                'website_url' => null,
                'path' => "kamlin.jpeg",
                'description' => [
                    'en' => "Kamlin Lab transforms social action by combining innovation and commitment. We provide associations with digital tools and tailored training to strengthen their impact, visibility, and access to funding. Through our hybrid platform, we connect associations with strategic partners and facilitate their professionalization. By integrating technology at the core of our solutions, we optimize the management, communication, and field engagement of civil society actors. Kamlin Lab: the digital lever that energizes civil society and amplifies its impact!"
                ]
            ],
            [
                'name' => 'Africa 50',
                'type' => 'sponsor',
                'website_url' => null,
                'path' => 'Africa_50.jpg',
            ],
            [
                'name' => 'UCGC',
                'type' => 'sponsor',
                'website_url' => null,
                'path' => 'ucgc.jpg',
            ],
            [
                'name' => 'EPIC Africa',
                'type' => 'sponsor',
                'website_url' => null,
                'path' => 'epic-afric.jpg',
            ],
            [
                'name' => 'PAN',
                'type' => 'sponsor',
                'website_url' => null,
                'path' => 'pan.jpeg',
            ],
            [
                'name' => 'OUNUSIDA',
                'type' => 'sponsor',
                'website_url' => null,
                'path' => '1.jpeg',
            ],
            [
                'name' => 'OIT',
                'type' => 'sponsor',
                'website_url' => null,
                'path' => '2.jpeg',
            ],
            [
                'name' => 'UNFPA',
                'type' => 'sponsor',
                'website_url' => null,
                'path' => '3.jpeg',
            ],
            [
                'name' => 'CNUCED',
                'type' => 'sponsor',
                'website_url' => null,
                'path' => '4.jpeg',
            ],
            [
                'name' => 'IOM',
                'type' => 'sponsor',
                'website_url' => null,
                'path' => '5.jpeg',
            ],
            [
                'name' => 'IECD',
                'type' => 'technical_partner',
                'website_url' => null,
                'path' => 'Méditerranée.jpg',
            ],
            [
                'name' => 'JADARA',
                'type' => 'organizer',
                'website_url' => null,
                'path' => 'Jadaralogo.png',
                'description' => [
                    'en' => "A Moroccan non-profit association recognized as serving the public good, created in 2002. Its mission is to allow every young person to choose and build their future with confidence and ambition, without being subjected to social, territorial, disability, or gender determinism. Every year, we search for, mobilize, and identify young people to inspire, guide, support them financially, provide them with a mentor, and develop their transversal skills. To achieve this, we deploy social ascent programs supported by educational partners, impact-driven companies, committed volunteers, and donors who are sensitive to our cause. The Foundation, with over two decades of experience, has developed a robust model that positions it today as a key player in the third sector. This long journey has been marked by impact and sustainable successes, allowing the Foundation to consolidate its reputation as a catalyst for social ascent in Morocco. Today, as a reliable third-sector actor, the Foundation continues to work with determination to contribute to significant and lasting changes, further strengthening its position as a trusted partner and engine for social progress that has transformed the lives of over 2,750 young people in Morocco."
                ]
            ],
        ];

        foreach ($records as $data) {
            Sponsor::updateOrCreate(
                ['name' => $data['name']],
                [
                    'type' => $data['type'],
                    'website_url' => $data['website_url'] ?? null,
                    'description' => $data['description'] ?? null,
                    'path' => "sponsors/" . $data['path'] ?? '',
                ]
            );
        }
    }
}
