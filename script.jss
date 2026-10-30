/* ==========================================
   PRODUCTS DATASET
   ========================================== */
const products = [
    {
        id: 1,
        name: "Royal Kaju Katli Box",
        category: "Traditional Mithai",
        dietary: "100% Pure Ghee",
        price: 699,
        originalPrice: 899,
        rating: 4.9,
        reviews: 142,
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80",
        weights: ["500g", "1kg", "2kg"]
    },
    {
        id: 2,
        name: "Artisan Motichoor Ladoo in Desi Ghee",
        category: "Traditional Mithai",
        dietary: "Pure Desi Ghee",
        price: 499,
        originalPrice: 599,
        rating: 4.8,
        reviews: 98,
        image: "https://images.unsplash.com/photo-1599785209707-a456fc1337bb?auto=format&fit=crop&w=600&q=80",
        weights: ["500g", "1kg"]
    },
    {
        id: 3,
        name: "Fusion Rasmalai Tres Leches Cake",
        category: "Modern Fusion Desserts",
        dietary: "Eggless Available",
        price: 1199,
        originalPrice: 1499,
        rating: 4.9,
        reviews: 76,
        image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=600&q=80",
        weights: ["500g", "1kg"]
    },
    {
        id: 4,
        name: "Luxury Gold-Foil Chocolate Truffles",
        category: "Gourmet Chocolates",
        dietary: "Artisanal Cocoa",
        price: 999,
        originalPrice: 1299,
        rating: 5.0,
        reviews: 115,
        image: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=600&q=80",
        weights: ["Box of 12", "Box of 24"]
    },
    {
        id: 5,
        name: "Celebration Dry Fruit & Mithai Hamper",
        category: "Festive Hampers",
        dietary: "Best Seller",
        price: 1899,
        originalPrice: 2399,
        rating: 4.9,
        reviews: 210,
        image: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=600&q=80",
        weights: ["Standard Hamper", "Luxury Hamper"]
    },
    {
        id: 6,
        name: "Saffron Pista Badam Halwa Box",
        category: "Traditional Mithai",
        dietary: "Pure Desi Ghee",
        price: 599,
        originalPrice: 749,
        rating: 4.7,
        reviews: 64,
        image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=600&q=80",
        weights: ["500g", "1kg"]
    },
    {
        id: 7,
        name: "Baked Gulab Jamun Tart Set",
        category: "Modern Fusion Desserts",
        dietary: "Eggless",
        price: 799,
        originalPrice: 999,
        rating: 4.8,
        reviews: 89,
        image: "https://images.unsplash.com/photo-1549488344-cbb6c34cf08b?auto=format&fit=crop&w=600&q=80",
        weights: ["Pack of 6", "Pack of 12"]
    },
    {
        id: 8,
        name: "Signature Festive Assorted Box",
        category: "Festive Hampers",
        dietary: "Chef's Special",
        price: 1499,
        originalPrice: 1899,
        rating: 5.0,
        reviews: 183,
        image: "https://images.unsplash.com/photo-1582293041040-5bb929452097?auto=format&fit=crop&w=600&q=80",
        weights: ["1kg Box", "2kg Box"]
    }
];

/* ==========================================
   STATE MANAGEMENT (LocalStorage)
   ========================================== */
let cart = JSON.parse(localStorage.getItem('sweet_cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('sweet_wishlist')) || [];

/* ==========================================
   DOM ELEMENTS
   ========================================== */
const hamburger = document.getElementById('hamburger');
const navbar = document.getElementById('navbar');
const productGrid = document.getElementById('productGrid');
const filterBtns = document.querySelectorAll('.filter-btn');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const cartToggle = document.getElementById('cartToggle');
const closeCart = document.getElementById('closeCart');
const cartDrawer = document.getElementById('cartDrawer');
const cartOverlay = document.getElementById('cartOverlay');
const cartItemsContainer = document.getElementById('cartItemsContainer');
const cartCount = document.getElementById('cartCount');
const wishlistCount = document.getElementById('wishlistCount');
const drawerItemCount = document.getElementById('drawerItemCount');
const cartSubtotal = document.getElementById('cartSubtotal');
const cartShipping = document.getElementById('cartShipping');
const cartGrandTotal = document.getElementById('cartGrandTotal');
const checkoutBtn = document.getElementById('checkoutBtn');
const newsletterForm = document.getElementById('newsletterForm');
const newsletterEmail = document.getElementById('newsletterEmail');
const newsletterMessage = document.getElementById('newsletterMessage');
const backToTop = document.getElementById('backToTop');
const toast = document.getElementById('toast');

/* ==========================================
   INITIALIZATION
   ========================================== */
document.addEventListener('DOMContentLoaded', () => {
    renderProducts(products);
    updateCartUI();
    updateWishlistUI();
    initCountdown();
});

/* ==========================================
   MOBILE NAVIGATION TOGGLE
   ========================================== */
hamburger.addEventListener('click', () => {
    navbar.classList.toggle('active');
});

// Close menu on click outside or link click
document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', () => {
        navbar.classList.remove('active');
    });
});

