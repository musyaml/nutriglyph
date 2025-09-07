export function showNotFoundPage() {
  const appElement = document.querySelector('#app');
  if (!appElement) return;
  
  appElement.innerHTML = `
    <div class="max-w-4xl mx-auto px-4 py-16 text-center">
      <h1 class="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p class="text-xl mb-8">The page you're looking for doesn't exist.</p>
      <button id="back-to-home" class="btn-primary">
        Back to Home
      </button>
    </div>
  `;
  
  // Add event listener for back to home button
  const backToHomeBtn = document.getElementById('back-to-home');
  if (backToHomeBtn) {
    backToHomeBtn.addEventListener('click', () => {
      window.location.href = '/';
    });
  }
}