export function setupNavbar() {
  const navbarContainer = document.getElementById('navbar-container');
  if (!navbarContainer) {
    console.error('Could not find #navbar-container element');
    return;
  }
  
  navbarContainer.innerHTML = `
    <nav class="bg-white border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-14 sm:h-16">
          <div class="flex items-center">
            <div class="flex-shrink-0 flex items-center">
              <h1 class="text-xl sm:text-2xl font-bold text-black">NutriGlyph</h1>
            </div>
          </div>
          <div class="flex items-center">
            <!-- No theme toggle in Light Mode only version -->
          </div>
        </div>
      </div>
    </nav>
  `;
  
  console.log('Navbar set up');
}