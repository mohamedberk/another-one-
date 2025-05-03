import { Activity6, activities6, getActivity6ById, extractPriceNumber, getBuggyPriceOptions } from './activities6';
import { Activity } from './activities';

// Convert Activity6 format to Activity format for compatibility
export const convertActivity6ToActivity = (activity6: Activity6): Activity => {
  // Extract price number from price string
  const basePrice = extractPriceNumber(activity6.price);
  
  // Use exact prices as specified
  let actualPrice = basePrice;
  
  // Ensure we're using the correct prices for each activity
  switch (activity6.id) {
    case 'quad':
      actualPrice = 250; // 250 MAD
      break;
    case 'camel':
      actualPrice = 150; // 150 MAD
      break;
    case 'buggy':
      actualPrice = 850; // from 850 MAD
      break; 
    case 'balloon':
      actualPrice = 1400; // 1400 MAD
      break;
    case 'quad-camel':
      actualPrice = 300; // 300 MAD
      break;
    case 'buggy-camel':
      actualPrice = 950; // from 950 MAD
      break;
    default:
      actualPrice = basePrice;
  }
  
  return {
    id: activity6.id,
    title: activity6.name,
    type: activity6.tag || 'ADVENTURE',
    image: activity6.image,
    gallery: [activity6.image],
    description: activity6.description,
    groupPrice: actualPrice,
    privatePrice: 0, // Set to 0 to effectively disable private tours
    duration: activity6.duration,
    location: activity6.location,
    longDescription: activity6.description,
    highlights: activity6.highlights,
    included: activity6.includes,
    excludes: activity6.excludes,
    itinerary: [], // Default empty itinerary
    rating: activity6.rating,
    reviewCount: 50, // Default review count
    maxParticipants: 10, // Default max participants
    tag: activity6.tag
  };
};

// Function to get activities in the format expected by the detail/booking pages
export const getActivityByIdAdapter = (id: string): Activity | undefined => {
  const activity6 = getActivity6ById(id);
  if (!activity6) return undefined;
  
  return convertActivity6ToActivity(activity6);
};

// Create adapted activities array (all 6 activities)
export const activitiesAdapter: Activity[] = activities6.map(convertActivity6ToActivity);

// Re-export calculateTourPrice function for compatibility with the correct discount
export const calculateTourPrice = (
  activity: Activity,
  isPrivate: boolean,
  adults: number,
  children: number,
  youngChildren: number
): number => {
  // Base price (ignoring isPrivate parameter since private tours are removed)
  const adultPrice = activity.groupPrice;
  
  // Children under 16 years pay 60% (40% discount)
  const childPrice = adultPrice * 0.6;
  
  // Children are completely free
  const youngChildPrice = 0;
  
  // Calculate total price
  const total = (adults * adultPrice) + (children * childPrice) + (youngChildren * youngChildPrice);
  
  return total;
}; 