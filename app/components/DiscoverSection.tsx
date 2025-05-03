import React from 'react';
import DestinationCard from './DestinationCard';

const destinations = [
  {
    id: 1,
    title: 'Shadowpeak Canyon',
    location: 'Colorado, USA',
    price: 240,
    image: 'from-green-300 to-blue-400',
  },
  {
    id: 2,
    title: 'Crimson Rift',
    location: 'Wadi Rum Desert, Jordan',
    price: 400,
    image: 'from-orange-300 to-red-400',
  },
  {
    id: 3,
    title: 'Whispering Dunes',
    location: 'Namib Desert, Namibia',
    price: 300,
    image: 'from-yellow-200 to-yellow-400',
  },
  {
    id: 4,
    title: 'Frostveil Summit',
    location: 'Svalbard, Norway',
    price: 300,
    image: 'from-blue-300 to-indigo-500',
  },
  {
    id: 5,
    title: 'The Obsidian Hollow',
    location: 'Iceland\'s Highlands',
    price: 250,
    image: 'from-gray-400 to-gray-700',
  },
  {
    id: 6,
    title: 'Stormbreaker Isles',
    location: 'Faroe Islands, Denmark',
    price: 450,
    image: 'from-teal-300 to-emerald-500',
  },
];

const DiscoverSection = () => {
  return (
    <section className="mt-16 max-w-[1200px] mx-auto px-4" id="discover">
      <div className="flex items-center gap-2 mb-6">
        <div className="h-8 w-1 bg-blue-600 rounded-full"></div>
        <h2 className="text-2xl font-bold">Discover the world</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {destinations.map((destination) => (
          <DestinationCard
            key={destination.id}
            title={destination.title}
            location={destination.location}
            price={destination.price}
            image={destination.image}
          />
        ))}
      </div>
    </section>
  );
};

export default DiscoverSection; 