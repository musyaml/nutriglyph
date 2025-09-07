// Nutrition analysis utilities

// Calculate daily value percentages based on a 2000 calorie diet
export function calculateDailyValue(nutrient: string, amount: number): number {
  const dailyValues: { [key: string]: number } = {
    'calories': 2000,
    'totalFat': 65,
    'saturatedFat': 20,
    'cholesterol': 300,
    'sodium': 2400,
    'totalCarbohydrate': 300,
    'dietaryFiber': 25,
    'sugars': 50, // Added sugars recommendation
    'protein': 50,
    'vitaminD': 20,
    'calcium': 1300,
    'iron': 18,
    'potassium': 3500
  };
  
  const dailyValue = dailyValues[nutrient] || 1; // Default to 1 to avoid division by zero
  return Math.round((amount / dailyValue) * 100);
}

// Score nutrients based on health guidelines (1-5 scale, 5 being best)
export function scoreNutrient(nutrient: string, amount: number, dailyValue: number): number {
  // Special cases for certain nutrients where higher is better
  const positiveNutrients = ['dietaryFiber', 'protein', 'vitaminD', 'calcium', 'iron', 'potassium'];
  
  if (positiveNutrients.includes(nutrient)) {
    if (dailyValue >= 20) return 5;
    if (dailyValue >= 15) return 4;
    if (dailyValue >= 10) return 3;
    if (dailyValue >= 5) return 2;
    return 1;
  }
  
  // Scoring logic based on daily value percentages for other nutrients
  if (dailyValue <= 5) return 5; // Excellent
  if (dailyValue <= 10) return 4; // Good
  if (dailyValue <= 15) return 3; // Average
  if (dailyValue <= 20) return 2; // Poor
  return 1; // Very Poor
}

// Get color coding based on score
export function getColorFromScore(score: number): 'red' | 'yellow' | 'green' {
  if (score <= 2) return 'red';
  if (score <= 3) return 'yellow';
  return 'green';
}

// Generate recommendations based on nutrient scores
export function generateRecommendation(nutrient: string, score: number): string {
  const recommendations: { [key: string]: { [key: number]: string } } = {
    'sugar': {
      1: 'Significantly reduce sugar intake. Consider alternatives like fresh fruits.',
      2: 'Reduce sugar intake. Look for products with less added sugars.',
      3: 'Moderate sugar content. Be mindful of additional sugar sources.',
      4: 'Good sugar content. Keep monitoring overall intake.',
      5: 'Excellent sugar content. Low in added sugars.'
    },
    'saturatedFat': {
      1: 'High in saturated fat. Choose leaner options and limit consumption.',
      2: 'Moderately high in saturated fat. Reduce intake where possible.',
      3: 'Average saturated fat content. Maintain in moderation.',
      4: 'Low saturated fat content. Good choice for heart health.',
      5: 'Very low saturated fat. Excellent for cardiovascular health.'
    },
    'sodium': {
      1: 'Very high sodium content. Seek low-sodium alternatives.',
      2: 'High sodium content. Limit consumption and choose reduced-sodium options.',
      3: 'Moderate sodium content. Consume in moderation.',
      4: 'Low sodium content. Good for blood pressure management.',
      5: 'Very low sodium. Ideal for low-sodium diets.'
    },
    'dietaryFiber': {
      1: 'Very low fiber content. Add more whole grains, fruits, and vegetables.',
      2: 'Low fiber content. Include more fiber-rich foods in your diet.',
      3: 'Average fiber content. Could benefit from additional fiber sources.',
      4: 'Good fiber content. Supports digestive health.',
      5: 'Excellent fiber content. Promotes fullness and digestive health.'
    }
  };
  
  // Default recommendations for other nutrients
  const defaultRecommendations: { [key: number]: string } = {
    1: `Low ${nutrient.toLowerCase()} content. Consider foods rich in ${nutrient.toLowerCase()}.`,
    2: `Below average ${nutrient.toLowerCase()} content. Look for more nutrient-dense options.`,
    3: `Average ${nutrient.toLowerCase()} content. Part of a balanced diet.`,
    4: `Good ${nutrient.toLowerCase()} content. Contributes to nutritional needs.`,
    5: `Excellent ${nutrient.toLowerCase()} content. Great for meeting daily requirements.`
  };
  
  const nutrientRecs = recommendations[nutrient];
  if (nutrientRecs) {
    return nutrientRecs[score] || defaultRecommendations[score];
  }
  return defaultRecommendations[score] || `No specific recommendation for ${nutrient} at score ${score}.`;
}

