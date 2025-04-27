export interface Excursion {
  id: string;
  title: string;
  description: string;
  image: string;
  imageUrl?: string;
  video?: string;
  price: number;
  highlights: string[];
  duration: string;
  maxParticipants?: number;
  rating?: number;
  reviewCount?: number;
  isFeatured?: boolean;
  seasonality?: string;
  difficulty?: string;
  details: {
    includes: string[];
    excludes: string[];
    itinerary: {
      time: string;
      activity: string;
      description?: string;
    }[];
  };
}

export const excursions: Excursion[] = [
  {
    id: 'ourika-valley',
    title: 'Ourika Valley Exclusive',
    description: 'Immerse yourself in the magnificent beauty of the Ourika Valley. Our exclusive guided tour takes you deep into the heart of the Atlas foothills, where cascading waterfalls and authentic Berber villages await. Experience the rich cultural heritage and breathtaking landscapes of Morocco\'s most enchanting valley.',
    image: 'from-green-400 to-emerald-600',
    imageUrl: 'https://images.unsplash.com/photo-1548784764-1cc9423a5b02?q=80&w=1600&auto=format&fit=crop',
    video: '/videos/ourika-valley.mp4',
    price: 129,
    highlights: [
      'Private guided exploration of seven stunning waterfalls with expert local guides',
      'Exclusive access to remote, less-visited Berber villages away from tourist crowds',
      'Authentic Moroccan tea ceremony in a traditional family home with panoramic mountain views',
      'Gourmet picnic lunch featuring local organic ingredients in a scenic valley setting',
      'Opportunity to purchase authentic, handcrafted Berber artifacts directly from artisans'
    ],
    duration: 'Full Day (9 hours)',
    maxParticipants: 8,
    rating: 4.8,
    reviewCount: 187,
    isFeatured: true,
    seasonality: 'Year-round, best in spring and fall',
    difficulty: 'Moderate',
    details: {
      includes: [
        'Luxury air-conditioned vehicle with professional driver',
        'Expert English-speaking cultural guide with academic background',
        'Private guided waterfall tour with safety equipment',
        'Gourmet traditional lunch with premium Moroccan specialties',
        'Artisanal Moroccan tea and pastry tasting experience',
        'All entrance fees and local gratuities',
        'Bottled water and refreshments throughout the journey'
      ],
      excludes: [
        'Personal souvenir purchases',
        'Additional activities outside the scheduled itinerary',
        'Travel insurance (recommended)'
      ],
      itinerary: [
        { 
          time: '8:00 AM', 
          activity: 'Luxury hotel pickup', 
          description: 'Your personal guide and driver will meet you in a premium air-conditioned vehicle for a comfortable start to your adventure.'
        },
        { 
          time: '9:15 AM', 
          activity: 'Scenic Atlas Mountain drive',
          description: 'Journey through stunning landscapes with photo stops at panoramic viewpoints showcasing the majestic Atlas range.'
        },
        { 
          time: '10:00 AM', 
          activity: 'Exclusive visit to a traditional Berber village',
          description: 'Explore an authentic mountain settlement with your cultural expert and learn about indigenous Amazigh traditions.'
        },
        { 
          time: '11:30 AM', 
          activity: 'Private guided hike to the hidden waterfalls',
          description: 'Your personal mountain guide will lead you along scenic trails to discover cascading waterfalls away from tourist crowds.'
        },
        { 
          time: '1:30 PM', 
          activity: 'Gourmet Moroccan lunch experience',
          description: 'Savor a curated meal of authentic delicacies prepared with local organic ingredients at a premium mountain restaurant with valley views.'
        },
        { 
          time: '3:00 PM', 
          activity: 'Exclusive visit to artisanal argan oil cooperative',
          description: 'Witness the traditional production process and receive a complimentary argan product gift.'
        },
        { 
          time: '4:15 PM', 
          activity: 'Authentic tea ceremony with a Berber family',
          description: 'Be welcomed into a private home for an intimate cultural exchange and traditional mint tea preparation.'
        },
        { 
          time: '5:30 PM', 
          activity: 'Scenic return journey at golden hour',
          description: 'Enjoy the changing colors of the mountains as the sun begins to set, with one final panoramic photo stop.'
        },
        { 
          time: '6:30 PM', 
          activity: 'Luxury return transfer to your hotel',
          description: 'Comfortable drive back to your accommodation with personalized service until the very end of your journey.'
        }
      ]
    }
  },
  {
    id: 'oukaimeden-peak',
    title: 'Oukaimeden Alpine Experience',
    description: 'Ascend to the summit of luxury with our exclusive Oukaimeden Peak expedition. Journey to Africa\'s premier ski resort and witness breathtaking alpine vistas from privileged viewpoints. This bespoke mountain adventure combines exhilarating natural beauty with refined comfort for the discerning traveler seeking rarified experiences.',
    image: 'from-blue-400 to-indigo-600',
    imageUrl: 'https://images.unsplash.com/photo-1514410757834-9f421915e1a3?q=80&w=1600&auto=format&fit=crop',
    price: 179,
    highlights: [
      'Private expedition to the highest ski resort in Africa with VIP access',
      'Exclusive helicopter fly-over option for breathtaking aerial mountain views (seasonal supplement)',
      'Encounter indigenous wildlife and rare alpine flora with an expert naturalist',
      'Luxury mountain picnic featuring gourmet Moroccan cuisine and fine wine',
      'Private access to traditional Berber homes closed to general tourists'
    ],
    duration: 'Full Day (10 hours)',
    maxParticipants: 6,
    rating: 4.9,
    reviewCount: 124,
    isFeatured: true,
    seasonality: 'Summer for hiking, winter for snow experiences',
    difficulty: 'Moderate to challenging',
    details: {
      includes: [
        'Premium 4x4 transportation with professional driver',
        'Expert alpine guide with extensive mountain knowledge',
        'Gourmet picnic lunch with fine wine pairing (non-alcoholic options available)',
        'Professional nature photography service with digital album',
        'Premium thermal outerwear rental for cold weather (if needed)',
        'Cable car priority passes (when operational)',
        'Exclusive access to private mountain chalets for rest periods'
      ],
      excludes: [
        'Optional helicopter tour (available for booking)',
        'Personal ski equipment rental (can be arranged)',
        'Specialized activities beyond the scheduled itinerary'
      ],
      itinerary: [
        { 
          time: '7:30 AM', 
          activity: 'VIP hotel pickup in luxury 4x4 vehicle',
          description: 'Begin your adventure with a comfortable pickup in a premium vehicle equipped with refreshments and Wi-Fi.'
        },
        { 
          time: '8:45 AM', 
          activity: 'First light mountain drive with breakfast stop',
          description: 'Enjoy fresh pastries and Moroccan coffee at an exclusive mountainside café with panoramic views.'
        },
        { 
          time: '10:00 AM', 
          activity: 'Arrival at Oukaimeden with welcome reception',
          description: 'Receive a personalized orientation and equipment check with your private mountain guide.'
        },
        { 
          time: '10:30 AM', 
          activity: 'Private guided alpine exploration',
          description: 'Discover hidden viewpoints and photography opportunities inaccessible to regular visitors.'
        },
        { 
          time: '12:30 PM', 
          activity: 'Exclusive mountaintop gourmet lunch experience',
          description: 'Savor a chef-prepared meal at 3,000m elevation with 360° mountain panoramas and fine wine pairing.'
        },
        { 
          time: '2:00 PM', 
          activity: 'Cable car journey or private trek (seasonal)',
          description: 'Experience priority access to mountain transport or continue with a tailored hiking route to spectacular vistas.'
        },
        { 
          time: '3:30 PM', 
          activity: 'Private visit to an authentic mountain village',
          description: 'Gain privileged access to traditional homes and witness ancient customs preserved for generations.'
        },
        { 
          time: '5:00 PM', 
          activity: 'Afternoon tea and relaxation at alpine chalet',
          description: 'Unwind in a private mountain lodge with refreshments before beginning your descent.'
        },
        { 
          time: '6:00 PM', 
          activity: 'Scenic descent with sunset champagne toast',
          description: 'Witness the mountains bathed in golden light while enjoying premium champagne at a scenic overlook.'
        },
        { 
          time: '7:30 PM', 
          activity: 'Luxury return transfer with evening refreshments',
          description: 'Relax with gourmet snacks and beverages during your comfortable journey back to your accommodation.'
        }
      ]
    }
  },
  {
    id: 'asni-valley',
    title: 'Asni Valley Luxury Retreat',
    description: 'Curated for the distinguished traveler, our Asni Valley experience transcends ordinary tourism. Immerse yourself in the authentic rhythm of Berber life through privileged access to traditional markets, private estates, and panoramic vistas. Indulge in the genuine hospitality of the Atlas while enjoying discreet luxury and personalized service.',
    image: 'from-yellow-400 to-amber-600',
    imageUrl: 'https://images.unsplash.com/photo-1518614768660-324c19c64f12?q=80&w=1600&auto=format&fit=crop',
    price: 155,
    highlights: [
      'Exclusive early access to the renowned Saturday Berber market before public opening',
      'Private viewing points of Mount Toubkal with champagne service',
      'Personal invitation to an ancestral Berber home with traditional ceremonial welcome',
      'Curated tasting journey featuring premium local saffron, honey, and organic produce',
      'Bespoke souvenir crafted by master artisans during your visit'
    ],
    duration: 'Full Day (9 hours)',
    maxParticipants: 8,
    rating: 4.7,
    reviewCount: 156,
    isFeatured: false,
    seasonality: 'Year-round, spectacular in autumn',
    difficulty: 'Easy to moderate',
    details: {
      includes: [
        'Luxury vehicle transportation with professional driver',
        'Elite cultural guide with anthropological expertise',
        'Gourmet Moroccan lunch in a private garden setting',
        'Exclusive artisan workshop demonstrations',
        'Premium tasting experiences of local delicacies',
        'Custom artisanal gift package with local products',
        'Professional photography service throughout your journey'
      ],
      excludes: [
        'Custom orders from artisan workshops beyond included gift',
        'Equestrian activities (available as premium add-on)',
        'Spa treatments at mountain retreat (can be arranged)'
      ],
      itinerary: [
        { 
          time: '8:00 AM', 
          activity: 'Deluxe hotel collection with morning refreshments',
          description: 'Begin your journey with fresh juice, pastries, and coffee served in your premium vehicle.'
        },
        { 
          time: '9:00 AM', 
          activity: 'Exclusive photo stop at Atlas panoramic viewpoint',
          description: 'Capture spectacular mountain vistas with the assistance of your personal photography guide.'
        },
        { 
          time: '9:45 AM', 
          activity: 'Private early access to traditional Berber market',
          description: 'Experience the authentic souk before public opening with expert guidance on cultural significance and traditions.'
        },
        { 
          time: '11:30 AM', 
          activity: 'VIP visit to premium argan oil and saffron producers',
          description: 'Meet master producers and participate in an exclusive tasting and production demonstration.'
        },
        { 
          time: '1:00 PM', 
          activity: 'Gourmet lunch in private mountain garden estate',
          description: 'Enjoy a chef-prepared feast of regional specialties in an exclusive setting with mountain views.'
        },
        { 
          time: '2:45 PM', 
          activity: 'Special invitation to centuries-old Berber family home',
          description: 'Be welcomed with traditional ceremonies and rare insights into domestic architecture and family traditions.'
        },
        { 
          time: '4:15 PM', 
          activity: 'Private tea ceremony with mountain honey tasting',
          description: 'Participate in the preparation of authentic mint tea paired with regional honey varieties.'
        },
        { 
          time: '5:15 PM', 
          activity: 'Sunset champagne toast at exclusive viewpoint',
          description: 'Witness the changing colors of the valley while enjoying premium champagne and canapés.'
        },
        { 
          time: '6:30 PM', 
          activity: 'Luxury return transfer with evening digestifs',
          description: 'Reflect on your journey while enjoying artisanal Moroccan digestifs during your comfortable return.'
        }
      ]
    }
  }
]; 