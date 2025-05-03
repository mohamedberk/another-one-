import { StaticImageData } from 'next/image';

export interface Activity6 {
  id: string;
  name: string;
  location: string;
  price: string;
  image: string;
  rating: number;
  duration: string;
  description: string;
  highlights: string[];
  includes: string[];
  excludes: string[];
  tag?: string;
  itinerary?: string[];
}

// The 6 activities for the TravelDiscover component
export const activities6: Activity6[] = [
  {
    id: "quad",
    name: "Quad Biking Adventure",
    location: "Palmeraie, Marrakech",
    price: "250 MAD",
    image: "/destination.jpg",
    rating: 4.8,
    duration: "1 hour",
    description: "Experience the thrill of quad biking through the stunning desert landscapes around Marrakech. Perfect adventure for adrenaline seekers!",
    highlights: ["No previous experience needed", "Professional guide", "Safety equipment provided", "Exciting desert trails"],
    includes: ["Hotel pickup and drop-off", "Quad bike rental", "Safety briefing", "Helmet", "Guide"],
    excludes: ["Food and drinks", "Personal expenses", "Photos (available to purchase)"],
    tag: "Popular"
  },
  {
    id: "camel",
    name: "Camel Riding Experience",
    location: "Palmeraie, Marrakech",
    price: "150 MAD",
    image: "/destination.jpg",
    rating: 4.6,
    duration: "1 hour",
    description: "Enjoy a traditional camel ride through the Palm Grove of Marrakech. A perfect way to experience the Moroccan desert lifestyle.",
    highlights: ["Traditional Moroccan experience", "Scenic Palm Grove route", "Suitable for all ages", "Great photo opportunities"],
    includes: ["Camel ride", "Guide", "Mint tea", "Hotel pickup and drop-off"],
    excludes: ["Meals", "Personal expenses", "Tips for guide (optional)"],
    tag: "Family-Friendly"
  },
  {
    id: "buggy",
    name: "Buggy Desert Adventure",
    location: "Palmeraie, Marrakech",
    price: "from 850 MAD",
    image: "/destination.jpg",
    rating: 4.9,
    duration: "1 hour",
    description: "Choose from 3 different buggy power options and race through the Palmeraie Desert. An exhilarating experience with stunning Atlas Mountains views.",
    highlights: ["3 power options available (850/1000/1400 MAD)", "High-performance buggies", "Desert trails and dunes", "Professional instructors"],
    includes: ["Buggy rental", "Helmet and safety gear", "Instructor", "Bottled water", "Transport from Marrakech"],
    excludes: ["Food", "Personal expenses", "Photos (available to purchase)"],
    tag: "Adrenaline Rush"
  },
  {
    id: "balloon",
    name: "Hot Air Balloon Flight",
    location: "Palmeraie, Marrakech",
    price: "1400 MAD",
    image: "/destination.jpg",
    rating: 5.0,
    duration: "1 hour",
    description: "Soar above the breathtaking landscapes of Marrakech and the Palmeraie in a hot air balloon. Unforgettable sunrise views guaranteed!",
    highlights: ["Sunrise flight", "Panoramic views", "Small groups", "Professional pilots", "Flight certificate"],
    includes: ["Hot air balloon ride", "Breakfast", "Flight certificate", "Hotel transfers"],
    excludes: ["Personal expenses", "Optional gratuities"],
    tag: "Premium Experience"
  },
  {
    id: "quad-camel",
    name: "Quad & Camel Combo Pack",
    location: "Palmeraie, Marrakech",
    price: "300 MAD",
    image: "/destination.jpg",
    rating: 4.7,
    duration: "1 hour",
    description: "The perfect combination of adventure and tradition! Enjoy both quad biking and camel riding in this value combo package.",
    highlights: ["Two activities in one package", "Value deal", "Experience both adventure and tradition", "Perfect for groups"],
    includes: ["Quad bike rental", "Camel ride", "Safety equipment", "Guide", "Hotel pickup and drop-off"],
    excludes: ["Food and drinks", "Personal expenses", "Photos (available to purchase)"],
    tag: "Best Value"
  },
  {
    id: "buggy-camel",
    name: "Buggy & Camel Combo Pack",
    location: "Palmeraie, Marrakech",
    price: "from 950 MAD",
    image: "/destination.jpg",
    rating: 4.8,
    duration: "1 hour",
    description: "Experience the best of both worlds with this combo package that includes a buggy adventure and a traditional camel ride.",
    highlights: ["3 power options available (950/1100/1500 MAD)", "Variety of experiences in one package", "Professional guides", "Breathtaking scenery"],
    includes: ["Buggy ride", "Camel ride", "Safety equipment", "Instructor/guide", "Hotel pickup and drop-off"],
    excludes: ["Food and drinks", "Personal expenses", "Photos (available to purchase)"],
    tag: "Premium Combo"
  }
];

// Function to get activity by ID
export const getActivity6ById = (id: string): Activity6 | undefined => {
  return activities6.find(activity => activity.id === id);
};

// Add 40% discount calculation function for children under 16
export const calculateChildDiscount = (price: number): number => {
  return price * 0.6; // 40% off = 60% of original price
};

// Function to get price options for buggy activities
export const getBuggyPriceOptions = (activityId: string): number[] | null => {
  if (activityId === "buggy") {
    return [850, 1000, 1400]; // Return the three price options for buggy
  } else if (activityId === "buggy-camel") {
    return [950, 1100, 1500]; // Return the three price options for buggy-camel combo
  }
  return null; // Not a buggy activity
};

// Helper function to convert price string to number
export const extractPriceNumber = (priceString: string): number => {
  // Remove "from " prefix and " MAD" suffix if present
  const cleanPrice = priceString.replace("from ", "").replace(" MAD", "");
  // Parse as integer
  return parseInt(cleanPrice, 10);
}; 