import { VercelRequest, VercelResponse } from '@vercel/node';

// Ensure HF_TOKEN is defined
const HF_TOKEN = process.env.HF_TOKEN;

if (!HF_TOKEN) {
  throw new Error('HF_TOKEN is not defined in environment variables');
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed. Only POST requests are allowed.' });
  }
  
  try {
    // Extract the prompt from the request body
    const { prompt } = req.body;
    
    // Validate prompt
    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({ error: 'Prompt is required and must be a string.' });
    }
    
    // Call the Hugging Face Inference API
    const response = await fetch(
      'https://api-inference.huggingface.co/models/ibm-granite/granite-3.3-8b-instruct',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${HF_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          inputs: prompt,
          parameters: {
            max_new_tokens: 500,
            return_full_text: false
          }
        })
      }
    );
    
    // Check if the request was successful
    if (!response.ok) {
      const errorData = await response.json();
      return res.status(response.status).json({ 
        error: 'Failed to get response from Hugging Face API',
        details: errorData
      });
    }
    
    // Parse the response
    const data = await response.json();
    
    // Return the response
    return res.status(200).json({
      success: true,
      result: data
    });
    
  } catch (error) {
    console.error('Error in Hugging Face API handler:', error);
    return res.status(500).json({ 
      error: 'Internal Server Error',
      message: error instanceof Error ? error.message : 'Unknown error occurred'
    });
  }
}