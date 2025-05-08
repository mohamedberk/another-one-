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
  excludes?: string[]; // Added for new activities
  itinerary?: string[]; // Added for new activities
  rating: number;
  reviewCount: number;
  maxParticipants: number;
  tag?: string; // Added for new activities
}




// Agafay Desert Adventure
export const agafayDesertActivity: Activity = {
  id: 'agafay-desert-adventure',
  title: 'Agafay Desert Adventure',
  type: 'ADVENTURE',
  image: '/destination.jpg', // This should be updated with the correct path from ImageKitGallery
  gallery: ['/destination.jpg'], // This should be updated with the correct paths from ImageKitGallery
  description: 'Experience the rocky Agafay desert with its stunning views of the Atlas Mountains, just a short drive from Marrakech. This quad biking adventure offers an adrenaline-filled ride through breathtaking landscapes.',
  groupPrice: 39, 
  privatePrice: 59,
  duration: '4 hours',
  location: 'Palmeraie, Marrakech',
  longDescription: 'Experience the rocky Agafay desert with its stunning views of the Atlas Mountains, just a short drive from Marrakech. This quad biking adventure offers an adrenaline-filled ride through breathtaking landscapes, allowing you to explore the unique terrain of the Agafay desert. Enjoy panoramic views, traditional mint tea, and the thrill of off-road exploration.',
  highlights: [
    'Enjoy the wide rocky Agafay desert with views of the Atlas Mountains',
    'Experience an extreme quad biking adventure in wide open terrain',
    'Taste traditional Moroccan mint tea in a Berber tent',
    'Admire panoramic views of the lake and High Atlas Mountains'
  ],
  included: [
    'Air-conditioned round trip transportation',
    'Professional driver and guide',
    'Quad bike for 1h45',
    'Free mint tea',
    'WiFi on board'
  ],
  excludes: [
    'Meals',
    'Personal expenses',
    'Tips'
  ],
  itinerary: [
    'Hotel pickup in air-conditioned vehicle',
    'Scenic drive to Agafay desert camp with Atlas Mountain views',
    'Quad bike orientation and safety instructions',
    '1h45 guided quad bike adventure through the rocky desert',
    'Stop for mint tea in traditional Berber tent',
    'Return to Marrakech and hotel drop-off'
  ],
  rating: 4.8,
  reviewCount: 132,
  maxParticipants: 10,
  tag: 'Best Seller'
};

// Ourika Valley & Waterfalls
export const ourikaValleyWaterfallsActivity: Activity = {
  id: 'ourika-valley-waterfalls',
  title: 'Ourika Valley & Waterfalls',
  type: 'NATURE',
  image: '/destination.jpg', // This should be updated with the correct path from ImageKitGallery
  gallery: ['/destination.jpg'], // This should be updated with the correct paths from ImageKitGallery
  description: 'Escape the city heat and discover the beautiful Ourika Valley in the Atlas Mountains. Hike to spectacular waterfalls, visit traditional Berber villages, and enjoy the refreshing mountain atmosphere.',
  groupPrice: 27,
  privatePrice: 45,
  duration: '1 day',
  location: 'Palmeraie, Marrakech',
  longDescription: 'Escape the city heat and discover the beautiful Ourika Valley in the Atlas Mountains. Hike to spectacular waterfalls, visit traditional Berber villages, and enjoy the refreshing mountain atmosphere. This tour provides an authentic glimpse into rural Moroccan life while exploring stunning natural landscapes.',
  highlights: [
    'Scenic drive through beautiful landscapes to Ourika Valley',
    'Visit to authentic Berber house to learn about local culture',
    'Guided hike to the stunning Setti Fatma waterfalls',
    'Visit argan oil cooperative to learn about traditional production',
    'Experience the weekly Berber market (Mondays only)'
  ],
  included: [
    'Air-conditioned round trip transportation',
    'Professional driver',
    'Local hiking guide',
    'WiFi on board'
  ],
  excludes: [
    'Meals and drinks',
    'Personal expenses',
    'Tips'
  ],
  itinerary: [
    'Morning pickup from your accommodation in Marrakech',
    'Scenic drive through Atlas Mountains with photo stops',
    'Visit argan oil cooperative to learn about production process',
    'Visit traditional Berber house',
    'Guided hike to Setti Fatma waterfalls',
    'Free time for lunch by the river (at own expense)',
    'Return to Marrakech in late afternoon'
  ],
  rating: 4.7,
  reviewCount: 98,
  maxParticipants: 12
};

