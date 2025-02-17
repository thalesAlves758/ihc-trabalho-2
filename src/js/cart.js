import products from '../data/products.json' with { type: "json" };

const cartItemsContainer = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total');
const checkoutButton = document.getElementById('checkout-button');
const userInfoContainer = document.getElementById('user-info');

// Função para remover item do carrinho
function removeFromCart(productId) {
  const shoppingCart = getPropertyFromSessionStorage('shoppingCart', []);
  const updatedCart = shoppingCart.filter(cartItem => cartItem.productId !== productId);
  savePropertyInSessionStorage('shoppingCart', updatedCart);
}

// Função para renderizar as informações do usuário
function renderUserInfo() {
  const account = getPropertyFromSessionStorage('account', {
    name: 'Fulano de Tal',
    email: 'fulano@example.com',
    address: 'Rua Exemplo, 123'
  });

  userInfoContainer.innerHTML = `
    <p class="font-semibold mb-1">Informações do Usuário:</p>
    <p><span class="font-bold">Nome:</span> ${account.name}</p>
    <p><span class="font-bold">Email:</span> ${account.email}</p>
    <p><span class="font-bold">Endereço:</span> ${account.address}</p>
  `;
}

// Renderiza os itens do carrinho
function renderCart() {
  const shoppingCart = getPropertyFromSessionStorage('shoppingCart', []);

  // Se o carrinho estiver vazio, exibe mensagem e oculta o resumo
  if (shoppingCart.length === 0) {
    cartItemsContainer.innerHTML = `<p>Seu carrinho está vazio.</p>`;
    document.getElementById('cart-summary').style.display = 'none';
    return;
  } else {
    document.getElementById('cart-summary').style.display = 'block';
  }

  let total = 0;
  cartItemsContainer.innerHTML = '';

  shoppingCart.forEach(cartItem => {
    const product = products.find(p => p.id === cartItem.productId);
    if (!product) return;

    // Cálculo de preço (convertendo de centavos para reais)
    const priceValue = parseInt(product.price / 100);
    const priceCents = product.price - priceValue * 100;
    const priceFormatted = `R$ ${priceValue},${priceCents.toString().padStart(2, '0')}`;

    const itemTotalCents = product.price * cartItem.amount;
    total += itemTotalCents;
    const itemTotalValue = parseInt(itemTotalCents / 100);
    const itemTotalCentsRemainder = itemTotalCents - itemTotalValue * 100;
    const itemTotalFormatted = `R$ ${itemTotalValue},${itemTotalCentsRemainder.toString().padStart(2, '0')}`;

    // Cria o elemento do item do carrinho
    const cartItemElement = document.createElement('div');
    cartItemElement.className = "flex w-full border border-gray-200 rounded-sm p-3";

    // Imagem do produto
    const imgContainer = document.createElement('div');
    imgContainer.className = "w-1/4 flex justify-center items-center hover:cursor-pointer";
    const img = document.createElement('img');
    img.className = "w-32 h-32 object-scale-down";
    img.src = `./src/images/${product.pictures[0]}`;
    img.alt = product.name;
    img.onclick = () => {
      window.location.href = `${window.location.origin}/productDetails.html?productId=${product.id}`;
    };
    imgContainer.appendChild(img);

    // Informações do produto
    const detailsContainer = document.createElement('div');
    detailsContainer.className = "flex flex-col w-3/4 pl-3";

    // Nome do produto (ao clicar, redireciona para os detalhes)
    const nameElement = document.createElement('p');
    nameElement.className = "font-bold text-lg hover:cursor-pointer hover:underline";
    nameElement.textContent = product.name;
    nameElement.onclick = () => {
      window.location.href = `${window.location.origin}/productDetails.html?productId=${product.id}`;
    };

    // Preço unitário
    const priceElement = document.createElement('p');
    priceElement.className = "text-md";
    priceElement.textContent = `Preço: ${priceFormatted}`;

    // Quantidade selecionada
    const quantityElement = document.createElement('p');
    quantityElement.className = "text-md";
    quantityElement.textContent = `Quantidade: ${cartItem.amount}`;

    // Subtotal do item
    const itemTotalElement = document.createElement('p');
    itemTotalElement.className = "text-md font-semibold";
    itemTotalElement.textContent = `Subtotal: ${itemTotalFormatted}`;

    // Botão para remover o item
    const removeButton = document.createElement('button');
    removeButton.className = "text-sm text-red-500 mt-2 hover:underline hover:cursor-pointer";
    removeButton.textContent = "Remover";
    removeButton.onclick = () => {
      removeFromCart(product.id);
      renderCart(); // Atualiza a renderização do carrinho
      updateCartCounter(); // Atualiza o contador do carrinho no header
    };

    detailsContainer.append(nameElement, priceElement, quantityElement, itemTotalElement, removeButton);
    cartItemElement.append(imgContainer, detailsContainer);
    cartItemsContainer.appendChild(cartItemElement);
  });

  // Atualiza o total do carrinho
  const totalValue = parseInt(total / 100);
  const totalCents = total - totalValue * 100;
  cartTotalElement.textContent = `R$ ${totalValue},${totalCents.toString().padStart(2, '0')}`;
}

// Evento para o botão de finalização (checkout)
checkoutButton.addEventListener('click', () => {
  alert("Funcionalidade de finalização de compra ainda não implementada.");
});

// Renderiza as informações do usuário e o carrinho ao carregar a página
renderUserInfo();
renderCart();
