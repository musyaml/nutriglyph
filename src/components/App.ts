import { setupNavbar } from './Navbar';
import { setupFooter } from './Footer';
import { setupScrollToTop } from './ScrollToTop';
import { setupManualInputForm } from './ManualInputForm';
import { setupBarcodeScanner } from './BarcodeScanner';

export function setupNutriGlyphApp() {
  console.log('Setting up NutriGlyph app components...');
  
  // Setup all components
  setupNavbar();
  setupFooter();
  setupScrollToTop();
  setupManualInputForm();
  setupBarcodeScanner();
  
  console.log('All components set up');
  
  // Add event listeners for the action cards
  const manualInputCard = document.getElementById('manual-input-card');
  const scanBarcodeCard = document.getElementById('scan-barcode-card');
  const heroSection = document.querySelector('#hero-section');
  const descriptionSection = document.querySelector('#description-section');
  const actionSection = document.querySelector('#action-section');
  const manualInputForm = document.getElementById('manual-input-form');
  const scanBarcodeView = document.getElementById('scan-barcode-view');
  
  if (manualInputCard) {
    manualInputCard.addEventListener('click', () => {
      console.log('Manual input card clicked');
      // Hide main content sections
      if (heroSection) heroSection.classList.add('hidden');
      if (descriptionSection) descriptionSection.classList.add('hidden');
      if (actionSection) actionSection.classList.add('hidden');
      
      // Show manual input form
      if (manualInputForm) manualInputForm.classList.remove('hidden');
    });
  }
  
  if (scanBarcodeCard) {
    scanBarcodeCard.addEventListener('click', () => {
      console.log('Scan barcode card clicked');
      // Hide main content sections
      if (heroSection) heroSection.classList.add('hidden');
      if (descriptionSection) descriptionSection.classList.add('hidden');
      if (actionSection) actionSection.classList.add('hidden');
      
      // Show barcode scanner view
      if (scanBarcodeView) scanBarcodeView.classList.remove('hidden');
    });
  }
}