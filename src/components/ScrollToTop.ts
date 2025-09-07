export function setupScrollToTop() {
  const scrollToTopButton = document.getElementById('scroll-to-top');
  
  if (!scrollToTopButton) {
    console.error('Could not find #scroll-to-top element');
    return;
  }
  
  // Show/hide scroll to top button based on scroll position
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollToTopButton.classList.remove('hidden');
    } else {
      scrollToTopButton.classList.add('hidden');
    }
  });
  
  // Scroll to top when button is clicked
  scrollToTopButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  console.log('Scroll to top set up');
}