// Generate relatable analogies for nutrient amounts
export function generateAnalogies(nutritionData: any): string[] {
  const analogies: string[] = [];
  
  // Sugar analogy
  if (nutritionData.sugars > 0) {
    const teaspoons = Math.round(nutritionData.sugars / 4); // 4g sugar per teaspoon
    analogies.push(`Contains as much sugar as ${teaspoons} teaspoons of table sugar`);
  }
  
  // Sodium analogy
  if (nutritionData.sodium > 0) {
    const saltTeaspoons = (nutritionData.sodium / 2300 * 6).toFixed(1); // 2300mg sodium = 6g salt
    analogies.push(`Contains approximately ${saltTeaspoons} teaspoons of salt`);
  }
  
  return analogies;
}

// Analyze nutrition data and generate a comprehensive report
export function analyzeNutrition(nutritionData: any) {
  const componentAnalysis = [];
  
  // Analyze each nutrient
  const nutrients = [
    { name: 'Sugar', value: nutritionData.sugars, key: 'sugars' },
    { name: 'Saturated Fat', value: nutritionData.saturatedFat, key: 'saturatedFat' },
    { name: 'Sodium', value: nutritionData.sodium, key: 'sodium' },
    { name: 'Fiber', value: nutritionData.dietaryFiber, key: 'dietaryFiber' },
    { name: 'Protein', value: nutritionData.protein, key: 'protein' }
  ];
  
  for (const nutrient of nutrients) {
    const dailyValue = calculateDailyValue(nutrient.key, nutrient.value);
    const score = scoreNutrient(nutrient.key, nutrient.value, dailyValue);
    const color = getColorFromScore(score);
    const recommendation = generateRecommendation(nutrient.key, score);
    
    componentAnalysis.push({
      name: nutrient.name,
      value: nutrient.value,
      dailyValue,
      score,
      color,
      recommendation
    });
  }
  
  // Calculate overall score (simple average of component scores)
  const overallScore = Math.round(
    componentAnalysis.reduce((sum, item) => sum + item.score, 0) / componentAnalysis.length
  );
  
  // Generate summary
  const summary = generateSummary(overallScore, componentAnalysis);
  
  // Generate analogies
  const analogies = generateAnalogies(nutritionData);
  
  // Define sources
  const sources = [
    'Based on FDA Daily Values for a 2000 calorie diet',
    'World Health Organization recommendations for sugar intake (less than 10% of total energy)',
    'American Heart Association recommendations for sodium (1500mg daily)'
  ];
  
  return {
    overallScore,
    componentAnalysis,
    summary,
    analogies,
    sources
  };
}

// Generate a summary based on the overall score and component analysis
function generateSummary(overallScore: number, componentAnalysis: any[]): string {
  let summary = '';
  
  if (overallScore >= 4) {
    summary = 'This product has a strong nutritional profile with several beneficial components.';
  } else if (overallScore >= 3) {
    summary = 'This product has a moderate nutritional profile with some areas for improvement.';
  } else {
    summary = 'This product has a below-average nutritional profile with several areas for concern.';
  }
  
  // Add specific highlights
  const redComponents = componentAnalysis.filter((c: any) => c.color === 'red');
  const greenComponents = componentAnalysis.filter((c: any) => c.color === 'green');
  
  if (redComponents.length > 0) {
    const componentNames = redComponents.map((c: any) => c.name).join(', ');
    summary += ` Be mindful of its ${componentNames} content.`;
  }
  
  if (greenComponents.length > 0) {
    const componentNames = greenComponents.map((c: any) => c.name).join(', ');
    summary += ` It has good amounts of ${componentNames}.`;
  }
  
  return summary;
}