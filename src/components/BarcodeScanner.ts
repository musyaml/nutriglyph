import { showLoadingSpinner, hideLoadingSpinner } from './LoadingSpinner';
import { analyzeNutrition } from '../utils/nutrition';
import { displayNutritionAnalysis } from './NutritionAnalysis';

export function setupBarcodeScanner() {
  const scannerView = document.getElementById('scan-barcode-view');
  if (!scannerView) {
    console.error('Could not find #scan-barcode-view element');
    return;
  }

  scannerView.innerHTML = `
    <div class="max-w-4xl mx-auto px-4 py-6 sm:py-8">
      <div class="flex items-center mb-4 sm:mb-6">
        <button id="back-to-main-from-scanner" class="flex items-center text-gray-600 hover:text-gray-900">
          <svg class="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
          <span class="text-sm sm:text-base">Back</span>
        </button>
      </div>
      
      <h2 class="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center text-black">Scan Barcode</h2>
      
      <div class="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6 sm:mb-8">
        <div class="text-center">
          <div class="mx-auto w-24 h-24 sm:w-32 sm:h-32 bg-gray-200 rounded-lg mb-4 sm:mb-6 flex items-center justify-center">
            <svg class="w-12 h-12 sm:w-16 sm:h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"></path>
            </svg>
          </div>
          <p class="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">Point your camera at a product barcode to scan</p>
          <button id="open-camera-btn" class="bg-black text-white font-bold py-2 px-4 sm:py-3 sm:px-6 rounded-md hover:opacity-90 transition-opacity mb-4 sm:mb-6 text-sm sm:text-base">
            Open Camera
          </button>
          <div id="camera-container" class="hidden">
            <video id="camera-feed" class="w-full h-auto rounded-lg shadow-md"></video>
            <button id="close-camera-btn" class="mt-3 sm:mt-4 bg-gray-500 text-white font-bold py-2 px-4 rounded-md hover:opacity-90 transition-opacity text-sm sm:text-base">
              Close Camera
            </button>
          </div>
        </div>
      </div>
      
      <div class="bg-white rounded-lg shadow-md p-4 sm:p-6">
        <h3 class="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-black">Or Enter Barcode Manually</h3>
        <div class="flex flex-col sm:flex-row gap-2">
          <input type="text" id="manual-barcode" placeholder="Enter barcode number" class="flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black text-sm sm:text-base">
          <button id="submit-barcode-btn" class="bg-black text-white font-bold py-2 px-4 sm:py-2 sm:px-6 rounded-md hover:opacity-90 transition-opacity text-sm sm:text-base">
            Submit
          </button>
        </div>
      </div>
    </div>
  `;

  // Add event listeners
  const backToMainBtn = document.getElementById('back-to-main-from-scanner');
  const openCameraBtn = document.getElementById('open-camera-btn');
  const closeCameraBtn = document.getElementById('close-camera-btn');
  const submitBarcodeBtn = document.getElementById('submit-barcode-btn');
  const cameraContainer = document.getElementById('camera-container');

  if (backToMainBtn) {
    backToMainBtn.addEventListener('click', () => {
      const scannerView = document.getElementById('scan-barcode-view');
      const heroSection = document.querySelector('#hero-section');
      const descriptionSection = document.querySelector('#description-section');
      const actionSection = document.querySelector('#action-section');
      
      if (scannerView) scannerView.classList.add('hidden');
      if (heroSection) heroSection.classList.remove('hidden');
      if (descriptionSection) descriptionSection.classList.remove('hidden');
      if (actionSection) actionSection.classList.remove('hidden');
    });
  }

  if (openCameraBtn && cameraContainer) {
    openCameraBtn.addEventListener('click', () => {
      cameraContainer.classList.remove('hidden');
      openCameraBtn.classList.add('hidden');
    });
  }

  if (closeCameraBtn && cameraContainer && openCameraBtn) {
    closeCameraBtn.addEventListener('click', () => {
      cameraContainer.classList.add('hidden');
      openCameraBtn.classList.remove('hidden');
    });
  }

  if (submitBarcodeBtn) {
    submitBarcodeBtn.addEventListener('click', () => {
      const barcodeInput = document.getElementById('manual-barcode') as HTMLInputElement;
      if (barcodeInput && barcodeInput.value.trim() !== '') {
        console.log('Submitting barcode:', barcodeInput.value);
        // Here you would typically call a function to process the barcode
        // For now, we'll just log it
      }
    });
  }

  console.log('Barcode scanner set up');
}

// Camera functionality
let stream: MediaStream | null = null;
let videoElement: HTMLVideoElement | null = null;

async function openCameraPreview() {
  const cameraPreviewContainer = document.getElementById('camera-preview-container');
  const cameraPreview = document.getElementById('camera-preview') as HTMLVideoElement;
  const captureBtn = document.getElementById('capture-btn');
  
  if (!cameraPreviewContainer || !cameraPreview || !captureBtn) {
    alert('Camera functionality not fully implemented in this demo.');
    return;
  }
  
  try {
    // Request camera access
    stream = await navigator.mediaDevices.getUserMedia({ 
      video: { facingMode: 'environment' } 
    });
    
    // Set video source
    cameraPreview.srcObject = stream;
    cameraPreview.play();
    
    // Show camera preview
    cameraPreviewContainer.classList.remove('hidden');
    
    // Add event listener for capture button
    captureBtn.onclick = () => {
      captureImage();
    };
  } catch (error) {
    console.error('Error accessing camera:', error);
    alert('Could not access camera. Please ensure you have given permission and that your device has a camera.');
  }
}

function closeCameraPreview() {
  const cameraPreviewContainer = document.getElementById('camera-preview-container');
  
  if (cameraPreviewContainer) {
    cameraPreviewContainer.classList.add('hidden');
  }
  
  // Stop camera stream
  if (stream) {
    stream.getTracks().forEach(track => track.stop());
    stream = null;
  }
}

function captureImage() {
  // In a real implementation, this would capture an image from the video stream
  // and then use a barcode scanning library to decode the barcode
  alert('In a full implementation, this would capture an image and scan for barcodes. For this demo, please use the manual barcode entry.');
  
  // Close camera preview
  closeCameraPreview();
}