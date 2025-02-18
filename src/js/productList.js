import products from '../data/products.json' with { type: "json" };

const productsElement = document.getElementById('products');

initializeListeners();
renderProducts(products);

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

  window.navigateToProduct = productId => {
    window.location.href = `./productDetails.html?productId=${productId}`;
  }
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
            <div class="flex justify-center items-center w-4/10 lg:w-2/3 hover:cursor-pointer" onclick="navigateToProduct(${product.id})">
              <img class="object-scale-down size-26 lg:size-38 xl:size-50" src="./src/images/${product.pictures?.[0]}" alt="${product.name}">
            </div>

            <div class="flex flex-col grow w-6/10 items-start py-3 px-2 justify-center border-l border-l-gray-100 lg:w-full lg:border-l-0 lg:border-t lg:border-t-gray-100">
              <p class="font-bold flex items-start w-full overflow-hidden text-ellipsis h-[50px] hover:cursor-pointer hover:underline" onclick="navigateToProduct(${product.id})">
                ${product.name}
              </p>

              <div class="text-md flex items-center">
                <div>
                  ${product.rating.toFixed(1).replace('.', ',')}
                </div>
                <div class="flex mx-1">
                  ${getStarsElementsByRating(product.rating)}
                </div>
                <div>
                  <span class="text-xs align-top text-gray-500">(${product.reviews_count})</span>
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
