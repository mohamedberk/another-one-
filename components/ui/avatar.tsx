import React from 'react';
import Image from 'next/image';
import { User, Bot, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface AvatarProps {
  name: string;
  imageUrl?: string;
  size?: 'sm' | 'md' | 'lg';
  role?: 'user' | 'assistant';
}

const Avatar = ({ name, imageUrl, size = 'md', role }: AvatarProps) => {
  let dimensions = 32; // Default size in pixels (md)
  let iconSize = 16;
  
  if (size === 'sm') {
    dimensions = 24;
    iconSize = 14;
  }
  if (size === 'lg') {
    dimensions = 40;
    iconSize = 20;
  }

  // Determine background color based on role
  const bgColorClass = role === 'user' 
    ? 'bg-gradient-to-br from-blue-500 to-blue-600' 
    : role === 'assistant'
      ? 'bg-gradient-to-br from-orange-500 to-orange-600'
      : 'bg-gray-600';

  return (
    <motion.div 
      className={`rounded-full overflow-hidden flex-shrink-0 flex items-center justify-center shadow-md aspect-square`}
      style={{ width: `${dimensions}px`, height: `${dimensions}px` }}
      whileHover={{ scale: 1.1 }}
      transition={{ duration: 0.2 }}
    >
      <div className={`w-full h-full ${bgColorClass} flex items-center justify-center`}>
        {imageUrl ? (
          <div className="relative w-full h-full">
            <Image 
              src={imageUrl} 
              alt={name} 
              fill 
              sizes={`${dimensions}px`}
              className="object-cover" 
            />
          </div>
        ) : role === 'user' ? (
          <motion.div
            animate={{ 
              scale: [1, 1.05, 1],
              transition: {
                repeat: Infinity,
                repeatType: "reverse" as const,
                duration: 3,
                ease: "easeInOut"
              }
            }}
          >
            <User size={iconSize} className="text-white" />
          </motion.div>
        ) : role === 'assistant' ? (
          <motion.div
            animate={{ 
              rotate: [0, -5, 0, 5, 0],
              scale: [1, 1.05, 1, 1.05, 1],
              transition: {
                repeat: Infinity,
                duration: 5,
                ease: "easeInOut"
              }
            }}
          >
            <Bot size={iconSize} className="text-white" />
          </motion.div>
        ) : (
          <span className="text-white text-sm font-semibold uppercase">{name.charAt(0)}</span>
        )}
      </div>
    </motion.div>
  );
};

export { Avatar };