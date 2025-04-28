import { StaticImageData } from 'next/image';
import { ImageKitGallery } from '@/components/ImageKitImage';
export interface Activity {
  id: string;
  title: string;
  type: string;
  image: string | StaticImageData;
  gallery: string[];
  description: string;
  groupPrice: number; // Group tour price
  privatePrice: number; // Private tour price
  duration: string;
  location: string;
  longDescription: string;
  highlights: string[];
  included: string[];
  rating: number;
  reviewCount: number;
  maxParticipants: number;
}

// Ourika Valley Activity
export const ourikaActivity: Activity = {
  id: 'ourika-valley',
  title: 'Ourika Valley',
  type: 'OURIKA',
  image: ImageKitGallery.valleys.ourika,
  gallery: ImageKitGallery.ourikaGallery,
  description: 'Explore waterfalls and authentic Berber villages nestled in the foothills of the Atlas Mountains.',
  groupPrice: 30, // €30 for group tour (adults)
  privatePrice: 50, // €50 for private tour (adults)
  duration: '8 hours',
  location: 'Atlas Mountains',
  longDescription: 'Experience the breathtaking beauty of the Ourika Valley with our guided tour. Explore scenic valleys with their waterfalls, traditional Berber villages, and mountain landscapes. This full-day excursion offers a perfect blend of nature, culture, and adventure.',
  highlights: [
    'Visit traditional Berber villages and experience local culture',
    'Enjoy spectacular mountain and valley views',
    'Discover beautiful waterfalls in their natural setting',
    'Savor authentic Moroccan cuisine for lunch',
    'Travel in comfort with air-conditioned transportation'
  ],
  included: [
    'Hotel pickup and drop-off',
    'Transportation in air-conditioned vehicle',
    'Professional English-speaking guide'
  ],
  rating: 4.8,
  reviewCount: 124,
  maxParticipants: 12
};

// Three Valleys Activity (Marrakech + Agafay + Lake Lalla Takerkoust)
export const threeValleysActivity: Activity = {
  id: 'three-valleys',
  title: '3 Valleys Atlas Adventure',
  type: 'EXCURSION',
  image: ImageKitGallery.threeValleysGallery[0], // Updated image URL
  gallery: ImageKitGallery.threeValleysGallery,
  description: 'An adventurous day trip through Marrakech, Agafay Desert, Lake Lalla Takerkoust, Kik Plateau, Asni and back to Marrakech.',
  groupPrice: 100, // €100 for group tour (adults)
  privatePrice: 150, // €150 for private tour (adults)
  duration: '9 hours',
  location: 'Atlas Mountains & Agafay Desert',
  longDescription: 'An early departure in 4x4 for your private day tour, you start from Marrakech at 9:00 a.m. and set off to discover the Agafay desert, just 30 mins from Marrakech city. For those who haven\'t got sufficient time for a desert tour from Marrakech, all the way south to the Sahara dunes, then Agafay desert is the next best thing. Unlike the Sahara though this is not a sand desert - Its more of an undulating, baked limestone and clay plateau. Sandstone crags, traditional earth-built villages, dusty river beds are interspersed with spectacular lush pasture and flora in the spring. You travel off-road passing a small lake and Berber villages and have time to get out and walk for a while along the tracks if you wish. The road then heads towards the lake of Lalla Takerkoust, which is in fact a hydro-electricity reservoir. After lunch you continue your journey eastwards and head for the Kik Plateau where you will stop for refreshments from a high vantage point, before then taking the road to the village of Moulay Brahim, with its famous holy shrine. Finally the road descends into the market town of Asni at the foot of the Atlas Mountains.',
  highlights: [
    'Discover the unique landscape of Agafay desert - an undulating, baked limestone and clay plateau',
    'Explore traditional earth-built Berber villages',
    'Visit Lake Lalla Takerkoust with optional activities',
    'Enjoy panoramic views from Kik Plateau',
    'Visit the market town of Asni at the foot of the Atlas Mountains',
    'Option to take a camel ride and have tea in a Berber village'
  ],
  included: [
    'Hotel pickup and drop-off',
    'Transportation in 4x4 vehicle',
    'Professional English-speaking guide'

  ],
  rating: 4.9,
  reviewCount: 156,
  maxParticipants: 8
};

// Available activities
export const activities = [
  ourikaActivity,
  threeValleysActivity
];

// Function to get activity by ID
export const getActivityById = (id: string): Activity | undefined => {
  return activities.find(activity => activity.id === id);
};

// Calculate tour price based on participants and tour type
export const calculateTourPrice = (
  activity: Activity,
  isPrivate: boolean,
  adults: number,
  children: number,
  youngChildren: number
): number => {
  // Base price per adult based on tour type
  const adultPrice = isPrivate ? activity.privatePrice : activity.groupPrice;
  
  // Children 3-5 years pay half price
  const childPrice = adultPrice / 2;
  
  // Children under 3 years are free
  const youngChildPrice = 0;
  
  // Calculate total price
  const total = (adults * adultPrice) + (children * childPrice) + (youngChildren * youngChildPrice);
  
  return total;
}; 