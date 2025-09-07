export function showLoadingSpinner() {
  const appElement = document.querySelector('#app');
  if (appElement) {
    appElement.innerHTML = `
      <div class="fixed inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50">
        <div class="flex flex-col items-center px-4">
          <div class="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-t-2 border-b-2 border-gray-900"></div>
          <p class="mt-3 sm:mt-4 text-base sm:text-lg text-gray-700 text-center">Analyzing nutrition data...</p>
        </div>
      </div>
    `;
  }
}

export function hideLoadingSpinner() {
  // We don't clear the loading spinner here because it will be replaced
  // by the analysis results when displayNutritionAnalysis is called
}