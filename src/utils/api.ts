// API utility functions
const OPEN_FOOD_FACTS_API_BASE = 'https://world.openfoodfacts.org/api/v2/product';

// Fetch product data from Open Food Facts API
export async function fetchProductByBarcode(barcode: string): Promise<any> {
  try {
    const response = await fetch(`${OPEN_FOOD_FACTS_API_BASE}/${barcode}.json`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching product data:', error);
    throw error;
  }
}

// Send nutrition data to our backend for analysis
export async function analyzeNutritionData(nutritionData: any): Promise<any> {
  try {
    console.log('Sending nutrition data for analysis:', nutritionData);
    
    // Create a prompt for the AI model
    const prompt = `Analyze the nutrition data for a food product with the following nutrition information per serving:
Product Name: ${nutritionData.productName || 'Not specified'}
Serving Size: ${nutritionData.servingSize || 'Not specified'}
Calories: ${nutritionData.calories || 0} kcal
Total Fat: ${nutritionData.totalFat || 0} g
Saturated Fat: ${nutritionData.saturatedFat || 0} g
Trans Fat: ${nutritionData.transFat || 0} g
Cholesterol: ${nutritionData.cholesterol || 0} mg
Sodium: ${nutritionData.sodium || 0} mg
Total Carbohydrate: ${nutritionData.totalCarbohydrate || 0} g
Dietary Fiber: ${nutritionData.dietaryFiber || 0} g
Sugars: ${nutritionData.sugars || 0} g
Protein: ${nutritionData.protein || 0} g
Vitamin D: ${nutritionData.vitaminD || 0} mcg
Calcium: ${nutritionData.calcium || 0} mg
Iron: ${nutritionData.iron || 0} mg
Potassium: ${nutritionData.potassium || 0} mg

Provide a comprehensive nutrition analysis including:
1. An overall health score (0-100)
2. Per-component analysis for key nutrients (Sugar, Saturated Fat, Sodium, Fiber, Protein) with a rating (1-5) and color coding (red for concerning, yellow for moderate, green for good)
3. A brief summary of the product's nutritional profile
4. Specific recommendations for each nutrient
5. Relatable analogies (e.g., "equivalent to X teaspoons of sugar")
6. Source citations for the recommendations

Format your response as a JSON object with the following structure:
{
  "overallScore": number,
  "componentAnalysis": [
    {
      "name": string,
      "value": number,
      "dailyValue": number,
      "score": number,
      "color": "red" | "yellow" | "green",
      "recommendation": string
    }
  ],
  "summary": string,
  "analogies": [string],
  "sources": [string]
}`;

    // Call our Vercel Serverless Function that proxies to Hugging Face
    const response = await fetch('/api/huggingface', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ prompt })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    // Parse the JSON response from the AI model
    // The Hugging Face API returns an array with the generated text
    if (data.result && data.result[0] && data.result[0].generated_text) {
      try {
        // Extract JSON from the generated text
        const jsonStart = data.result[0].generated_text.indexOf('{');
        const jsonEnd = data.result[0].generated_text.lastIndexOf('}') + 1;
        const jsonString = data.result[0].generated_text.substring(jsonStart, jsonEnd);
        const analysis = JSON.parse(jsonString);
        return analysis;
      } catch (parseError) {
        console.error('Error parsing AI response:', parseError);
        throw new Error('Failed to parse AI analysis results');
      }
    } else {
      throw new Error('Invalid response format from AI model');
    }
  } catch (error) {
    console.error('Error analyzing nutrition data:', error);
    throw error;
  }
}