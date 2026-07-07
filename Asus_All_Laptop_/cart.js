// ====== ASUS Shop – Cart & Buy Now functionality ======
// Cart is persisted in localStorage so it survives page reloads.

const CART_KEY = 'asus_shop_cart';

function getCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Could not read cart from storage', e);
    return [];
  }
}

function saveCart(cart) {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  } catch (e) {
    console.error('Could not save cart to storage', e);
  }
}

function formatPrice(num) {
  return '₹' + Number(num).toLocaleString('en-IN');
}

function findProductCard(productId) {
  return document.querySelector(`.card[data-product-id="${productId}"]`);
}

function addToCart(productId, qty = 1) {
  const card = findProductCard(productId);
  if (!card) return;

  const name = card.getAttribute('data-product-name');
  const price = parseFloat(card.getAttribute('data-product-price')) || 0;
  const img = card.getAttribute('data-product-img');

  const cart = getCart();
  const existing = cart.find(item => item.id === productId);

  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ id: productId, name, price, img, qty });
  }

  saveCart(cart);
  renderCart();
  showToast(`${name} added to cart!`);
}

function removeFromCart(productId) {
  let cart = getCart();
  cart = cart.filter(item => item.id !== productId);
  saveCart(cart);
  renderCart();
}

function changeQty(productId, delta) {
  const cart = getCart();
  const item = cart.find(i => i.id === productId);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    removeFromCart(productId);
    return;
  }
  saveCart(cart);
  renderCart();
}

function clearCart() {
  saveCart([]);
  renderCart();
}

function cartTotal(cart) {
  return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

function cartCount(cart) {
  return cart.reduce((sum, item) => sum + item.qty, 0);
}

function renderCart() {
  const cart = getCart();
  const container = document.getElementById('cartItemsContainer');
  const emptyMsg = document.getElementById('cartEmptyMsg');
  const totalEl = document.getElementById('cartTotalPrice');
  const badge = document.getElementById('cartCountBadge');

  if (!container) return;

  container.innerHTML = '';

  if (cart.length === 0) {
    emptyMsg.style.display = 'block';
  } else {
    emptyMsg.style.display = 'none';
    cart.forEach(item => {
      const row = document.createElement('div');
      row.className = 'd-flex align-items-center gap-2 border-bottom py-2 cart-row';
      row.innerHTML = `
        <img src="${item.img}" alt="${item.name}" style="width:56px;height:56px;object-fit:contain;">
        <div class="flex-grow-1">
          <div class="fw-semibold" style="font-size:0.9rem;">${item.name}</div>
          <div class="text-muted" style="font-size:0.85rem;">${formatPrice(item.price)} x ${item.qty}</div>
          <div class="d-flex align-items-center gap-2 mt-1">
            <button class="btn btn-sm btn-outline-secondary qty-btn" data-action="dec" data-id="${item.id}">−</button>
            <span>${item.qty}</span>
            <button class="btn btn-sm btn-outline-secondary qty-btn" data-action="inc" data-id="${item.id}">+</button>
            <button class="btn btn-sm btn-link text-danger remove-btn" data-id="${item.id}">Remove</button>
          </div>
        </div>
        <div class="fw-bold" style="font-size:0.9rem;">${formatPrice(item.price * item.qty)}</div>
      `;
      container.appendChild(row);
    });
  }

  totalEl.textContent = formatPrice(cartTotal(cart));
  badge.textContent = cartCount(cart);
}

function showToast(message) {
  const toastEl = document.getElementById('cartToast');
  const toastBody = document.getElementById('cartToastBody');
  if (!toastEl || !toastBody) return;
  toastBody.textContent = message;
  const toast = new bootstrap.Toast(toastEl, { delay: 2000 });
  toast.show();
}

function openCartPanel() {
  const el = document.getElementById('cartOffcanvas');
  if (!el) return;
  const oc = bootstrap.Offcanvas.getOrCreateInstance(el);
  oc.show();
}

document.addEventListener('DOMContentLoaded', () => {
  renderCart();

  // Add to Cart buttons
  document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      addToCart(btn.getAttribute('data-product-id'));
    });
  });

  // Buy Now buttons -> add to cart then open the cart panel for checkout
  document.querySelectorAll('.buy-now-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      addToCart(btn.getAttribute('data-product-id'));
      openCartPanel();
    });
  });

  // Quantity +/- and remove buttons (event delegation, cart re-renders often)
  document.getElementById('cartItemsContainer').addEventListener('click', (e) => {
    const qtyBtn = e.target.closest('.qty-btn');
    const removeBtn = e.target.closest('.remove-btn');
    if (qtyBtn) {
      const id = qtyBtn.getAttribute('data-id');
      const action = qtyBtn.getAttribute('data-action');
      changeQty(id, action === 'inc' ? 1 : -1);
    } else if (removeBtn) {
      removeFromCart(removeBtn.getAttribute('data-id'));
    }
  });

  document.getElementById('clearCartBtn').addEventListener('click', clearCart);

  document.getElementById('checkoutBtn').addEventListener('click', () => {
    const cart = getCart();
    if (cart.length === 0) {
      showToast('Your cart is empty.');
      return;
    }
    alert(`Order placed!\nItems: ${cartCount(cart)}\nTotal: ${formatPrice(cartTotal(cart))}\n\n(This is a demo checkout — connect a real payment gateway to go live.)`);
    clearCart();
    const el = document.getElementById('cartOffcanvas');
    bootstrap.Offcanvas.getOrCreateInstance(el).hide();
  });
});