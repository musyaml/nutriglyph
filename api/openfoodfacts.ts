import type { VercelRequest, VercelResponse } from '@vercel/node';

const OPEN_FOOD_FACTS_API_BASE = 'https://world.openfoodfacts.org/api/v2/product';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed. Only GET requests are allowed.' });
  }
  
  try {
    // Extract the barcode from the query parameters
    const { barcode } = req.query;
    
    // Validate barcode
    if (!barcode || typeof barcode !== 'string') {
      return res.status(400).json({ error: 'Barcode is required and must be a string.' });
    }
    
    // Call the Open Food Facts API
    const response = await fetch(`${OPEN_FOOD_FACTS_API_BASE}/${barcode}.json`);
    
    // Check if the request was successful
    if (!response.ok) {
      return res.status(response.status).json({ 
        error: 'Failed to get response from Open Food Facts API',
        status: response.status
      });
    }
    
    // Parse the response
    const data = await response.json();
    
    // Return the response
    return res.status(200).json(data);
    
  } catch (error) {
    console.error('Error in Open Food Facts API handler:', error);
    return res.status(500).json({ 
      error: 'Internal Server Error',
      message: error instanceof Error ? error.message : 'Unknown error occurred'
    });
  }
}