/* ==========================================
   RENDER PRODUCTS
   ========================================== */
function renderProducts(itemsToRender) {
    if (itemsToRender.length === 0) {
        productGrid.innerHTML = `<p class="empty-cart-msg" style="grid-column: 1/-1;">No gourmet treats found matching your search.</p>`;
        return;
    }

    productGrid.innerHTML = itemsToRender.map(product => {
        const isWishlisted = wishlist.includes(product.id);
        const weightOptions = product.weights.map((w, idx) => `<option value="${w}" ${idx === 0 ? 'selected' : ''}>${w}</option>`).join('');

        return `
            <div class="product-card" data-category="${product.category}">
                <div class="product-img-wrapper">
                    <span class="dietary-badge">${product.dietary}</span>
                    <button class="wishlist-btn ${isWishlisted ? 'active' : ''}" onclick="toggleWishlist(${product.id})">
                        <i class="${isWishlisted ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
                    </button>
                    <img src="${product.image}" alt="${product.name}" loading="lazy">
                </div>
                <div class="product-info">
                    <div class="product-rating">
                        <i class="fa-solid fa-star"></i>
                        <span>${product.rating} (${product.reviews})</span>
                    </div>
                    <h3>${product.name}</h3>
                    <div class="weight-selector">
                        <select id="weight-${product.id}">
                            ${weightOptions}
                        </select>
                    </div>
                    <div class="product-footer">
                        <div class="price-box">
                            <span class="current-price">₹${product.price}</span>
                            <span class="original-price">₹${product.originalPrice}</span>
                        </div>
                        <button class="add-to-cart-btn" onclick="addToCart(${product.id})" title="Add to Bag">
                            <i class="fa-solid fa-plus"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

/* ==========================================
   CATEGORY FILTERING & SEARCH
   ========================================== */
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter');

        if (filter === 'all') {
            renderProducts(products);
        } else {
            const filtered = products.filter(p => p.category === filter);
            renderProducts(filtered);
        }
    });
});

// Category card clicks from section 4
document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', () => {
        const category = card.getAttribute('data-category');
        // Scroll to products
        document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
        // Update filter tabs
        filterBtns.forEach(btn => {
            if (btn.getAttribute('data-filter') === category) {
                btn.click();
            }
        });
    });
});

// Search functionality
function handleSearch() {
    const query = searchInput.value.toLowerCase().trim();
    if (!query) {
        renderProducts(products);
        return;
    }
    const filtered = products.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.category.toLowerCase().includes(query) || 
        p.dietary.toLowerCase().includes(query)
    );
    renderProducts(filtered);
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
}

searchBtn.addEventListener('click', handleSearch);
searchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') handleSearch();
});

/* ==========================================
   SHOPPING CART FUNCTIONALITY
   ========================================== */
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const weightSelect = document.getElementById(`weight-${productId}`);
    const selectedWeight = weightSelect ? weightSelect.value : product.weights[0];

    const cartItemId = `${productId}-${selectedWeight}`;
    const existingIndex = cart.findIndex(item => item.cartItemId === cartItemId);

    if (existingIndex > -1) {
        cart[existingIndex].quantity += 1;
    } else {
        cart.push({
            cartItemId: cartItemId,
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            weight: selectedWeight,
            quantity: 1
        });
    }

    saveCart();
    updateCartUI();
    showToast(`Added ${product.name} (${selectedWeight}) to bag!`);
}

function updateCartUI() {
    localStorage.setItem('sweet_cart', JSON.stringify(cart));
    
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    drawerItemCount.textContent = totalItems;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `<p class="empty-cart-msg">Your festive shopping bag is empty.</p>`;
        cartSubtotal.textContent = `₹0`;
        cartGrandTotal.textContent = `₹0`;
        cartShipping.textContent = `₹0`;
        return;
    }

    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <p>Pack: ${item.weight}</p>
                <span class="cart-item-price">₹${item.price} x ${item.quantity}</span>
                <div class="cart-quantity-controls">
                    <button onclick="changeQuantity('${item.cartItemId}', -1)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="changeQuantity('${item.cartItemId}', 1)">+</button>
                </div>
            </div>
            <button class="remove-item-btn" onclick="removeFromCart('${item.cartItemId}')" title="Remove">
                <i class="fa-solid fa-trash-can"></i>
            </button>
        </div>
    `).join('');

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 1500 ? 0 : 99;
    const grandTotal = subtotal + (subtotal > 0 ? shipping : 0);

    cartSubtotal.textContent = `₹${subtotal}`;
    cartShipping.textContent = shipping === 0 ? 'FREE' : `₹${shipping}`;
    cartGrandTotal.textContent = `₹${grandTotal}`;
}

function changeQuantity(cartItemId, delta) {
    const item = cart.find(i => i.cartItemId === cartItemId);
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
            removeFromCart(cartItemId);
        } else {
            updateCartUI();
        }
    }
}

