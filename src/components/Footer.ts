export function setupFooter() {
  const footerContainer = document.getElementById('footer-container');
  if (!footerContainer) {
    console.error('Could not find #footer-container element');
    return;
  }
  
  const currentYear = new Date().getFullYear();
  
  footerContainer.innerHTML = `
    <footer class="bg-white border-t border-gray-200">
      <div class="max-w-7xl mx-auto py-4 sm:py-6 px-4 sm:px-6 lg:px-8">
        <p class="text-center text-xs sm:text-sm text-gray-500">
          &copy; ${currentYear} NutriGlyph. All rights reserved.
        </p>
      </div>
    </footer>
  `;
  
  console.log('Footer set up');
}