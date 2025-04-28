import React from 'react';
import Image from 'next/image';
import { optimizeImageKitUrl } from '../utils/imagekit';

/**
 * Centralized collection of all ImageKit images used in the application
 * This makes it easier to manage and update images across the site
 */
export const ImageKitGallery = {
  // Hero and Featured sections
  hero: {
    video: "https://ik.imagekit.io/momh2323/Untitled%20video%20-%20Made%20with%20Clipchamp.mp4?updatedAt=1745673792987",
    backgroundImage: "https://ik.imagekit.io/momh2323/Asni.jpg?updatedAt=1745258287547"
  },
  
  // Valleys and Destinations
  valleys: {
    asni: "https://ik.imagekit.io/momh2323/Asni.jpg?updatedAt=1745258287547",
    oukaimeden: "https://ik.imagekit.io/momh2323/Oukaimeden.jpg?updatedAt=1745258287453",
    ourika: "https://ik.imagekit.io/momh2323/ourikaa.jpg?updatedAt=1745258287408",
    agafay: "https://ik.imagekit.io/momh2323/aggafay.jpg?updatedAt=1745514931795",
  },
  
  // Ourika Valley Gallery
  ourikaGallery: [
    "https://ik.imagekit.io/momh2323/ourika/ourika%201.jpg?updatedAt=1745677832233",
    "https://ik.imagekit.io/momh2323/ourika/ourika%202.jpg?updatedAt=1745677832060",
    "https://ik.imagekit.io/momh2323/ourika/ourika%203.jpg?updatedAt=1745677832247",
    "https://ik.imagekit.io/momh2323/ourika/ourika%204.jpg?updatedAt=1745677832138",
    "https://ik.imagekit.io/momh2323/ourika/ourika%205.jpg?updatedAt=1745677832227"
  ],
  
  // Three Valleys Gallery
  threeValleysGallery: [
    "https://ik.imagekit.io/momh2323/ourika/Three%20Valleys%20Atlas%20Adventure/kech.jpg?updatedAt=1745680024936",
    "https://ik.imagekit.io/momh2323/ourika/Three%20Valleys%20Atlas%20Adventure/asnii.jpg?updatedAt=1745680024795",
    "https://ik.imagekit.io/momh2323/ourika/Three%20Valleys%20Atlas%20Adventure/agaffay.jpg?updatedAt=1745680024761",
    "https://ik.imagekit.io/momh2323/ourika/Three%20Valleys%20Atlas%20Adventure/6a5d442da7e1f460d7a7e0facb4b4afc.jpg?updatedAt=1745680024745",
    "https://ik.imagekit.io/momh2323/f9e2293f05c26a3169e8fa4b2382a545.jpg?updatedAt=1745682599557"
  ],
  
  // Videos
  videos: {
    threeValleys: "https://ik.imagekit.io/momh2323/3%20valleys%20.mp4?updatedAt=1745326219236"
  },
  
  // Activity collections by title
  activities: {
    "Ourika Valley": [
      "https://ik.imagekit.io/momh2323/ourika/ourika%202.jpg?updatedAt=1745677832060",
      "https://ik.imagekit.io/momh2323/ourika/ourika%204.jpg?updatedAt=1745677832138",
      "https://ik.imagekit.io/momh2323/ourika/ourika%205.jpg?updatedAt=1745677832227",
      "https://ik.imagekit.io/momh2323/ourika/ourika%201.jpg?updatedAt=1745677832233",
      "https://ik.imagekit.io/momh2323/ourika/ourika%203.jpg?updatedAt=1745677832247"
    ],
    "Agafay Valley": [
      "https://ik.imagekit.io/momh2323/aggafay.jpg?updatedAt=1745514931795",
      "https://ik.imagekit.io/momh2323/threevalley/3valleys1.jpg?updatedAt=1745677835262",
      "https://ik.imagekit.io/momh2323/threevalley/3valleys3.jpg?updatedAt=1745677835265",
      "https://ik.imagekit.io/momh2323/threevalley/3valleys2.jpg?updatedAt=1745677835273",
      "https://ik.imagekit.io/momh2323/threevalley/3valleys5.jpg?updatedAt=1745677835280",
      "https://ik.imagekit.io/momh2323/threevalley/3valleys4.jpg?updatedAt=1745677835315"
    ]
  },
  
  // Default fallback images
  default: [
    "https://images.unsplash.com/photo-1519160558534-579f5106e43f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    "https://images.unsplash.com/photo-1508672019048-805c876b67e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    "https://images.unsplash.com/photo-1515862514226-7146137a5f41?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  ]
};

interface ImageKitImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  quality?: number;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  priority?: boolean;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
}

export const ImageKitImage: React.FC<ImageKitImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  quality = 80,
  objectFit = 'cover',
  priority = false,
  placeholder = 'empty',
  blurDataURL,
}) => {
  // Generate the optimized image URL with ImageKit transformations
  const optimizedSrc = optimizeImageKitUrl(src, {
    width,
    height,
    quality,
    format: 'auto',
  });

  return (
    <Image
      src={optimizedSrc}
      alt={alt}
      width={width || 0}
      height={height || 0}
      className={className}
      style={{ objectFit }}
      quality={quality}
      priority={priority}
      placeholder={placeholder}
      blurDataURL={blurDataURL}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    />
  );
};

export default ImageKitImage; 