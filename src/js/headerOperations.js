const searchQuery = new URLSearchParams(window.location.search);

const cartCounterElement = document.getElementById('shopping-cart-counter');
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

  // Seleciona os elementos do menu de usuário
  const userMenuButton = document.getElementById('user-menu-button');
  const userMenuDropdown = document.getElementById('user-menu-dropdown');

  if (userMenuButton) {
    userMenuButton.addEventListener('click', () => {
      userMenuDropdown.classList.toggle('hidden');
    });

    // Opcional: fecha o dropdown ao clicar fora
    window.addEventListener('click', (e) => {
      if (!userMenuButton.contains(e.target) && !userMenuDropdown.contains(e.target)) {
        userMenuDropdown.classList.add('hidden');
      }
     });
    }
}

function updateCartCounter() {
  const shoppingCart = getPropertyFromSessionStorage('shoppingCart', []);

  if (shoppingCart.length) {
    cartCounterElement.innerText = shoppingCart.length > 9 ? '9+' : shoppingCart.length;
  } else {
    cartCounterElement.innerText = '';
  }
}
