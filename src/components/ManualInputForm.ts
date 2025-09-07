import { analyzeNutrition } from '../utils/nutrition';
import { displayNutritionAnalysis } from './NutritionAnalysis';

export function setupManualInputForm() {
  const formContainer = document.getElementById('manual-input-form');
  if (!formContainer) {
    console.error('Could not find #manual-input-form element');
    return;
  }

  formContainer.innerHTML = `
    <div class="max-w-4xl mx-auto px-4 py-6 sm:py-8">
      <div class="flex items-center mb-4 sm:mb-6">
        <button id="back-to-main-from-manual" class="flex items-center text-gray-600 hover:text-gray-900">
          <svg class="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
          <span class="text-sm sm:text-base">Back</span>
        </button>
      </div>
      
      <h2 class="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center text-black">Manual Input</h2>
      
      <div class="bg-white rounded-lg shadow-md p-4 sm:p-6">
        <form id="nutrition-form" class="space-y-3">
          <div>
            <label for="product-name" class="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
            <input type="text" id="product-name" name="product-name" required class="w-full px-2 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black text-sm">
          </div>
          
          <div>
            <label for="serving-size" class="block text-sm font-medium text-gray-700 mb-1">Serving Size</label>
            <input type="text" id="serving-size" name="serving-size" required class="w-full px-2 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black text-sm">
          </div>
          
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label for="calories" class="block text-sm font-medium text-gray-700 mb-1">Calories</label>
              <input type="number" id="calories" name="calories" required class="w-full px-2 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black text-sm">
            </div>
            
            <div>
              <label for="total-fat" class="block text-sm font-medium text-gray-700 mb-1">Total Fat (g)</label>
              <input type="number" step="0.1" id="total-fat" name="total-fat" required class="w-full px-2 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black text-sm">
            </div>
          </div>
          
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label for="saturated-fat" class="block text-sm font-medium text-gray-700 mb-1">Saturated Fat (g)</label>
              <input type="number" step="0.1" id="saturated-fat" name="saturated-fat" required class="w-full px-2 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black text-sm">
            </div>
            
            <div>
              <label for="trans-fat" class="block text-sm font-medium text-gray-700 mb-1">Trans Fat (g)</label>
              <input type="number" step="0.1" id="trans-fat" name="trans-fat" required class="w-full px-2 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black text-sm">
            </div>
          </div>
          
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label for="cholesterol" class="block text-sm font-medium text-gray-700 mb-1">Cholesterol (mg)</label>
              <input type="number" id="cholesterol" name="cholesterol" required class="w-full px-2 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black text-sm">
            </div>
            
            <div>
              <label for="sodium" class="block text-sm font-medium text-gray-700 mb-1">Sodium (mg)</label>
              <input type="number" id="sodium" name="sodium" required class="w-full px-2 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black text-sm">
            </div>
          </div>
          
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label for="total-carbohydrate" class="block text-sm font-medium text-gray-700 mb-1">Total Carbohydrate (g)</label>
              <input type="number" step="0.1" id="total-carbohydrate" name="total-carbohydrate" required class="w-full px-2 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black text-sm">
            </div>
            
            <div>
              <label for="dietary-fiber" class="block text-sm font-medium text-gray-700 mb-1">Dietary Fiber (g)</label>
              <input type="number" step="0.1" id="dietary-fiber" name="dietary-fiber" required class="w-full px-2 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black text-sm">
            </div>
          </div>
          
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label for="sugars" class="block text-sm font-medium text-gray-700 mb-1">Sugars (g)</label>
              <input type="number" step="0.1" id="sugars" name="sugars" required class="w-full px-2 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black text-sm">
            </div>
            
            <div>
              <label for="protein" class="block text-sm font-medium text-gray-700 mb-1">Protein (g)</label>
              <input type="number" step="0.1" id="protein" name="protein" required class="w-full px-2 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black text-sm">
            </div>
          </div>
          
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label for="vitamin-d" class="block text-sm font-medium text-gray-700 mb-1">Vitamin D (mcg)</label>
              <input type="number" step="0.1" id="vitamin-d" name="vitamin-d" required class="w-full px-2 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black text-sm">
            </div>
            
            <div>
              <label for="calcium" class="block text-sm font-medium text-gray-700 mb-1">Calcium (mg)</label>
              <input type="number" id="calcium" name="calcium" required class="w-full px-2 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black text-sm">
            </div>
          </div>
          
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label for="iron" class="block text-sm font-medium text-gray-700 mb-1">Iron (mg)</label>
              <input type="number" step="0.1" id="iron" name="iron" required class="w-full px-2 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black text-sm">
            </div>
            
            <div>
              <label for="potassium" class="block text-sm font-medium text-gray-700 mb-1">Potassium (mg)</label>
              <input type="number" id="potassium" name="potassium" required class="w-full px-2 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black text-sm">
            </div>
          </div>
          
          <div class="flex justify-center pt-4">
            <button type="submit" id="analyze-nutrition-btn" class="bg-black text-white font-bold py-2 px-6 rounded-md hover:opacity-90 transition-opacity text-sm">
              Analyze Nutrition
            </button>
          </div>
        </form>
      </div>
    </div>
  `;

  // Add event listeners
  const backToMainBtn = document.getElementById('back-to-main-from-manual');
  const nutritionForm = document.getElementById('nutrition-form') as HTMLFormElement;

  if (backToMainBtn) {
    backToMainBtn.addEventListener('click', () => {
      const formContainer = document.getElementById('manual-input-form');
      const heroSection = document.querySelector('#hero-section');
      const descriptionSection = document.querySelector('#description-section');
      const actionSection = document.querySelector('#action-section');
      
      if (formContainer) formContainer.classList.add('hidden');
      if (heroSection) heroSection.classList.remove('hidden');
      if (descriptionSection) descriptionSection.classList.remove('hidden');
      if (actionSection) actionSection.classList.remove('hidden');
    });
  }

  if (nutritionForm) {
    nutritionForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      console.log('Form submitted');
      
      // Collect form data
      const formData = new FormData(nutritionForm);
      const nutritionData = {
        productName: formData.get('product-name') as string,
        servingSize: formData.get('serving-size') as string,
        calories: parseFloat(formData.get('calories') as string) || 0,
        totalFat: parseFloat(formData.get('total-fat') as string) || 0,
        saturatedFat: parseFloat(formData.get('saturated-fat') as string) || 0,
        transFat: parseFloat(formData.get('trans-fat') as string) || 0,
        cholesterol: parseFloat(formData.get('cholesterol') as string) || 0,
        sodium: parseFloat(formData.get('sodium') as string) || 0,
        totalCarbohydrate: parseFloat(formData.get('total-carbohydrate') as string) || 0,
        dietaryFiber: parseFloat(formData.get('dietary-fiber') as string) || 0,
        sugars: parseFloat(formData.get('sugars') as string) || 0,
        protein: parseFloat(formData.get('protein') as string) || 0,
        vitaminD: parseFloat(formData.get('vitamin-d') as string) || 0,
        calcium: parseFloat(formData.get('calcium') as string) || 0,
        iron: parseFloat(formData.get('iron') as string) || 0,
        potassium: parseFloat(formData.get('potassium') as string) || 0
      };
      
      console.log('Nutrition data collected:', nutritionData);
      
      try {
        // Import the analyzeNutritionData function
        const { analyzeNutritionData } = await import('../utils/api');
        
        // Call the analysis function
        const analysis = await analyzeNutritionData(nutritionData);
        
        // Display the results
        const { displayNutritionAnalysis } = await import('./NutritionAnalysis');
        displayNutritionAnalysis(analysis);
      } catch (error) {
        console.error('Error analyzing nutrition data:', error);
        // Show error message to user
        alert('Error analyzing nutrition data. Please try again.');
      }
    });
  }

  console.log('Manual input form set up');
}