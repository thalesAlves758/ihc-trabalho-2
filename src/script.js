import products from './data/products.json' with { type: "json" };

const productsElement = document.getElementById('products');

renderProcuts(products);

function renderProcuts(products) {
  productsElement.innerHTML = products?.map(product => {
    const value = parseInt(product.price / 100);
    const cents = product.price - value * 100;

    return `
      <div class="flex flex-col w-full" id="product-${product.id}">
        <div class="flex border border-gray-200 rounded-xs py-3 gap-3">
          <div class="flex justify-center items-center w-4/10">
            <img class="object-scale-down" src="" alt="${product.name}">
          </div>

          <div class="flex flex-col grow w-6/10 items-start pr-2 justify-center">
            <p class="font-bold flex items-center text-justify w-full overflow-hidden text-ellipsis h-[50px]">
              ${product.name}
            </p>

            <div class="text-md flex items-center">
              <svg class="mr-1" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="18px" fill="#EAC452"><path d="M236.5-125 301-402 86-588l283.5-24.5 110.5-261 110.5 261L874-588 659-402l64.5 277L480-272 236.5-125Z"/></svg>
              <div>
                ${String(product.rating).replace('.', ',')} <span class="text-xs align-top text-gray-500">(${product.sold_quantity})</span>
              </div>
            </div>

            <p class="text-2xl flex items-center my-2">
              <span class="text-sm align-text-top">R$</span>${value}<span class="text-sm align-text-top">${cents}</span>
            </p>

            <div class="w-full flex">
              <button class="text-sm rounded-2xl self-center py-1 w-full mx-2 bg-orange-300">Adicionar ao carrinho</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');
}
