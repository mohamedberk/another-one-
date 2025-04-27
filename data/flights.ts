import { Car, Coffee, Sunrise, UtensilsCrossed, Camera } from "lucide-react"

export interface FlightFeature {
  text: string
  time: string
  icon: any // Lucide icon component
}

export interface FlightAddon {
  id: string
  title: string
  description: string
  price: number
  priceType: 'per_person' | 'per_group'
  icon: any // Lucide icon component
}

export interface Flight {
  id: string
  badge: string
  title: string
  description: string
  rating: number
  reviews: number
  price: number
  duration: string
  spotsLeft: number
  nextFlight: string
  features: FlightFeature[]
  addons: FlightAddon[]
  images: {
    main: string
    gallery: string[]
  }
}

export const flights: Flight[] = [
  {
    id: "sunrise-classic",
    badge: "Most Popular",
    title: "Sunrise Classic Experience",
    description: "Begin your day with an unforgettable journey above the Moroccan landscape as the first light touches the Atlas Mountains.",
    rating: 4.9,
    reviews: 128,
    price: 249,
    duration: "4-hour experience",
    spotsLeft: 4,
    nextFlight: "Tomorrow, 5:00 AM",
    features: [
      { text: 'Hotel pickup at dawn', time: '5:00 AM', icon: Car },
      { text: 'Pre-flight coffee & briefing', time: '5:30 AM', icon: Coffee },
      { text: 'Sunrise balloon flight', time: '6:00 AM', icon: Sunrise },
      { text: 'Traditional breakfast', time: '7:30 AM', icon: UtensilsCrossed },
      { text: 'Professional photos', time: 'During flight', icon: Camera },
      { text: 'Return transport', time: '9:00 AM', icon: Car }
    ],
    addons: [
      {
        id: 'hotel-pickup',
        title: 'Hotel Pickup Service',
        description: 'Convenient pickup and drop-off from your hotel',
        price: 20,
        priceType: 'per_person',
        icon: Car
      },
      {
        id: 'breakfast',
        title: 'Traditional Breakfast',
        description: 'Authentic Moroccan breakfast before your flight',
        price: 25,
        priceType: 'per_person',
        icon: Coffee
      },
      {
        id: 'photos',
        title: 'Professional Photos',
        description: 'High-quality photos of your experience',
        price: 49,
        priceType: 'per_group',
        icon: Camera
      },
      {
        id: 'camel-ride',
        title: 'Desert Camel Ride',
        description: 'One-hour camel trek through the desert after landing',
        price: 35,
        priceType: 'per_person',
        icon: Sunrise // You might want to use a more appropriate icon
      },
      {
        id: 'quad-biking',
        title: 'Quad Biking Adventure',
        description: '2-hour guided quad biking experience in the desert',
        price: 75,
        priceType: 'per_person',
        icon: Car // You might want to use a more appropriate icon
      }
    ],
    images: {
      main: "/flights/balloon-1.jpg",
      gallery: [
        "/flights/balloon-2.jpg",
        "/flights/balloon-3.jpg"
      ]
    }
  },
  {
    id: "sunset-deluxe",
    badge: "Premium",
    title: "Sunset Deluxe Experience",
    description: "Experience the magic of Morocco as the sun sets over the desert, painting the sky in brilliant hues of orange and gold.",
    rating: 4.8,
    reviews: 96,
    price: 299,
    duration: "5-hour experience",
    spotsLeft: 6,
    nextFlight: "Today, 4:00 PM",
    features: [
      { text: 'Hotel pickup', time: '4:00 PM', icon: Car },
      { text: 'Welcome drinks', time: '4:30 PM', icon: Coffee },
      { text: 'Sunset balloon flight', time: '5:00 PM', icon: Sunrise },
      { text: 'Gourmet dinner', time: '7:00 PM', icon: UtensilsCrossed },
      { text: 'Professional photos', time: 'During flight', icon: Camera },
      { text: 'Return transport', time: '9:00 PM', icon: Car }
    ],
    addons: [
      {
        id: 'hotel-pickup',
        title: 'Hotel Pickup Service',
        description: 'Luxury vehicle pickup and drop-off from your hotel',
        price: 30,
        priceType: 'per_person',
        icon: Car
      },
      {
        id: 'dinner',
        title: 'Gourmet Dinner',
        description: 'Traditional Moroccan feast under the stars',
        price: 45,
        priceType: 'per_person',
        icon: UtensilsCrossed
      },
      {
        id: 'photos',
        title: 'Professional Photos',
        description: 'High-quality photos with sunset backdrop',
        price: 59,
        priceType: 'per_group',
        icon: Camera
      },
      {
        id: 'camel-ride',
        title: 'Sunset Camel Trek',
        description: 'Magical camel ride during golden hour',
        price: 45,
        priceType: 'per_person',
        icon: Sunrise
      },
      {
        id: 'quad-sunset',
        title: 'Sunset Quad Adventure',
        description: '2-hour desert quad experience at dusk',
        price: 85,
        priceType: 'per_person',
        icon: Car
      }
    ],
    images: {
      main: "/flights/balloon-4.jpg",
      gallery: [
        "/flights/balloon-2.jpg",
        "/flights/balloon-1.jpg"
      ]
    }
  }
] 