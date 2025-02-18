import products from '../data/products.json' with { type: "json" };

const searchQuery = new URLSearchParams(window.location.search);

if (!searchQuery.get('productId')) {
  window.location.href = '/index.html';
}

const product = products.find(productItem => productItem.id == searchQuery.get('productId'));

if (!product) {
  window.location.href = '/index.html';
}

const imagesContainerElement = document.getElementById('product-images-container');
const indicatorsContainerElement = document.getElementById('indicators');
const soldQuantityElement = document.getElementById('sold-quantity');
const ratingElement = document.getElementById('rating');
const reviewsCountElement = document.getElementById('reviews-count');
const starsElement = document.getElementById('stars-container');
const productNameElement = document.getElementById('product-name');
const productImagesContainerElement = document.getElementById('product-images-container');
const buyProductButton = document.getElementById('button-buy-product');
const priceElement = document.getElementById('price');
const amountSelect = document.getElementById('amount-select');
const lgProductImageElement = document.getElementById('lg-image-container');
const lgGalleryElement = document.getElementById('lg-gallery');
const featuresElement = document.getElementById('features');
const descriptionElement = document.getElementById('description');

renderProductDetails(product);
initializeProductDetailsListeners();

function initializeProductDetailsListeners() {
  imagesContainerElement.addEventListener('scroll', () => {
    const indicatorsElements = document.querySelectorAll('#indicators .indicator');
    const scrollPosition = imagesContainerElement.scrollLeft;
    const imageWidth = imagesContainerElement.clientWidth;
    const activeIndex = Math.round(scrollPosition / imageWidth);

    indicatorsElements.forEach((indicator, index) => {
      if (index === activeIndex) {
        indicator.classList.add('bg-orange-300');
      } else {
        indicator.classList.remove('bg-orange-300');
      }
    });
  });

  buyProductButton.addEventListener('click', () => {
    alert('Funcionalidade ainda não implementada');
  });

  const addToCartButton = document.getElementById('button-add-to-cart');
  if (addToCartButton) {
    addToCartButton.addEventListener('click', () => {
      const selectedAmount = parseInt(amountSelect.value) || 1;

      if (typeof window.addToCart === 'function') {
        for (let i = 0; i < selectedAmount; i++) {
          window.addToCart(product.id);
        }
      } else {
        let shoppingCart = getPropertyFromSessionStorage('shoppingCart', []);
        const productInCartIndex = shoppingCart.findIndex(item => item.productId === product.id);
        if (productInCartIndex > -1) {
          shoppingCart[productInCartIndex].amount += selectedAmount;
        } else {
          shoppingCart.push({
            productId: product.id,
            amount: selectedAmount
          });
        }
        savePropertyInSessionStorage('shoppingCart', shoppingCart);
        updateCartCounter();
      }
    });
  }

  window.changePicture = element => {
    const listItemsElements = element.parentNode.querySelectorAll('li');
    const imgElement = element.querySelector('img');

    listItemsElements.forEach(liElement => {
      if (liElement.id === element.id) {
        liElement.classList.add('border-orange-300');
        liElement.classList.add('border-3');
        liElement.classList.remove('border-gray-300');
        return;
      }

      liElement.classList.remove('border-orange-300');
      liElement.classList.remove('border-3');
      liElement.classList.add('border-gray-300');
    });

    lgProductImageElement.innerHTML = `
      <img class="rounded-sm object-scale-down object-center size-50 xl:size-60" src="${imgElement.src}" alt="${imgElement.alt}">
    `;
  }

  let isDragging = false;
  let startX, scrollLeft;

  lgGalleryElement.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.pageX - lgGalleryElement.offsetLeft;
    scrollLeft = lgGalleryElement.scrollLeft;

    lgGalleryElement.querySelectorAll('li').forEach(li => {
      li.classList.add('cursor-grabbing');
      li.classList.remove('hover:cursor-pointer');
    });
  });

  lgGalleryElement.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - lgGalleryElement.offsetLeft;
    const walk = (x - startX) * 2;
    lgGalleryElement.scrollLeft = scrollLeft - walk;
  });

  lgGalleryElement.addEventListener('mouseup', () => {
    isDragging = false;
    lgGalleryElement.querySelectorAll('li').forEach(li => {
      li.classList.remove('cursor-grabbing');
      li.classList.add('hover:cursor-pointer');
    });
  });

  lgGalleryElement.addEventListener('mouseleave', () => {
    isDragging = false;
    lgGalleryElement.classList.remove('cursor-grabbing');
  });
}

function renderProductDetails(product) {
  const value = parseInt(product.price / 100);
  const cents = product.price - value * 100;

  soldQuantityElement.textContent = `${product.sold_quantity} vendido${product.sold_quantity > 1 ? 's' : ''}`;
  ratingElement.textContent = product.rating.toFixed(1).replace('.', ',');
  reviewsCountElement.textContent = `(${product.reviews_count})`;
  starsElement.innerHTML = getStarsElementsByRating(product.rating);
  productNameElement.innerText = product.name;

  indicatorsContainerElement.innerHTML = product.pictures
    ?.map((_, index) => (
      `<span class="indicator w-2 h-2 bg-gray-300 rounded-full cursor-pointer ${index === 0 ? 'bg-orange-300' : ''}"></span>`
    ))
    .join('');

  productImagesContainerElement.innerHTML = product.pictures
    ?.map((picture) => (
      `<div class="p-4 w-full snap-start hover:cursor-grab min-w-full flex justify-center">
         <img class="object-scale-down size-50 max-w-none" src="./src/images/${picture}" alt="${product.name}">
       </div>`
    ))
    .join('');

  priceElement.innerHTML = `R$ ${value}<span class="text-sm align-text-top">${cents}</span>`;

  amountSelect.innerHTML = [...Array(product.available_quantity)]
    .map((_, index) => (
      `<option value="${index + 1}">Quantidade: ${index + 1}</option>`
    ))
    .join('');

  lgProductImageElement.innerHTML = `
      <img class="rounded-sm object-scale-down size-50 xl:size-60" src="./src/images/${product.pictures?.[0]}" alt="${product.name}">
    `;

  lgGalleryElement.innerHTML = product.pictures
    ?.map((picture, index) => (
      `<li id="product-picture-${index + 1}" class="border ${index === 0 ? 'border-orange-300 border-3' : 'border-gray-300'} rounded-sm hover:cursor-pointer" onmouseenter="changePicture(this)">
        <img class="rounded-sm object-scale-down max-w-none size-15 xl:size-22" draggable="false" src="./src/images/${picture}" alt="${product.name}">
      </li>`
    ))
    .join('');

  featuresElement.innerHTML = product.features
    ? product.features.map(feature => (
      `<li>${feature}</li>`
    ))
      .join('')
    : '';

  descriptionElement.innerText = product.description ?? '';

  if (product.pictures?.length > 5) {
    lgGalleryElement.classList.add('scrollbar-custom');
    lgGalleryElement.classList.add('justify-start');
    lgGalleryElement.classList.remove('scrollbar-hide');
    lgGalleryElement.classList.remove('justify-center');
  }
}
