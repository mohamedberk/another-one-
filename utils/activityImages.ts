// Image constants for activity images
// Each activity has two image variations

export const ACTIVITY_IMAGES = {
  // Camel riding images
  camel: [
    "https://ik.imagekit.io/vfy4ww3l0/camel/camel.jpg?updatedAt=1746281643783",
    "https://ik.imagekit.io/vfy4ww3l0/camel/camel%202.jpg?updatedAt=1746281643797"
  ],
  
  // Hot air balloon images
  balloon: [
    "https://ik.imagekit.io/vfy4ww3l0/camel/Hot%20Air%20Balloon.jpg?updatedAt=1746281909708",
    "https://ik.imagekit.io/vfy4ww3l0/camel/Hot%20Air%20Balloon%202.jpg?updatedAt=1746281909619"
  ],
  
  // Hero section hot air balloon image
  heroBallon: [
    "https://ik.imagekit.io/vfy4ww3l0/camel/hot%20airballon.jpg?updatedAt=1746291429294"
  ],
  
  // Quad and camel combo images
  quadCamel: [
    "https://ik.imagekit.io/vfy4ww3l0/camel/Quad%20&%20Camel.jpg?updatedAt=1746281909780",
    "https://ik.imagekit.io/vfy4ww3l0/camel/Quad%20&%20Camel%202.jpg?updatedAt=1746281909786"
  ],
  
  // Buggy images
  buggy: [
    "https://ik.imagekit.io/vfy4ww3l0/camel/buggy.jpg?updatedAt=1746281909833",
    "https://ik.imagekit.io/vfy4ww3l0/camel/buggy%202.jpg?updatedAt=1746281909874"
  ],
  
  // Quad biking images
  quad: [
    "https://ik.imagekit.io/vfy4ww3l0/camel/quad.jpg?updatedAt=1746281978327",
    "https://ik.imagekit.io/vfy4ww3l0/camel/quad%202.jpg?updatedAt=1746281978398"
  ]
};

// Helper function to get image by activity type and index (0 or 1)
export const getActivityImage = (type: keyof typeof ACTIVITY_IMAGES, index: 0 | 1 = 0): string => {
  return ACTIVITY_IMAGES[type][index];
};

// Export individual image groups for direct imports
export const camelImages = ACTIVITY_IMAGES.camel;
export const balloonImages = ACTIVITY_IMAGES.balloon;
export const heroBalloonImage = ACTIVITY_IMAGES.heroBallon[0];
export const quadCamelImages = ACTIVITY_IMAGES.quadCamel;
export const buggyImages = ACTIVITY_IMAGES.buggy;
export const quadImages = ACTIVITY_IMAGES.quad; 