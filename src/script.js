import products from './data/products.json' with { type: "json" };

const searchQuery = new URLSearchParams(window.location.search);

const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const productsElement = document.getElementById('products');
const cartCounterElement = document.getElementById('shopping-cart-counter');

if (searchQuery.get('q')) {
  searchInput.value = searchQuery.get('q');
}

initializeListeners();
renderProducts(products);
updateCartCounter();

function initializeListeners() {
  window.addToCart = productId => {
    const shoppingCart = getPropertyFromSessionStorage('shoppingCart', []);

    const productInCartIndex = shoppingCart.findIndex(cartItem => cartItem.productId === productId);

    if (productInCartIndex > -1) {
      shoppingCart[productInCartIndex].amount++;
    } else {
      shoppingCart.push({
        productId,
        amount: 1
      });
    }

    savePropertyInSessionStorage('shoppingCart', shoppingCart);
    renderProducts(products);
    updateCartCounter();
  }

  window.removeFromCart = productId => {
    const shoppingCart = getPropertyFromSessionStorage('shoppingCart', []);

    const updatedCart = shoppingCart.filter(cartItem => cartItem.productId !== productId);

    savePropertyInSessionStorage('shoppingCart', updatedCart);
    renderProducts(products);
    updateCartCounter();
  }

  searchButton.addEventListener('click', () => {
    const search = searchInput.value;

    if (search) {
      window.location.search = 'q=' + search;
    } else {
      window.location.href = window.location.origin + window.location.pathname;
    }
  });
}

function renderProducts(products) {
  const shoppingCart = getPropertyFromSessionStorage('shoppingCart', []);

  const shoppingCartMap = shoppingCart.reduce((map, cartItem) => {
    map[cartItem.productId] = cartItem;
    return map;
  }, {});

  productsElement.innerHTML = products
    ?.filter(product => {
      if (!window.location.search || !searchQuery.size || !searchQuery.get('q')) return true;

      return product.name.toLowerCase().includes(searchQuery.get('q').toLowerCase());
    })
    .map(product => {
      const value = parseInt(product.price / 100);
      const cents = product.price - value * 100;

      return `
      <div class="flex w-full" id="product-${product.id}">
        <div class="flex w-full lg:flex-col lg:items-center border border-gray-200 rounded-sm">
          <div class="flex justify-center items-center w-4/10 lg:w-2/3">
            <img class="object-scale-down size-26 lg:size-38 xl:size-50" src="./images/${product.pictures?.[0]}" alt="${product.name}">
          </div>

          <div class="flex flex-col grow w-6/10 items-start py-3 px-2 justify-center border-l border-l-gray-100 lg:w-full lg:border-l-0 lg:border-t lg:border-t-gray-100">
            <p class="font-bold flex items-start w-full overflow-hidden text-ellipsis h-[50px]">
              ${product.name}
            </p>

            <div class="text-md flex items-center">
              <svg class="mr-1" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="18px" fill="#EAC452">
               <path d="M236.5-125 301-402 86-588l283.5-24.5 110.5-261 110.5 261L874-588 659-402l64.5 277L480-272 236.5-125Z"/>
              </svg>
              <div>
                ${String(product.rating).replace('.', ',')} <span class="text-xs align-top text-gray-500">(${product.sold_quantity})</span>
              </div>
            </div>

            <p class="text-2xl flex items-center my-2">
              <span class="text-sm align-text-top">R$</span>${value}<span class="text-sm align-text-top">${cents}</span>
            </p>

            <div class="w-full flex">
              <button class="text-sm rounded-2xl self-center py-1 w-full mx-2 bg-orange-300 hover:cursor-pointer" onclick="addToCart(${product.id})">Adicionar ao carrinho</button>
            </div>

            <p class="text-xs text-gray-500 font-bold mt-2 ${!shoppingCartMap[product.id] ? 'hidden' : ''}">
              ${shoppingCartMap[product.id]?.amount > 9 ? '9+' : shoppingCartMap[product.id]?.amount} no carrinho - <button class="underline hover:cursor-pointer" onclick="removeFromCart(${product.id})">excluir</button>
            </p>
          </div>
        </div>
      </div>
    `;
    }).join('');
}

function updateCartCounter() {
  const shoppingCart = getPropertyFromSessionStorage('shoppingCart', []);

  if (shoppingCart.length) {
    cartCounterElement.innerText = shoppingCart.length > 9 ? '9+' : shoppingCart.length;
  } else {
    cartCounterElement.innerText = '';
  }
}

function getPropertyFromSessionStorage(key, defaultValue) {
  return sessionStorage.getItem(key) ? JSON.parse(sessionStorage.getItem(key)) : defaultValue;
}

function savePropertyInSessionStorage(key, value) {
  sessionStorage.setItem(key, JSON.stringify(value));
}
