import './styles/tailwind.css';
import { setupNutriGlyphApp } from './components/App';

// Wait for DOM to be fully loaded before initializing the app
document.addEventListener('DOMContentLoaded', () => {
  // Small delay to ensure DOM is fully ready
  setTimeout(() => {
    // Render main content
    const appElement = document.querySelector('#app');
    if (appElement) {
      appElement.innerHTML = `
        <div id="navbar-container"></div>
        <div id="main-content" class="main-content">
          <div id="hero-section" class="text-center py-8 sm:py-12">
            <h1 class="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4 text-black">Welcome to NutriGlyph</h1>
            <p class="text-lg sm:text-xl mb-6 sm:mb-8 text-black">Your personal nutrition intelligence assistant</p>
          </div>
          
          <div id="description-section" class="max-w-4xl mx-auto px-4 py-6 sm:py-8">
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <div class="bg-[#ffffff] p-4 sm:p-6 rounded-lg shadow-md">
                <div class="w-10 h-10 sm:w-12 sm:h-12 bg-gray-200 rounded-full mb-3 sm:mb-4 flex items-center justify-center">
                  <!-- SVG icon placeholder -->
                  <svg class="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                  </svg>
                </div>
                <h3 class="text-lg sm:text-xl font-semibold mb-2 text-black">Comprehensive Analysis</h3>
                <p class="text-sm sm:text-base text-black">Get detailed insights into food and beverage labels with our advanced AI-powered analysis.</p>
              </div>
              
              <div class="bg-[#ffffff] p-4 sm:p-6 rounded-lg shadow-md">
                <div class="w-10 h-10 sm:w-12 sm:h-12 bg-gray-200 rounded-full mb-3 sm:mb-4 flex items-center justify-center">
                  <!-- SVG icon placeholder -->
                  <svg class="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <h3 class="text-lg sm:text-xl font-semibold mb-2 text-black">Quick Scanning</h3>
                <p class="text-sm sm:text-base text-black">Scan barcodes instantly or input nutrition data manually for immediate analysis.</p>
              </div>
              
              <div class="bg-[#ffffff] p-4 sm:p-6 rounded-lg shadow-md">
                <div class="w-10 h-10 sm:w-12 sm:h-12 bg-gray-200 rounded-full mb-3 sm:mb-4 flex items-center justify-center">
                  <!-- SVG icon placeholder -->
                  <svg class="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                  </svg>
                </div>
                <h3 class="text-lg sm:text-xl font-semibold mb-2 text-black">Actionable Insights</h3>
                <p class="text-sm sm:text-base text-black">Receive clear, easy-to-understand health scores and recommendations based on global standards.</p>
              </div>
            </div>
          </div>
          
          <div id="action-section" class="max-w-4xl mx-auto px-4 py-6 sm:py-8">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
              <div class="bg-[#ffffff] p-6 sm:p-8 rounded-lg shadow-md text-center cursor-pointer hover:shadow-lg transition-shadow" id="manual-input-card">
                <div class="w-12 h-12 sm:w-16 sm:h-16 bg-gray-200 rounded-full mb-3 sm:mb-4 flex items-center justify-center mx-auto">
                  <!-- SVG icon placeholder -->
                  <svg class="w-6 h-6 sm:w-8 sm:h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                  </svg>
                </div>
                <h3 class="text-xl sm:text-2xl font-bold mb-2 text-black">Manual Input</h3>
                <p class="mb-3 sm:mb-4 text-sm sm:text-base text-black">Enter nutrition information manually for detailed analysis</p>
                <button class="bg-[#181818] text-[#ffffff] font-bold py-2 px-4 sm:py-3 sm:px-6 rounded hover:opacity-90 transition-opacity text-sm sm:text-base">
                  Analyze Now
                </button>
              </div>
              
              <div class="bg-[#ffffff] p-6 sm:p-8 rounded-lg shadow-md text-center cursor-pointer hover:shadow-lg transition-shadow" id="scan-barcode-card">
                <div class="w-12 h-12 sm:w-16 sm:h-16 bg-gray-200 rounded-full mb-3 sm:mb-4 flex items-center justify-center mx-auto">
                  <!-- SVG icon placeholder -->
                  <svg class="w-6 h-6 sm:w-8 sm:h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"></path>
                  </svg>
                </div>
                <h3 class="text-xl sm:text-2xl font-bold mb-2 text-black">Scan Barcode</h3>
                <p class="mb-3 sm:mb-4 text-sm sm:text-base text-black">Use your camera to scan product barcodes for instant analysis</p>
                <button class="bg-[#181818] text-[#ffffff] font-bold py-2 px-4 sm:py-3 sm:px-6 rounded hover:opacity-90 transition-opacity text-sm sm:text-base">
                  Scan Now
                </button>
              </div>
            </div>
          </div>
          
          <div id="manual-input-form" class="hidden">
            <!-- Manual input form will be dynamically inserted here -->
          </div>
          
          <div id="scan-barcode-view" class="hidden max-w-4xl mx-auto px-4 py-8">
            <!-- Barcode scanner view will be dynamically inserted here -->
          </div>
        </div>
        <div id="footer-container"></div>
        <div id="scroll-to-top" class="fixed bottom-6 sm:bottom-8 right-6 sm:right-8 w-10 h-10 sm:w-12 sm:h-12 bg-[#181818] text-[#ffffff] rounded-full shadow-lg flex items-center justify-center cursor-pointer hidden">
          <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"></path>
          </svg>
        </div>
      `;
      
      // Initialize the NutriGlyph application
      setupNutriGlyphApp();
    } else {
      console.error('Could not find #app element');
    }
  }, 0); // Minimal delay to ensure proper initialization
});