import React from 'react';

export function Gallery() {
  return (
    <div id="gallery" className="my-24">
      <div className="text-center mb-16 max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-neutral-800 mb-8 flex items-center justify-center font-display">
          <span className="inline-block w-12 h-0.5 bg-gradient-to-r from-neutral-800 to-neutral-600 rounded-full mr-5"></span>
          Our Gallery
          <span className="inline-block w-12 h-0.5 bg-gradient-to-r from-neutral-600 to-neutral-800 rounded-full ml-5"></span>
        </h2>
        
        <p className="text-neutral-600 text-lg md:text-xl max-w-2xl mx-auto">
          A handful of our favorite spots we can't wait to show you. These places have made us catch 
          our breath and reach for our cameras more times than we can count. They change with the seasons 
          and the light - no two visits are ever the same.
        </p>
      </div>
      
      {/* Enhanced Luxury Gallery - Masonry Style */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* First Column - Large Images */}
          <div className="md:col-span-6 space-y-6">
            <div className="gallery-item">
              <div 
                className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl"
              >
                <div className="gallery-image-container">
                  <div 
                    className="gallery-image"
                    style={{ backgroundImage: `url('https://ik.imagekit.io/momh2323/agafay.jpg?updatedAt=1745514931706')` }}
                  ></div>
                  <div className="gallery-overlay">
                    <div className="gallery-content">
                      <h3 className="gallery-title">Agafay Desert</h3>
                      <div className="gallery-divider"></div>
                      <p className="gallery-description">Experience the dramatic landscape of Agafay's stone desert</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="gallery-item flex items-end">
              <div 
                className="aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl w-full"
              >
                <div className="gallery-image-container">
                  <div 
                    className="gallery-image"
                    style={{ 
                      backgroundImage: `url('https://ik.imagekit.io/momh2323/Kik%20Plateau.jpg?updatedAt=1745515546923')`,
                      backgroundPosition: 'center bottom'
                    }}
                  ></div>
                  <div className="gallery-overlay">
                    <div className="gallery-content">
                      <h3 className="gallery-title">Kik Plateau</h3>
                      <div className="gallery-divider"></div>
                      <p className="gallery-description">Breathtaking panoramic views across the Atlas Mountains</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Second Column - Mixed Sizes */}
          <div className="md:col-span-6 space-y-6">
            <div className="gallery-item">
              <div 
                className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl"
              >
                <div className="gallery-image-container">
                  <div 
                    className="gallery-image"
                    style={{ backgroundImage: `url('https://ik.imagekit.io/momh2323/marrakech.jpg?updatedAt=1745515547006')` }}
                  ></div>
                  <div className="gallery-overlay">
                    <div className="gallery-content">
                      <h3 className="gallery-title">Marrakech</h3>
                      <div className="gallery-divider"></div>
                      <p className="gallery-description">The vibrant Red City with its historic architecture</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Replaced grid with flex to allow bottom alignment */}
            <div className="flex space-x-6">
              <div className="gallery-item w-1/2">
                <div 
                  className="aspect-square rounded-2xl overflow-hidden shadow-2xl h-full flex items-end"
                >
                  <div className="gallery-image-container">
                    <div 
                      className="gallery-image"
                      style={{ backgroundImage: `url('https://ik.imagekit.io/momh2323/Lake%20Lalla%20Takerkoust.jpg?updatedAt=1745515546996')` }}
                    ></div>
                    <div className="gallery-overlay">
                      <div className="gallery-content">
                        <h3 className="gallery-title">Lake Lalla Takerkoust</h3>
                        <div className="gallery-divider"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="gallery-item w-1/2 flex items-end">
                <div 
                  className="aspect-square rounded-2xl overflow-hidden shadow-2xl h-full"
                >
                  <div className="gallery-image-container">
                    <div 
                      className="gallery-image"
                      style={{ backgroundImage: `url('https://ik.imagekit.io/momh2323/ourika.jpg?updatedAt=1745515547100')` }}
                    ></div>
                    <div className="gallery-overlay">
                      <div className="gallery-content">
                        <h3 className="gallery-title">Ourika Valley</h3>
                        <div className="gallery-divider"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="gallery-item">
              <div 
                className="aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl"
              >
                <div className="gallery-image-container">
                  <div 
                    className="gallery-image"
                    style={{ backgroundImage: `url('https://ik.imagekit.io/momh2323/Asni.jpg?updatedAt=1745515547160')` }}
                  ></div>
                  <div className="gallery-overlay">
                    <div className="gallery-content">
                      <h3 className="gallery-title">Asni Valley</h3>
                      <div className="gallery-divider"></div>
                      <p className="gallery-description">Traditional Berber villages with snow-capped mountain backdrops</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Custom CSS for gallery effects */}
      <style jsx>{`
        .gallery-item {
          transition: transform 0.5s ease;
        }
        
        .gallery-item:hover {
          transform: translateY(-5px);
        }
        
        .gallery-image-container {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }
        
        .gallery-image {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
          transition: transform 0.8s cubic-bezier(0.33, 1, 0.68, 1);
        }
        
        .gallery-item:hover .gallery-image {
          transform: scale(1.08);
        }
        
        .gallery-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 30%, rgba(0,0,0,0) 60%);
          opacity: 0.9;
          transition: all 0.4s ease;
        }
        
        .gallery-item:hover .gallery-overlay {
          background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.1) 70%);
        }
        
        .gallery-content {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          padding: 1.5rem;
          transform: translateY(10px);
          transition: transform 0.5s ease;
        }
        
        .gallery-item:hover .gallery-content {
          transform: translateY(0);
        }
        
        .gallery-title {
          color: white;
          font-weight: 600;
          font-size: 1.25rem;
          margin-bottom: 0.5rem;
        }
        
        .gallery-divider {
          width: 0;
          height: 2px;
          background-color: white;
          margin-bottom: 0.75rem;
          transition: width 0.6s ease;
        }
        
        .gallery-item:hover .gallery-divider {
          width: 40px;
        }
        
        .gallery-description {
          color: rgba(255, 255, 255, 0.9);
          font-size: 0.875rem;
          max-width: 90%;
          opacity: 0;
          transform: translateY(10px);
          transition: all 0.5s ease 0.1s;
        }
        
        .gallery-item:hover .gallery-description {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
} 