// Sample cart data
const cart = [
    { id: 1, name: "sizes-2", price: 25.99, quantity: 1 },
    { id: 2, name: "sizes-2", price: 15.49, quantity: 2 },
  ];
  
  // Selectors
  const cartItemsContainer = document.getElementById("cart-items");
  const grandTotal = document.getElementById("grand-total");
  
  // Function to update the cart table
  function updateCart() {
    cartItemsContainer.innerHTML = "";
    let total = 0;
  
    cart.forEach((item) => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;
  
      cartItemsContainer.innerHTML += `
        <tr>
          <td>${item.name}</td>
          <td>$${item.price.toFixed(2)}</td>
          <td>
            <input type="number" min="1" value="${item.quantity}" data-id="${item.id}" class="quantity-input">
          </td>
          <td>$${itemTotal.toFixed(2)}</td>
          <td>
            <button class="remove-btn" data-id="${item.id}">Remove</button>
          </td>
        </tr>
      `;
    });
  
    grandTotal.textContent = total.toFixed(2);
  
    // Add event listeners
    document.querySelectorAll(".quantity-input").forEach((input) =>
      input.addEventListener("input", updateQuantity)
    );
    document.querySelectorAll(".remove-btn").forEach((btn) =>
      btn.addEventListener("click", removeItem)
    );
  }
  
  // Function to update quantity
  function updateQuantity(event) {
    const id = parseInt(event.target.getAttribute("data-id"));
    const newQuantity = parseInt(event.target.value);
  
    const item = cart.find((product) => product.id === id);
    if (item) {
      item.quantity = newQuantity;
      updateCart();
    }
  }
  
  // Function to remove an item
  function removeItem(event) {
    const id = parseInt(event.target.getAttribute("data-id"));
    const index = cart.findIndex((product) => product.id === id);
  
    if (index !== -1) {
      cart.splice(index, 1);
      updateCart();
    }
  }
  
  // Initialize cart
  updateCart();
  