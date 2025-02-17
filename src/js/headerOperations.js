const searchQuery = new URLSearchParams(window.location.search);

const cartCounterElement = document.getElementById('shopping-cart-counter');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

if (searchQuery.get('q')) {
  searchInput.value = searchQuery.get('q');
}

initializeHeaderListeners();
updateCartCounter();
setupMobileMenu();

function initializeHeaderListeners() {
  searchButton.addEventListener('click', () => {
    const search = searchInput.value;
    window.location.href = search ? ('index.html?q=' + search) : '/index.html';
  });
}

function updateCartCounter() {
  const shoppingCart = getPropertyFromSessionStorage('shoppingCart', []);
  if (shoppingCart.length) {
    cartCounterElement.innerText = shoppingCart.length > 9 ? '9+' : shoppingCart.length;
  } else {
    cartCounterElement.innerText = '';
  }
}

function setupMobileMenu() {
  const menuButton = document.getElementById('menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  const closeMenuButton = document.getElementById('close-menu');

  menuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });

  closeMenuButton.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
  });
}

