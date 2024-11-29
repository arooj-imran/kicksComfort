document.getElementById('searchBtn').addEventListener('click', function () {
    const query = document.getElementById('searchInput').value.trim();
    if (query) {
      alert(`Searching for: ${query}`);
      // You can replace the alert with actual search logic, like redirecting to a search results page.
      // window.location.href = `search.html?query=${query}`;
    } else {
      alert("Please enter a search term!");
    }
  });
  // Cart data
const cart = [];

// Selectors
const cartItemsContainer = document.getElementById("cart-items");
const grandTotal = document.getElementById("grand-total");

// Add to Cart buttons
document.querySelectorAll(".add-to-cart").forEach((button) => {
  button.addEventListener("click", (event) => {
    const productElement = event.target.closest(".product");
    const productId = parseInt(productElement.getAttribute("data-id"));
    const productName = productElement.getAttribute("data-name");
    const productPrice = parseFloat(productElement.getAttribute("data-price"));

    addToCart(productId, productName, productPrice);
  });
});

// Function to add a product to the cart
function addToCart(id, name, price) {
  const existingProduct = cart.find((item) => item.id === id);

  if (existingProduct) {
    // If product already exists in cart, increase quantity
    existingProduct.quantity += 1;
  } else {
    // If product does not exist, add it to the cart
    cart.push({ id, name, price, quantity: 1 });
  }

  updateCart();
}

// Function to update the cart display
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

  // Add event listeners for quantity updates and item removal
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
  if (item && newQuantity > 0) {
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

// Initialize empty cart display
updateCart();
