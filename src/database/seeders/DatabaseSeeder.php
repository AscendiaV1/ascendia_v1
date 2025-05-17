<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use App\Models\Mentor;
use App\Models\MentorExpertise;
use App\Models\MentorLanguage;
use App\Models\MentorExperience;
use App\Models\MentorEducation;
use App\Models\MentorMentorshipArea;
use App\Models\MentorAchievement;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Crearea rolurilor
        Role::firstOrCreate(['name' => 'administrator']);
        Role::firstOrCreate(['name' => 'mentor']);
        Role::firstOrCreate(['name' => 'mentee']);

        $mentorRole = Role::where('name', 'mentor')->first();

        $user = User::create(
            [
                "name" => "test",
                "email" => "test@example.com",
                "password" => 'test',
            ]
        );

        $user->assignRole($mentorRole);
        $adminRole = Role::where('name', 'administrator')->first();
        $user->assignRole($adminRole);


        // Lista de mentori de creat
        $mentorsData = [
            [
                "user" => [
                    "name" => "Alex Johnson",
                    "email" => "alex.johnson@example.com",
                    "password" => "parola123",
                ],
                "mentor" => [
                    'name' => 'Alex Johnson',
                    'title' => 'Software Architect & Cloud Specialist',
                    'location' => 'New York, NY',
                    'rating' => 4.8,
                    'review_count' => 90,
                    'hourly_rate' => 120,
                    'about' => "Passionate about building scalable cloud architectures...",
                    'years_of_experience' => 15,
                    'available_now' => 0,
                ],
                "expertise" => [
                    ['expertise' => 'Cloud Computing'],
                    ['expertise' => 'Software Design'],
                ],
                "languages" => [
                    ['language' => 'English'],
                    ['language' => 'Spanish'],
                ],
                "experience" => [
                    [
                        'title' => 'Senior Software Engineer',
                        'company' => 'Amazon Web Services',
                        'period' => '2015 - 2020',
                        'description' => 'Developed scalable solutions for global clients.'
                    ],
                    [
                        'title' => 'Tech Lead',
                        'company' => 'Microsoft',
                        'period' => '2020 - Present',
                        'description' => 'Leading a team focusing on cloud security solutions.'
                    ]
                ],
                "education" => [
                    [
                        'degree' => 'M.S. in Computer Science',
                        'institution' => 'Columbia University',
                        'year' => '2013'
                    ],
                ],
                "mentorship_areas" => [
                    ['mentorship_area' => 'Cloud Architecture Design'],
                    ['mentorship_area' => 'Software Development Best Practices'],
                ],
                "achievements" => [
                    ['achievement' => 'AWS Certified Solutions Architect'],
                    ['achievement' => 'Microsoft MVP for Azure (2021)'],
                ]
            ],
            [
                "user" => [
                    "name" => "Maria Lopez",
                    "email" => "maria.lopez@example.com",
                    "password" => "parola123",
                ],
                "mentor" => [
                    'name' => 'Maria Lopez',
                    'title' => 'Product Manager & UX Specialist',
                    'location' => 'Austin, TX',
                    'rating' => 4.7,
                    'review_count' => 75,
                    'hourly_rate' => 110,
                    'about' => "Helping startups build user-centered products...",
                    'years_of_experience' => 5,
                    'available_now' => 1,
                ],
                "expertise" => [
                    ['expertise' => 'Product Management'],
                    ['expertise' => 'User Experience Design'],
                ],
                "languages" => [
                    ['language' => 'English'],
                    ['language' => 'French'],
                ],
                "experience" => [
                    [
                        'title' => 'Product Designer',
                        'company' => 'Airbnb',
                        'period' => '2016 - 2019',
                        'description' => 'Redesigned core user flows to improve retention.'
                    ],
                    [
                        'title' => 'Product Manager',
                        'company' => 'Stripe',
                        'period' => '2019 - Present',
                        'description' => 'Leading efforts on payment integrations for e-commerce.'
                    ]
                ],
                "education" => [
                    [
                        'degree' => 'B.A. in Interaction Design',
                        'institution' => 'University of Texas',
                        'year' => '2015'
                    ],
                ],
                "mentorship_areas" => [
                    ['mentorship_area' => 'Product Roadmap Development'],
                    ['mentorship_area' => 'UX Research and Usability Testing'],
                ],
                "achievements" => [
                    ['achievement' => 'Launched Stripe Atlas program'],
                    ['achievement' => 'Guest speaker at UX Week (2022)'],
                ]
            ],
            [
                "user" => [
                    "name" => "Sarah Connor",
                    "email" => "sarah.connor@example.com",
                    "password" => "parola123",
                ],
                "mentor" => [
                    'name' => 'Sarah Connor',
                    'title' => 'Cybersecurity Specialist',
                    'location' => 'Chicago, IL',
                    'rating' => 4.5,
                    'review_count' => 85,
                    'hourly_rate' => 130,
                    'about' => "Ensuring security in the digital age...",
                    'years_of_experience' => 20,
                    'available_now' => 1,
                ],
                "expertise" => [
                    ['expertise' => 'Cybersecurity'],
                    ['expertise' => 'Risk Assessment'],
                ],
                "languages" => [
                    ['language' => 'English'],
                    ['language' => 'Japanese'],
                ],
                "experience" => [
                    [
                        'title' => 'Security Analyst',
                        'company' => 'IBM',
                        'period' => '2010 - 2016',
                        'description' => 'Managed security protocols and vulnerability assessments.'
                    ],
                    [
                        'title' => 'Chief Security Officer',
                        'company' => 'Tesla',
                        'period' => '2016 - Present',
                        'description' => 'Leading the company’s cybersecurity strategy.'
                    ]
                ],
                "education" => [
                    [
                        'degree' => 'B.S. in Cybersecurity',
                        'institution' => 'MIT',
                        'year' => '2008'
                    ],
                ],
                "mentorship_areas" => [
                    ['mentorship_area' => 'Cyber Risk Management'],
                    ['mentorship_area' => 'Incident Response Planning'],
                ],
                "achievements" => [
                    ['achievement' => 'Certified Ethical Hacker (CEH)'],
                    ['achievement' => 'Cybersecurity Excellence Award (2022)'],
                ]
            ],
            [
                "user" => [
                    "name" => "Emily Davis",
                    "email" => "emily.davis@example.com",
                    "password" => "parola123",
                ],
                "mentor" => [
                    'name' => 'Emily Davis',
                    'title' => 'Digital Marketing Expert',
                    'location' => 'Los Angeles, CA',
                    'rating' => 4.6,
                    'review_count' => 78,
                    'hourly_rate' => 100,
                    'about' => "Helping businesses grow with effective marketing strategies...",
                    'years_of_experience' => 5,
                    'available_now' => 1,
                ],
                "expertise" => [
                    ['expertise' => 'SEO'],
                    ['expertise' => 'Content Marketing'],
                ],
                "languages" => [
                    ['language' => 'English'],
                    ['language' => 'Italian'],
                ],
                "experience" => [
                    [
                        'title' => 'SEO Specialist',
                        'company' => 'HubSpot',
                        'period' => '2015 - 2018',
                        'description' => 'Increased organic traffic for various clients.'
                    ],
                    [
                        'title' => 'Marketing Consultant',
                        'company' => 'Freelance',
                        'period' => '2018 - Present',
                        'description' => 'Developing strategies for startups and small businesses.'
                    ]
                ],
                "education" => [
                    [
                        'degree' => 'M.A. in Digital Marketing',
                        'institution' => 'UCLA',
                        'year' => '2014'
                    ],
                ],
                "mentorship_areas" => [
                    ['mentorship_area' => 'SEO Optimization'],
                    ['mentorship_area' => 'Content Strategy'],
                ],
                "achievements" => [
                    ['achievement' => 'Google Ads Certified'],
                    ['achievement' => 'Featured in Forbes Top 50 Marketers (2022)'],
                ]
            ],
            [
                "user" => [
                    "name" => "Michael Brown",
                    "email" => "michael.brown@example.com",
                    "password" => "parola123",
                ],
                "mentor" => [
                    'name' => 'Michael Brown',
                    'title' => 'Blockchain Developer',
                    'location' => 'Miami, FL',
                    'rating' => 4.9,
                    'review_count' => 112,
                    'hourly_rate' => 160,
                    'about' => "Specialist in decentralized applications and blockchain solutions...",
                    'years_of_experience' => 9,
                    'available_now' => 0,
                ],
                "expertise" => [
                    ['expertise' => 'Blockchain Development'],
                    ['expertise' => 'Smart Contracts'],
                ],
                "languages" => [
                    ['language' => 'English'],
                    ['language' => 'Russian'],
                ],
                "experience" => [
                    [
                        'title' => 'Blockchain Engineer',
                        'company' => 'Ripple',
                        'period' => '2016 - 2020',
                        'description' => 'Developed and maintained blockchain payment systems.'
                    ],
                    [
                        'title' => 'Lead Developer',
                        'company' => 'Ethereum Foundation',
                        'period' => '2020 - Present',
                        'description' => 'Contributing to Ethereum scalability projects.'
                    ]
                ],
                "education" => [
                    [
                        'degree' => 'B.S. in Computer Engineering',
                        'institution' => 'University of Florida',
                        'year' => '2015'
                    ],
                ],
                "mentorship_areas" => [
                    ['mentorship_area' => 'Decentralized Finance'],
                    ['mentorship_area' => 'Blockchain Scalability'],
                ],
                "achievements" => [
                    ['achievement' => 'Created an open-source blockchain toolkit'],
                    ['achievement' => 'Speaker at Blockchain Expo (2023)'],
                ]
            ],
            [
                "user" => [
                    "name" => "Sophia Turner",
                    "email" => "sophia.turner@example.com",
                    "password" => "parola123",
                ],
                "mentor" => [
                    'name' => 'Sophia Turner',
                    'title' => 'Artificial Intelligence Researcher',
                    'location' => 'Boston, MA',
                    'rating' => 4.8,
                    'review_count' => 95,
                    'hourly_rate' => 140,
                    'about' => "Advancing AI technologies for real-world applications...",
                    'years_of_experience' => 10,
                    'available_now' => 1,
                ],
                "expertise" => [
                    ['expertise' => 'Natural Language Processing'],
                    ['expertise' => 'Computer Vision'],
                ],
                "languages" => [
                    ['language' => 'English'],
                    ['language' => 'Chinese'],
                ],
                "experience" => [
                    [
                        'title' => 'AI Researcher',
                        'company' => 'OpenAI',
                        'period' => '2017 - 2021',
                        'description' => 'Developed cutting-edge NLP models.'
                    ],
                    [
                        'title' => 'Senior Scientist',
                        'company' => 'DeepMind',
                        'period' => '2021 - Present',
                        'description' => 'Leading computer vision research.'
                    ]
                ],
                "education" => [
                    [
                        'degree' => 'Ph.D. in Artificial Intelligence',
                        'institution' => 'MIT',
                        'year' => '2016'
                    ],
                ],
                "mentorship_areas" => [
                    ['mentorship_area' => 'AI Ethics'],
                    ['mentorship_area' => 'Machine Learning Models'],
                ],
                "achievements" => [
                    ['achievement' => 'Published 15 research papers in AI'],
                    ['achievement' => 'Best Paper Award at NeurIPS (2022)'],
                ]
            ],
        ];

        // Crearea utilizatorilor și a mentorilor
        foreach ($mentorsData as $data) {
            $user = User::create($data['user']);
            $user->assignRole($mentorRole);

            $mentor = Mentor::create(array_merge($data['mentor'], ['user_id' => $user->id]));

            $mentor->expertise()->createMany($data['expertise']);
            $mentor->languages()->createMany($data['languages']);
            $mentor->experience()->createMany($data['experience']);
            $mentor->education()->createMany($data['education']);
            $mentor->mentorshipAreas()->createMany($data['mentorship_areas']);
            $mentor->achievements()->createMany($data['achievements']);
        }

        DB::table('learning_sessions')->insert([
            [
                'mentor_id' => 1, // ID-ul mentorului Alex Johnson
                'user_id' => 2,   // ID-ul utilizatorului Maria Lopez
                'topic' => 'Cloud Architecture Design',
                'date' => now()->addDays(3), // sesiune programată pentru 3 zile
                'duration' => 60, // durată 60 de minute
                'status' => 'Upcoming',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'mentor_id' => 3, // ID-ul mentorului Sarah Connor
                'user_id' => 4,   // ID-ul utilizatorului Emily Davis
                'topic' => 'Cyber Risk Management',
                'date' => now()->addDays(2), // sesiune programată pentru 2 zile
                'duration' => 90, // durată 90 de minute
                'status' => 'Upcoming',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'mentor_id' => 5, // ID-ul mentorului Michael Brown
                'user_id' => 6,   // ID-ul utilizatorului Sophia Turner
                'topic' => 'Blockchain Scalability',
                'date' => now()->addDays(5), // sesiune programată pentru 5 zile
                'duration' => 120, // durată 120 de minute
                'status' => 'Upcoming',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
        DB::table('messages')->insert([
            [
                'learning_sessions_id' => 1, // ID-ul sesiunii de învățare între Alex Johnson și Maria Lopez
                'sender' => 'mentor',
                'content' => 'Hi Maria, I look forward to our session on Cloud Architecture Design.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'learning_sessions_id' => 1, // ID-ul sesiunii de învățare între Alex Johnson și Maria Lopez
                'sender' => 'mentee',
                'content' => 'Thank you, Alex! I am excited to learn more about cloud solutions.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'learning_sessions_id' => 2, // ID-ul sesiunii de învățare între Sarah Connor și Emily Davis
                'sender' => 'mentor',
                'content' => 'Hey Emily, let\'s discuss Cyber Risk Management during our session.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'learning_sessions_id' => 2, // ID-ul sesiunii de învățare între Sarah Connor și Emily Davis
                'sender' => 'mentee',
                'content' => 'Looking forward to learning more about cybersecurity risks.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);


        DB::table('resources')->insert([
            [
                'learning_sessions_id' => 1, // ID-ul sesiunii de învățare între Alex Johnson și Maria Lopez
                'title' => 'Cloud Architecture Best Practices',
                'url' => 'https://example.com/cloud-architecture',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'learning_sessions_id' => 2, // ID-ul sesiunii de învățare între Sarah Connor și Emily Davis
                'title' => 'Cyber Risk Assessment Tools',
                'url' => 'https://example.com/cyber-risk-tools',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'learning_sessions_id' => 3, // ID-ul sesiunii de învățare între Michael Brown și Sophia Turner
                'title' => 'Blockchain Scalability Explained',
                'url' => 'https://example.com/blockchain-scalability',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
