/**
 * Cloudinary image optimization utilities
 */

interface CloudinaryTransformOptions {
  width?: number | null
  height?: number | null
  aspectRatio?: number | string
  quality?: number | 'auto'
  format?: 'auto' | 'webp' | 'png' | 'jpg' | 'avif'
  crop?: 'fill' | 'fit' | 'scale' | 'pad' | 'crop' | 'thumb'
  gravity?: 'auto' | 'face' | 'center' | 'north' | 'south' | 'east' | 'west'
  blur?: number
  background?: string
  dpr?: 'auto' | number
  fetchFormat?: boolean
  cacheBuster?: string | number
}

/**
 * Get cache buster string for development
 */
export function getCacheBuster(): string | undefined {
  if (process.env.NODE_ENV === 'development') {
    return Date.now().toString()
  }
  return undefined
}

/**
 * Generate an optimized Cloudinary URL with transformations
 * 
 * @param url The original Cloudinary URL or public ID
 * @param options Transformation options
 * @returns Optimized Cloudinary URL
 */
export function optimizeCloudinaryUrl(
  url: string, 
  options: CloudinaryTransformOptions = {}
): string {
  if (!url) return ''
  
  // If not a Cloudinary URL, return as is
  if (!url.includes('res.cloudinary.com') && !url.includes('cloudinary.com')) {
    return url
  }
  
  try {
    // Default options with sensible values
    const {
      width = null,
      height = null,
      aspectRatio,
      quality = 'auto',
      format = 'auto',
      crop = 'fill',
      gravity = 'auto',
      blur = 0,
      background,
      dpr = 'auto',
      fetchFormat = true,
      cacheBuster = getCacheBuster(),
    } = options
    
    // Extract Cloudinary URL parts
    let publicId = ''
    let cloudName = ''
    let isUploadApi = false
    
    // Handle full Cloudinary URLs
    if (url.includes('/image/upload/')) {
      const parts = url.split('/image/upload/')
      if (parts.length !== 2) return url
      
      // Extract parts
      const basePart = parts[0]
      cloudName = basePart.split('res.cloudinary.com/')[1] || ''
      publicId = parts[1].split('?')[0] // Remove query params
      isUploadApi = true
    } else {
      // Assume it's a public ID with the default cloud name
      publicId = url
      cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || ''
    }
    
    if (!cloudName) return url
    
    // Build transformation string
    const transforms = [
      format === 'auto' ? 'f_auto' : `f_${format}`,
      quality === 'auto' ? 'q_auto:good' : `q_${quality}`,
      crop && `c_${crop}`,
      gravity && `g_${gravity}`,
      width && `w_${width}`,
      height && `h_${height}`,
      aspectRatio && `ar_${aspectRatio}`,
      blur > 0 && `e_blur:${blur}`,
      background && `b_${background}`,
      dpr === 'auto' ? 'dpr_auto' : dpr ? `dpr_${dpr}` : null,
    ].filter(Boolean).join(',')
    
    // Construct the optimized URL
    const optimizedUrl = isUploadApi
      ? `https://res.cloudinary.com/${cloudName}/image/upload/${transforms}/${publicId}`
      : `https://res.cloudinary.com/${cloudName}/image/upload/${transforms}/${publicId}`
    
    // Add cache buster in development
    if (cacheBuster) {
      return `${optimizedUrl}?cb=${cacheBuster}`
    }
    
    return optimizedUrl
  } catch (error) {
    console.error('Error optimizing Cloudinary URL:', error)
    return url
  }
}

/**
 * Generates a tiny blurred placeholder URL for Cloudinary images
 * 
 * @param url Original Cloudinary URL or public ID
 * @returns URL for a blurred placeholder
 */
export function getBlurPlaceholder(url: string): string {
  return optimizeCloudinaryUrl(url, {
    width: 20,
    height: 20,
    quality: 30,
    blur: 1000,
    format: 'auto'
  })
}

/**
 * Next.js image loader for Cloudinary
 */
export const cloudinaryLoader = ({ src, width, quality }: { 
  src: string
  width: number
  quality?: number
}) => {
  return optimizeCloudinaryUrl(src, {
    width,
    quality: quality || 'auto',
  })
}

/**
 * Preload a Cloudinary image with optimizations
 */
export function preloadCloudinaryImage(url: string, priority: 'high' | 'low' | 'auto' = 'auto'): void {
  if (!url) return
  
  const optimizedUrl = optimizeCloudinaryUrl(url)
  const img = new Image()
  img.fetchPriority = priority
  img.src = optimizedUrl
}

/**
 * Preload multiple Cloudinary images with optimizations
 */
export function preloadCloudinaryImages(urls: string[], priority: 'high' | 'low' | 'auto' = 'auto'): void {
  if (!urls || !urls.length) return
  
  urls.forEach(url => preloadCloudinaryImage(url, priority))
} 