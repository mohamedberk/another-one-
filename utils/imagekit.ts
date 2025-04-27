/**
 * ImageKit utilities for optimizing and displaying images
 */

interface ImageKitTransformOptions {
  width?: number | null;
  height?: number | null;
  quality?: number;
  format?: 'auto' | 'webp' | 'png' | 'jpg' | 'avif';
  crop?: 'maintain_ratio' | 'force' | 'at_max' | 'at_least';
  focus?: 'center' | 'top' | 'left' | 'bottom' | 'right' | 'top_left' | 'top_right' | 'bottom_left' | 'bottom_right' | 'face' | 'faces';
  blur?: number;
  background?: string;
  dpr?: number;
}

/**
 * Generate an optimized ImageKit URL with transformations
 * 
 * @param url The original ImageKit URL or path
 * @param options Transformation options
 * @returns Optimized ImageKit URL
 */
export function optimizeImageKitUrl(
  url: string, 
  options: ImageKitTransformOptions = {}
): string {
  if (!url) return '';
  
  try {
    // Default options with sensible values
    const {
      width = null,
      height = null,
      quality = 80,
      format = 'auto',
      crop = 'maintain_ratio',
      focus = 'center',
      blur = 0,
      background,
      dpr = 1,
    } = options;
    
    // Check if this is already an ImageKit URL
    if (!url.includes('ik.imagekit.io')) {
      // If not, this might be just the file path, so prepend the URL endpoint
      const urlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || 'https://ik.imagekit.io/yourendpoint';
      url = `${urlEndpoint}/${url.startsWith('/') ? url.substring(1) : url}`;
    }

    // Create the transformation query parameters
    const transformations = [];
    
    if (width) transformations.push(`w-${width}`);
    if (height) transformations.push(`h-${height}`);
    if (quality) transformations.push(`q-${quality}`);
    if (format === 'auto') transformations.push('f-auto');
    else if (format) transformations.push(`f-${format}`);
    if (crop) transformations.push(`c-${crop}`);
    if (focus) transformations.push(`fo-${focus}`);
    if (blur > 0) transformations.push(`bl-${blur}`);
    if (background) transformations.push(`bg-${background}`);
    if (dpr) transformations.push(`dpr-${dpr}`);
    
    // If URL already has parameters, append new ones
    if (url.includes('?')) {
      return `${url}&tr=${transformations.join(',')}`;
    } else {
      return `${url}?tr=${transformations.join(',')}`;
    }
  } catch (error) {
    console.error('Error optimizing ImageKit URL:', error);
    return url;
  }
}

/**
 * Next.js image loader for ImageKit
 */
export const imageKitLoader = ({ src, width, quality }: { 
  src: string;
  width: number;
  quality?: number;
}) => {
  return optimizeImageKitUrl(src, {
    width,
    quality: quality || 80,
  });
};

/**
 * Preload an ImageKit image with optimizations
 */
export function preloadImageKitImage(url: string, priority: 'high' | 'low' | 'auto' = 'auto'): void {
  if (!url) return;
  
  const optimizedUrl = optimizeImageKitUrl(url);
  const img = new Image();
  img.fetchPriority = priority;
  img.src = optimizedUrl;
}

/**
 * Preload multiple ImageKit images with optimizations
 */
export function preloadImageKitImages(urls: string[], priority: 'high' | 'low' | 'auto' = 'auto'): void {
  if (!urls || !urls.length) return;
  
  urls.forEach(url => preloadImageKitImage(url, priority));
} 