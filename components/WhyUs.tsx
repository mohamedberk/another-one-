import React from 'react';

export function WhyUs() {
  return (
    <div id="about" className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 my-16">
      <div className="py-12 bg-white rounded-3xl overflow-hidden relative border border-gray-100 shadow-sm">
        {/* Main content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Why Us button */}
          <div className="flex justify-center mb-6">
            <button className="px-6 py-2 bg-neutral-100 border border-neutral-200 rounded-full text-neutral-700 text-sm font-medium transition-all duration-300 hover:bg-neutral-200">
              Why Us?
            </button>
          </div>
          
          {/* Headline */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-neutral-800 mb-4 font-display">
            Simple. Safe. Fun.
          </h2>
          
          <p className="text-center text-neutral-600 mb-12 max-w-2xl mx-auto">
            Local guides who know their stuff and love what they do
          </p>
          
          {/* Feature cards - first row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
            <div className="bg-white/80 backdrop-blur-md border border-white/80 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-neutral-800 to-neutral-700 flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white">
                    <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-neutral-800 mb-1">Safe & Reliable</h3>
                  <p className="text-neutral-600 mb-2 text-sm">24/7 support with trusted local guides</p>
                  <a href="#" className="inline-flex items-center text-xs text-neutral-500 hover:text-neutral-800 transition-colors">
                    Learn more
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3 ml-1">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-md border border-white/80 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-neutral-800 to-neutral-700 flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white">
                    <path d="M21.721 12.752a9.711 9.711 0 00-.945-5.003 12.754 12.754 0 01-4.339 2.708 18.991 18.991 0 01-.214 4.772 17.165 17.165 0 005.498-2.477zM14.634 15.55a17.324 17.324 0 00.332-4.647c-.952.227-1.945.347-2.966.347-1.021 0-2.014-.12-2.966-.347a17.515 17.515 0 00.332 4.647 17.385 17.385 0 005.268 0zM9.772 17.119a18.963 18.963 0 004.456 0A17.182 17.182 0 0112 21.724a17.18 17.18 0 01-2.228-4.605zM7.777 15.23a18.87 18.87 0 01-.214-4.774 12.753 12.753 0 01-4.34-2.708 9.711 9.711 0 00-.944 5.004 17.165 17.165 0 005.498 2.477zM21.356 14.752a9.765 9.765 0 01-7.478 6.817 18.64 18.64 0 001.988-4.718 18.627 18.627 0 005.49-2.098zM2.644 14.752c1.682.971 3.53 1.688 5.49 2.099a18.64 18.64 0 001.988 4.718 9.765 9.765 0 01-7.478-6.816zM13.878 2.43a9.755 9.755 0 016.116 3.986 11.267 11.267 0 01-3.746 2.504 18.63 18.63 0 00-2.37-6.49zM12 2.276a17.152 17.152 0 012.805 7.121c-.897.23-1.837.353-2.805.353-.968 0-1.908-.122-2.805-.353A17.151 17.151 0 0112 2.276zM10.122 2.43a18.629 18.629 0 00-2.37 6.49 11.266 11.266 0 01-3.746-2.504 9.754 9.754 0 016.116-3.985z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-neutral-800 mb-1">Local Experts</h3>
                  <p className="text-neutral-600 mb-2 text-sm">Born and raised here - we know all the hidden spots</p>
                  <a href="#" className="inline-flex items-center text-xs text-neutral-500 hover:text-neutral-800 transition-colors">
                    Learn more
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3 ml-1">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-md border border-white/80 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-neutral-800 to-neutral-700 flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white">
                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-neutral-800 mb-1">Top Experience</h3>
                  <p className="text-neutral-600 mb-2 text-sm">Premium service without the premium price tag</p>
                  <a href="#" className="inline-flex items-center text-xs text-neutral-500 hover:text-neutral-800 transition-colors">
                    Learn more
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3 ml-1">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Feature cards - second row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-white/80 backdrop-blur-md border border-white/80 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-neutral-800 to-neutral-700 flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white">
                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-neutral-800 mb-1">Flexible Plans</h3>
                  <p className="text-neutral-600 mb-2 text-sm">Your schedule, your way - we adapt to you</p>
                  <a href="#" className="inline-flex items-center text-xs text-neutral-500 hover:text-neutral-800 transition-colors">
                    Learn more
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3 ml-1">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-md border border-white/80 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-neutral-800 to-neutral-700 flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white">
                    <path d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM1.5 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM17.25 19.128l-.001.144a2.25 2.25 0 01-.233.96 10.088 10.088 0 005.06-1.01.75.75 0 00.42-.643 4.875 4.875 0 00-6.957-4.611 8.586 8.586 0 011.71 5.157v.003z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-neutral-800 mb-1">Small Groups</h3>
                  <p className="text-neutral-600 mb-2 text-sm">Keep it cozy with smaller groups for better vibes</p>
                  <a href="#" className="inline-flex items-center text-xs text-neutral-500 hover:text-neutral-800 transition-colors">
                    Learn more
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3 ml-1">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-md border border-white/80 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-neutral-800 to-neutral-700 flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white">
                    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-neutral-800 mb-1">Personal Touch</h3>
                  <p className="text-neutral-600 mb-2 text-sm">We treat you like family, not just another tourist</p>
                  <a href="#" className="inline-flex items-center text-xs text-neutral-500 hover:text-neutral-800 transition-colors">
                    Learn more
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3 ml-1">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 