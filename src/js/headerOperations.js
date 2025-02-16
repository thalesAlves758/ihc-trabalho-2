
const cartCounterElement = document.getElementById('shopping-cart-counter');
const searchQuery = new URLSearchParams(window.location.search);
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

if (searchQuery.get('q')) {
  searchInput.value = searchQuery.get('q');
}

initializeHeaderListeners();
updateCartCounter();

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