// Essaouira Day Trip
export const essaouiraDayTripActivity: Activity = {
  id: 'essaouira-day-trip',
  title: 'Essaouira Day Trip',
  type: 'CULTURAL',
  image: '/destination.jpg', // This should be updated with the correct path from ImageKitGallery
  gallery: ['/destination.jpg'], // This should be updated with the correct paths from ImageKitGallery
  description: 'Discover the charming coastal town of Essaouira with its blue and white medina, historic port, and sandy beaches. This UNESCO World Heritage site offers a perfect day trip from Marrakech.',
  groupPrice: 30,
  privatePrice: 50,
  duration: '1 day',
  location: 'Palmeraie, Marrakech',
  longDescription: 'Discover the charming coastal town of Essaouira with its blue and white medina, historic port, and sandy beaches. This UNESCO World Heritage site offers a perfect day trip from Marrakech. Enjoy the refreshing sea breeze, explore ancient fortifications, and immerse yourself in the relaxed atmosphere of this artistic coastal gem.',
  highlights: [
    'Visit the UNESCO World Heritage medina of Essaouira',
    'Explore the historic Portuguese fortifications and harbor',
    'Enjoy free time on the beach or shopping in the souks',
    'Experience the laid-back atmosphere of this artistic coastal town'
  ],
  included: [
    'Round trip transportation in air-conditioned vehicle',
    'Professional driver',
    'Free time to explore Essaouira',
    'WiFi on board'
  ],
  excludes: [
    'Local guide (available for extra fee)',
    'Meals and drinks',
    'Entrance fees to monuments',
    'Personal expenses'
  ],
  rating: 4.9,
  reviewCount: 145,
  maxParticipants: 15
};

// Ouzoud Waterfalls Tour
export const ouzoudWaterfallsActivity: Activity = {
  id: 'ouzoud-waterfalls-tour',
  title: 'Ouzoud Waterfalls Tour',
  type: 'NATURE',
  image: '/destination.jpg', // This should be updated with the correct path from ImageKitGallery
  gallery: ['/destination.jpg'], // This should be updated with the correct paths from ImageKitGallery
  description: 'Visit the spectacular Ouzoud Waterfalls, the highest in North Africa at 110m. Enjoy the natural beauty, look for wild Barbary macaques, and take an optional boat ride close to the falls.',
  groupPrice: 34,
  privatePrice: 55,
  duration: '1 day',
  location: 'Palmeraie, Marrakech',
  longDescription: 'Visit the spectacular Ouzoud Waterfalls, the highest in North Africa at 110m. Enjoy the natural beauty, look for wild Barbary macaques, and take an optional boat ride close to the falls. This full-day excursion showcases one of Morocco\'s most impressive natural wonders with plenty of time to explore and take photos.',
  highlights: [
    'Witness the magnificent 110m high Ouzoud Waterfalls',
    'Opportunity to see wild Barbary macaques in their natural habitat',
    'Optional boat trip close to the base of the falls',
    'Scenic hiking trails with rainbow views when sunny'
  ],
  included: [
    'Air-conditioned transportation from/to Marrakech',
    'Professional driver',
    'Local guide at the waterfalls',
    'Free time to explore and take photos'
  ],
  excludes: [
    'Boat ride (available for small fee)',
    'Lunch',
    'Personal expenses',
    'Gratuities'
  ],
  rating: 4.8,
  reviewCount: 170,
  maxParticipants: 14,
  tag: 'Most Popular'
};

