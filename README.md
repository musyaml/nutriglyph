# NutriGlyph

NutriGlyph is a personal nutrition intelligence assistant that empowers users to easily understand food and beverage labels. The application provides comprehensive, accurate, detail-oriented, and precise analysis while maintaining an efficient and intuitive user experience.

## Features

- **Nutrition Analysis**: Analyze nutrition data from food products
- **Two Input Methods**:
  - Manual Input: Enter nutrition information manually
  - Barcode Scanner: Scan product barcodes or enter them manually
- **Detailed Analysis**: 
  - Overall health score
  - Per-component analysis with color-coding (Red/Yellow/Green)
  - Relatable analogies (e.g., "equivalent to 5 teaspoons of sugar")
  - Transparent source citations

## Tech Stack

- **Frontend**: HTML5, Tailwind CSS v4.1.13 (via Vite), Vanilla TypeScript
- **Bundler & Dev Server**: Vite
- **Backend**: Vercel Serverless Functions
- **AI Model**: Hugging Face Inference API (ibm-granite/granite-3.3-8b-instruct)
- **Data Source**: Open Food Facts API
- **Deployment**: Vercel

## Project Structure

```
nutriglyph/
├── api/                    # Vercel Serverless Functions
│   ├── huggingface.ts      # Hugging Face API proxy
│   ├── openfoodfacts.ts    # Open Food Facts API proxy
│   └── health.ts           # Health check endpoint
├── public/                 # Static assets
│   └── assets/             # Images, icons, etc.
├── src/                    # Frontend source code
│   ├── components/         # UI components
│   ├── styles/             # CSS/Tailwind styles
│   ├── utils/              # Utility functions
│   └── main.ts             # Application entry point
├── .env.local              # Environment variables
├── package.json            # Project dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Vite configuration
└── vercel.json             # Vercel deployment configuration
```

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file with your Hugging Face API token:
   ```bash
   HF_TOKEN=your_hugging_face_api_token_here
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Check for linting errors
- `npm run lint:fix` - Fix linting errors automatically
- `npm run type-check` - Check for TypeScript errors

## API Endpoints

- `/api/health` - Health check endpoint
- `/api/openfoodfacts?barcode=[barcode]` - Get product information from Open Food Facts
- `/api/huggingface` - Proxy for Hugging Face Inference API (POST only)

## Deployment

The application is configured for deployment on Vercel. Make sure to set the `HF_TOKEN` environment variable in your Vercel project settings.

For local development testing of API endpoints, you can visit `/api-test` to test the API endpoints.

## Browser Support

The application is designed to work on modern browsers that support ES6+ features and CSS Grid/Flexbox.

## Security

- Hugging Face API token is secured in environment variables
- All API calls are proxied through Vercel Serverless Functions
- CORS headers are properly set
- Input validation is implemented for all endpoints

## Development Guidelines

1. All new components should be created in the `src/components/` directory
2. Utility functions should be placed in `src/utils/`
3. All API endpoints should be created in the `api/` directory
4. Follow the existing code style and patterns

## Testing

To test the API endpoints during development:

1. Start the development server: `npm run dev`
2. Visit `http://localhost:5173/api-test`
3. Use the test interface to verify API functionality

## Contributing

1. Fork the repository
2. Create a new branch for your feature
3. Commit your changes
4. Push to your branch
5. Create a pull request

## License

This project is licensed under the MIT License.