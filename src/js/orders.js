import products from '../data/products.json' with { type: "json" };

const ordersListElement = document.getElementById('orders-list');

let orders = getPropertyFromSessionStorage('orders', []);

if (orders.length === 0) {
  const exampleOrders = [
    {
      id: 1,
      date: "14/10/2023",
      items: [
        { productId: 1, amount: 1 },
        { productId: 3, amount: 2 }
      ],
      total: 310175  
    },
    {
      id: 2,
      date: "11/03/2024",
      items: [
        { productId: 5, amount: 1 },
        { productId: 7, amount: 3 }
      ],
      total: 355234  
    },
    {
      id: 3,
      date: "08/02/2025",
      items: [
        { productId: 2, amount: 1 },
        { productId: 4, amount: 1 },
        { productId: 6, amount: 1 }
      ],
      total: 700204
    }
  ];

  savePropertyInSessionStorage('orders', exampleOrders);
  orders = exampleOrders;
}

if (orders.length === 0) {
  ordersListElement.innerHTML = `<p class="text-center">Você não possui pedidos.</p>`;
} else {
  orders.forEach(order => {
    const orderContainer = document.createElement('div');
    orderContainer.className = "border border-gray-200 rounded p-4";

    const orderHeader = document.createElement('div');
    orderHeader.className = "flex justify-between items-center mb-2";
    orderHeader.innerHTML = `<span class="font-bold">Pedido #${order.id}</span><span>${order.date}</span>`;

    const itemsList = document.createElement('div');
    itemsList.className = "flex flex-col gap-2";

    order.items.forEach(item => {
      const product = products.find(p => p.id === item.productId);
      if (!product) return;

      const itemTotalCents = product.price * item.amount;
      const itemTotalValue = parseInt(itemTotalCents / 100);
      const itemTotalCentsRemainder = itemTotalCents - itemTotalValue * 100;
      const itemTotalFormatted = `R$ ${itemTotalValue},${itemTotalCentsRemainder.toString().padStart(2, '0')}`;

      const itemElement = document.createElement('div');
      itemElement.className = "flex justify-between";
      itemElement.innerHTML = `<span>${product.name} (x${item.amount})</span><span>${itemTotalFormatted}</span>`;

      itemsList.appendChild(itemElement);
    });

    const orderTotal = document.createElement('p');
    orderTotal.className = "text-right font-bold mt-2";
    const totalValue = parseInt(order.total / 100);
    const totalCents = order.total - totalValue * 100;
    orderTotal.textContent = `Total: R$ ${totalValue},${totalCents.toString().padStart(2, '0')}`;

    orderContainer.append(orderHeader, itemsList, orderTotal);
    ordersListElement.appendChild(orderContainer);
  });
}
