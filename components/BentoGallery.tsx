import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

// Define our gallery items with explicit grid areas
const galleryItems = [
  {
    id: 1,
    src: "https://ik.imagekit.io/momh2323/ourika/ourika%202.jpg?updatedAt=1745677832060",
    alt: "Ourika Valley waterfall",
    gridArea: "tall1",
  },
  {
    id: 2,
    src: "https://ik.imagekit.io/momh2323/Asni.jpg?updatedAt=1745258287547",
    alt: "Asni Valley",
    gridArea: "wide1",
  },
  {
    id: 3,
    src: "https://ik.imagekit.io/momh2323/ourika/ourika%205.jpg?updatedAt=1745677832227",
    alt: "Mountain stream in Ourika",
    gridArea: "normal1",
  },
  {
    id: 4,
    src: "https://ik.imagekit.io/momh2323/ourika/ourika%201.jpg?updatedAt=1745677832233",
    alt: "Terraced gardens in Atlas Mountains",
    gridArea: "tall2",
  },
  {
    id: 5,
    src: "https://ik.imagekit.io/momh2323/ourika/ourika%203.jpg?updatedAt=1745677832247",
    alt: "Local crafts market",
    gridArea: "wide2",
  },
  {
    id: 6,
    src: "https://ik.imagekit.io/momh2323/aggafay.jpg?updatedAt=1745514931795",
    alt: "Desert camp at sunset",
    gridArea: "normal2",
  },
  {
    id: 7,
    src: "https://ik.imagekit.io/momh2323/Oukaimeden.jpg?updatedAt=1745258287453",
    alt: "Oukaimeden Valley",
    gridArea: "square",
  },
  {
    id: 8,
    src: "https://ik.imagekit.io/momh2323/ourikaa.jpg?updatedAt=1745258287408",
    alt: "Ourika Panorama",
    gridArea: "special",
  }
];

export default function BentoGallery() {
  return (
    <section id="gallery" className="py-12 relative">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 -z-10 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-neutral-900/5 to-neutral-800/3 blur-[120px]"></div>
      <div className="absolute bottom-0 left-0 -z-10 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-amber-500/5 to-amber-400/3 blur-[120px]"></div>
      
      {/* Section title */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 font-display">
          Morocco's Beauty
        </h2>
        <p className="text-neutral-600 mt-2">Discover the breathtaking landscapes of the Atlas Mountains</p>
      </div>
      
      {/* Bento grid gallery with explicit CSS grid */}
      <div className="max-w-[1600px] mx-auto">
        <div 
          className="hidden md:grid gap-4"
          style={{
            gridTemplateColumns: 'repeat(4, 1fr)',
            gridTemplateRows: 'repeat(4, 1fr)', 
            gridTemplateAreas: `
              "tall1 wide1 wide1 tall2"
              "tall1 normal1 normal2 tall2"
              "wide2 wide2 square special"
              "wide2 wide2 square special"
            `,
            minHeight: '700px',
          }}
        >
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.id}
              className="relative rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-500 group"
              style={{ gridArea: item.gridArea }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-black/0 via-black/0 to-black/60 opacity-70 transition-opacity duration-300 z-10"></div>
              
              {/* Image with object-cover and hover zoom effect */}
              <div className="relative w-full h-full overflow-hidden">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-center transition-transform duration-700 ease-in-out group-hover:scale-110"
                  quality={85}
                />
              </div>
              
              {/* Image title */}
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-20">
                <h3 className="text-sm md:text-base font-medium">{item.alt}</h3>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile-friendly version for small screens */}
        <div className="md:hidden mt-4 space-y-4 px-4">
          {[
            {
              id: 1,
              src: "https://ik.imagekit.io/momh2323/ourika/ourika%202.jpg?updatedAt=1745677832060",
              alt: "Ourika Valley waterfall"
            },
            {
              id: 6,
              src: "https://ik.imagekit.io/momh2323/aggafay.jpg?updatedAt=1745514931795",
              alt: "Desert camp at sunset"
            },
            {
              id: 4,
              src: "https://ik.imagekit.io/momh2323/ourika/ourika%201.jpg?updatedAt=1745677832233",
              alt: "Terraced gardens in Atlas Mountains"
            },
            {
              id: 2,
              src: "https://ik.imagekit.io/momh2323/Asni.jpg?updatedAt=1745258287547",
              alt: "Asni Valley"
            },
            {
              id: 7,
              src: "https://ik.imagekit.io/momh2323/Oukaimeden.jpg?updatedAt=1745258287453",
              alt: "Oukaimeden Valley"
            }
          ].map((item, index) => (
            <motion.div
              key={`mobile-${item.id}`}
              className="relative rounded-2xl overflow-hidden h-[250px] shadow-sm group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-black/0 via-black/0 to-black/60 opacity-70 z-10"></div>
              
              <div className="relative w-full h-full overflow-hidden">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="100vw"
                  className="object-cover object-center transition-transform duration-700 ease-in-out group-hover:scale-110"
                  quality={85}
                />
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-20">
                <h3 className="text-base font-medium">{item.alt}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 