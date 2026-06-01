let cart = [];
const cartIcon = document.getElementById('cartIcon');
const cartCount = document.getElementById('cartCount');
const cartOverlay = document.getElementById('cartOverlay');
const closeCart = document.getElementById('closeCart');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');
const checkoutForm = document.getElementById('checkoutForm');
const backToCart = document.getElementById('backToCart');
const placeOrder = document.getElementById('placeOrder');
cartIcon.addEventListener('click', () => {
    cartOverlay.classList.add('active');
});

closeCart.addEventListener('click', () => {
    cartOverlay.classList.remove('active');
});

document.querySelectorAll('.buy-button').forEach(button => {
    button.addEventListener('click', function() {
        const productCard = this.closest('.product-card');
        const productId = productCard.dataset.id;
        const productName = productCard.querySelector('h3').textContent;
        const productPrice = parseFloat(productCard.querySelector('.price').textContent.replace('$', ''));
        const productImage = productCard.querySelector('.product-image').src;
        const existingItem = cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: productId,
                name: productName,
                price: productPrice,
                image: productImage,
                quantity: 1
            });
        }
        
        updateCart();
        cartOverlay.classList.add('active');
        
        this.textContent = 'Added!';
        setTimeout(() => {
            this.textContent = 'Add to Cart';
        }, 1000);
    });
});

function updateCart() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<div class="empty-cart">Your cart is empty</div>';
    } else {
        cartItems.innerHTML = '';
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                <div class="cart-item-details">
                    <h4 class="cart-item-name">${item.name}</h4>
                    <p class="cart-item-price">$${(item.price * item.quantity).toFixed(2)} (${item.quantity}x)</p>
                    <button class="remove-item" data-id="${item.id}">Remove</button>
                </div>
            `;
            cartItems.appendChild(cartItem);
        });
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = `Total: $${total.toFixed(2)}`;
    
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', function() {
            const itemId = this.dataset.id;
            cart = cart.filter(item => item.id !== itemId);
            updateCart();
        });
    });
}

checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) return;
    checkoutForm.style.display = 'block';
    cartItems.style.display = 'none';
    cartTotal.style.display = 'none';
    checkoutBtn.style.display = 'none';
});

backToCart.addEventListener('click', () => {
    checkoutForm.style.display = 'none';
    cartItems.style.display = 'block';
    cartTotal.style.display = 'block';
    checkoutBtn.style.display = 'block';
});

placeOrder.addEventListener('click', () => {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    const card = document.getElementById('card').value;
    
    if (!name || !email || !address || !card) {
        alert('Please fill in all fields');
        return;
    }
    
    alert(`Order confirmed! Thank you, ${name}. Your items will be shipped to ${address}. A confirmation has been sent to ${email}.`);
    
    cart = [];
    updateCart();
    
    checkoutForm.style.display = 'none';
    cartItems.style.display = 'block';
    cartTotal.style.display = 'block';
    checkoutBtn.style.display = 'block';
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('address').value = '';
    document.getElementById('card').value = '';
    
    cartOverlay.classList.remove('active');
});
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const menuOverlay = document.querySelector('.menu-overlay');
    
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
        menuOverlay.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });
    
    menuOverlay.addEventListener('click', function() {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
        this.classList.remove('active');
        document.body.classList.remove('menu-open');
    });
    
    const cartOverlay = document.getElementById('cartOverlay');
    cartOverlay.addEventListener('click', function(e) {
        if (e.target === this) {
            this.classList.remove('active');
        }
    });
    
    const cartContent = cartOverlay.querySelector('.cart-header, .cart-items, .cart-total, .checkout-btn, .checkout-form');
    cartContent.addEventListener('click', function(e) {
        e.stopPropagation();
    });
});