// Ait Ben Haddou & Ouarzazate
export const aitBenHaddouActivity: Activity = {
  id: 'ait-ben-haddou-ouarzazate',
  title: 'Ait Ben Haddou & Ouarzazate',
  type: 'HISTORICAL',
  image: '/destination.jpg', // This should be updated with the correct path from ImageKitGallery
  gallery: ['/destination.jpg'], // This should be updated with the correct paths from ImageKitGallery
  description: 'Cross the High Atlas Mountains via the spectacular Tizi n\'Tichka pass to visit the famous kasbah of Ait Ben Haddou, a UNESCO World Heritage site, and explore Ouarzazate, known as the \'Hollywood of Morocco\'.',
  groupPrice: 45,
  privatePrice: 70,
  duration: '1 day',
  location: 'Palmeraie, Marrakech',
  longDescription: 'Cross the High Atlas Mountains via the spectacular Tizi n\'Tichka pass to visit the famous kasbah of Ait Ben Haddou, a UNESCO World Heritage site, and explore Ouarzazate, known as the \'Hollywood of Morocco\'. This journey takes you through stunning landscapes and historic sites that have featured in numerous movies and TV shows.',
  highlights: [
    'Cross the High Atlas Mountains via the stunning Tizi n\'Tichka pass',
    'Visit the UNESCO World Heritage site of Ait Ben Haddou',
    'Explore Ouarzazate and its film studios',
    'Discover authentic Moroccan architecture and landscapes'
  ],
  included: [
    'Transportation in air-conditioned vehicle',
    'Professional driver/guide',
    'Hotel pickup and drop-off',
    'Free time at each location'
  ],
  excludes: [
    'Entrance fees to film studios (optional)',
    'Lunch',
    'Local guide inside Ait Ben Haddou (optional)',
    'Gratuities'
  ],
  rating: 4.7,
  reviewCount: 125,
  maxParticipants: 12
};

// Camel Ride in Palmeraie
export const camelRideActivity: Activity = {
  id: 'camel-ride-palmeraie',
  title: 'Camel Ride in Palmeraie',
  type: 'ADVENTURE',
  image: '/destination.jpg', // This should be updated with the correct path from ImageKitGallery
  gallery: ['/destination.jpg'], // This should be updated with the correct paths from ImageKitGallery
  description: 'Experience a traditional camel ride through the Palmeraie of Marrakech, a palm grove oasis with over 100,000 palm trees. Enjoy this authentic Moroccan activity with beautiful scenery and traditional Berber dress.',
  groupPrice: 25,
  privatePrice: 40,
  duration: '2 hours',
  location: 'Palmeraie, Marrakech',
  longDescription: 'Experience a traditional camel ride through the Palmeraie of Marrakech, a palm grove oasis with over 100,000 palm trees. Enjoy this authentic Moroccan activity with beautiful scenery and traditional Berber dress. This family-friendly excursion offers a taste of desert life just outside the city.',
  highlights: [
    'Authentic camel ride experience in traditional Berber attire',
    'Explore the beautiful palm grove oasis outside Marrakech',
    'Perfect for families and travelers of all ages',
    'Opportunity for unique photos and memories'
  ],
  included: [
    'Hotel pickup and drop-off',
    'Professional guide and camel handler',
    'Traditional blue Berber scarf (to keep)',
    'Mint tea break',
    'All necessary equipment'
  ],
  excludes: [
    'Personal expenses',
    'Gratuities',
    'Professional photography (available for extra fee)'
  ],
  rating: 4.6,
  reviewCount: 110,
  maxParticipants: 16
};

// Available activities
export const activities = [
 
  agafayDesertActivity,
  ourikaValleyWaterfallsActivity,
  essaouiraDayTripActivity,
  ouzoudWaterfallsActivity,
  aitBenHaddouActivity,
  camelRideActivity
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