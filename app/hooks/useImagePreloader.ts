'use client'

import { useEffect } from 'react'

interface PreloaderOptions {
  /**
   * How many images ahead of the current one to preload
   */
  preloadAhead?: number
  
  /**
   * When to start preloading based on current index
   */
  triggerOnIndex?: number
  
  /**
   * Only preload visible images
   */
  visibleOnly?: boolean
}

/**
 * Hook to preload images for faster gallery browsing
 * 
 * @param imageUrls Array of image URLs to preload
 * @param currentIndex Current active image index
 * @param options Preloading options
 */
export function useImagePreloader(
  imageUrls: string[],
  currentIndex: number,
  options: PreloaderOptions = {}
) {
  const {
    preloadAhead = 2, 
    triggerOnIndex = 0,
    visibleOnly = true
  } = options
  
  useEffect(() => {
    if (!imageUrls || !imageUrls.length) return
    
    // Don't preload if we haven't reached the trigger index
    if (currentIndex < triggerOnIndex) return
    
    // Calculate which images to preload
    const imagesToPreload = []
    
    // Preload the next N images
    for (let i = 1; i <= preloadAhead; i++) {
      const nextIndex = currentIndex + i
      if (nextIndex < imageUrls.length) {
        imagesToPreload.push(imageUrls[nextIndex])
      }
    }
    
    // Skip if nothing to preload
    if (imagesToPreload.length === 0) return
    
    // Create image objects for preloading
    const preloadedImages = imagesToPreload.map(src => {
      const img = new Image()
      
      // Set loading priority based on options
      if (visibleOnly) {
        img.loading = 'eager'
        img.fetchPriority = 'high'
      }
      
      img.src = src
      return img
    })
    
    // Cleanup function
    return () => {
      // Clear src to cancel any in-progress loading (helps with memory management)
      preloadedImages.forEach(img => {
        img.src = ''
      })
    }
  }, [imageUrls, currentIndex, preloadAhead, triggerOnIndex, visibleOnly])
} 