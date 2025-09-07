// Import the function to show the loading spinner
import { showLoadingSpinner } from './LoadingSpinner';

/**
 * Displays the nutrition analysis results
 * @param analysis The analysis data to display
 */
export function displayNutritionAnalysis(analysis: any): void {
  console.log('Displaying nutrition analysis:', analysis);
  
  // Show loading spinner while we prepare the analysis
  showLoadingSpinner();
  
  // Use actual API delay rather than simulated one
  setTimeout(() => {
    const appElement = document.querySelector('#app');
    if (appElement) {
      appElement.innerHTML = `
        <div class="max-w-4xl mx-auto px-4 py-6 sm:py-8">
          <div class="flex items-center mb-4 sm:mb-6">
            <button id="back-to-main-from-analysis" class="flex items-center text-gray-600 hover:text-gray-900">
              <svg class="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
              </svg>
              <span class="text-sm sm:text-base">Back</span>
            </button>
          </div>
          
          <h2 class="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center text-black">Nutrition Analysis</h2>
          
          <div class="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6 sm:mb-8">
            <div class="text-center mb-4 sm:mb-6">
              <div class="inline-block w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gray-200 flex items-center justify-center mb-3 sm:mb-4">
                <span class="text-xl sm:text-2xl font-bold text-gray-700">${analysis.overallScore}</span>
              </div>
              <h3 class="text-lg sm:text-xl font-semibold text-gray-800">Health Score</h3>
            </div>
            
            <p class="mt-3 sm:mt-4 text-gray-600 text-sm sm:text-base">${analysis.summary}</p>
            
            <div class="mt-6 sm:mt-8">
              <h4 class="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4">Component Analysis</h4>
              <div class="space-y-3 sm:space-y-4">
                ${analysis.componentAnalysis.map((component: any) => `
                  <div class="border border-gray-200 rounded-lg p-3 sm:p-4">
                    <div class="flex justify-between items-center">
                      <h5 class="font-medium text-gray-800 text-sm sm:text-base">${component.name}</h5>
                      <span class="px-2 py-1 rounded text-xs sm:text-sm font-medium ${component.color === 'red' ? 'bg-red-100 text-red-800' : component.color === 'yellow' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}">
                        ${component.value} ${component.name === 'Calories' ? 'kcal' : component.name === 'Cholesterol' ? 'mg' : 'g'}
                      </span>
                    </div>
                    <p class="text-gray-600 text-sm mt-1">
                      ${component.dailyValue ? `${component.dailyValue}% of daily value` : ''}
                    </p>
                    <p class="mt-2 text-gray-700 text-sm">${component.recommendation}</p>
                  </div>
                `).join('')}
              </div>
            </div>
            
            <div class="mt-6 sm:mt-8">
              <h4 class="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4">Relatable Analogy</h4>
              <ul class="list-disc pl-5 space-y-2">
                ${analysis.analogies.map((analogy: string) => `
                  <li class="text-gray-700 text-sm sm:text-base">${analogy}</li>
                `).join('')}
              </ul>
            </div>
            
            <div class="mt-6 sm:mt-8">
              <h4 class="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4">Sources</h4>
              <ul class="list-disc pl-5 space-y-2">
                ${analysis.sources.map((source: string) => `
                  <li class="text-gray-700 text-sm sm:text-base">${source}</li>
                `).join('')}
              </ul>
            </div>
          </div>
        </div>
      `;
      
      // Add event listener for the back button
      const backToMainBtn = document.getElementById('back-to-main-from-analysis');
      if (backToMainBtn) {
        backToMainBtn.addEventListener('click', () => {
          // This would typically trigger a re-render of the main app
          location.reload();
        });
      }
    }
  }, 500); // Short delay to show loading spinner
}