function removeFromCart(cartItemId) {
    cart = cart.filter(i => i.cartItemId !== cartItemId);
    updateCartUI();
    showToast("Item removed from bag.");
}

// Cart Drawer open/close
cartToggle.addEventListener('click', () => {
    cartDrawer.classList.add('open');
    cartOverlay.classList.add('active');
});

closeCart.addEventListener('click', () => {
    cartDrawer.classList.remove('open');
    cartOverlay.classList.remove('active');
});

cartOverlay.addEventListener('click', () => {
    cartDrawer.classList.remove('open');
    cartOverlay.classList.remove('active');
});

checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        alert("Your cart is empty! Add some sweets before checking out.");
        return;
    }
    alert("🎉 Thank you for placing your pre-order with SWEET! Our festive concierge will contact you shortly to confirm delivery details.");
    cart = [];
    updateCartUI();
    cartDrawer.classList.remove('open');
    cartOverlay.classList.remove('active');
});

/* ==========================================
   WISHLIST FUNCTIONALITY
   ========================================== */
function toggleWishlist(productId) {
    const index = wishlist.indexOf(productId);
    if (index > -1) {
        wishlist.splice(index, 1);
        showToast("Removed from wishlist.");
    } else {
        wishlist.push(productId);
        showToast("Added to wishlist!");
    }
    localStorage.setItem('sweet_wishlist', JSON.stringify(wishlist));
    updateWishlistUI();
    renderProducts(products);
}

function updateWishlistUI() {
    wishlistCount.textContent = wishlist.length;
}

/* ==========================================
   DIWALI COUNTDOWN TIMER (Target: Nov 8, 2026)
   ========================================== */
function initCountdown() {
    const targetDate = new Date("November 8, 2026 23:59:59").getTime();

    const timerInterval = setInterval(() => {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            clearInterval(timerInterval);
            document.getElementById("countdownTimer").innerHTML = "<span style='color:var(--burgundy); font-weight:700;'>Diwali Pre-Order Sale Ended!</span>";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("days").textContent = String(days).padStart(2, '0');
        document.getElementById("hours").textContent = String(hours).padStart(2, '0');
        document.getElementById("minutes").textContent = String(minutes).padStart(2, '0');
        document.getElementById("seconds").textContent = String(seconds).padStart(2, '0');
    }, 1000);
}

/* ==========================================
   NEWSLETTER VALIDATION
   ========================================== */
newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = newsletterEmail.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        newsletterMessage.textContent = "Please enter a valid email address.";
        newsletterMessage.className = "newsletter-message error";
        return;
    }

    newsletterMessage.textContent = "🎉 Success! Your ₹200 voucher code has been sent to your email.";
    newsletterMessage.className = "newsletter-message success";
    newsletterEmail.value = "";
});

/* ==========================================
   TOAST NOTIFICATION HELPER
   ========================================== */
function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

/* ==========================================
   BACK TO TOP BUTTON & SCROLL
   ========================================== */
window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});