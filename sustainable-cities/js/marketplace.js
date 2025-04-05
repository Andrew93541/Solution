// Sample product data
const products = [
    {
        id: 1,
        title: "Solar Panel Kit",
        category: "Energy",
        price: 299.99,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        description: "Complete solar panel kit for home use, includes mounting hardware and installation guide.",
        location: "San Francisco, CA",
        badge: "Best Seller"
    },
    {
        id: 2,
        title: "Water-Saving Showerhead",
        category: "Water",
        price: 49.99,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        description: "High-efficiency showerhead that reduces water usage by 40% while maintaining pressure.",
        location: "Portland, OR",
        badge: "Popular"
    },
    {
        id: 3,
        title: "Compost Bin",
        category: "Waste",
        price: 79.99,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        description: "Odor-free compost bin for kitchen waste, perfect for urban gardening.",
        location: "Seattle, WA",
        badge: "New"
    },
    {
        id: 4,
        title: "Organic Seeds Collection",
        category: "Gardening",
        price: 24.99,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        description: "Collection of 10 organic vegetable seeds for your sustainable garden.",
        location: "Austin, TX",
        badge: "Popular"
    },
    {
        id: 5,
        title: "Electric Bike",
        category: "Transportation",
        price: 1299.99,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        description: "Eco-friendly electric bike with 50-mile range and regenerative braking.",
        location: "Denver, CO",
        badge: "Best Seller"
    },
    {
        id: 6,
        title: "Reusable Water Bottle",
        category: "Lifestyle",
        price: 19.99,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1602143407151-711a2e226a51?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        description: "Stainless steel water bottle with double-wall insulation.",
        location: "Chicago, IL",
        badge: "Popular"
    },
    {
        id: 7,
        title: "Solar-Powered Charger",
        category: "Energy",
        price: 59.99,
        rating: 4.4,
        image: "https://images.unsplash.com/photo-1605980776566-0486c3ac7617?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        description: "Portable solar charger for phones and small devices.",
        location: "Miami, FL",
        badge: "New"
    },
    {
        id: 8,
        title: "Bamboo Toothbrush Set",
        category: "Lifestyle",
        price: 12.99,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1583947581924-a37d7e7b1a0e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        description: "Set of 4 biodegradable bamboo toothbrushes with charcoal bristles.",
        location: "Boston, MA",
        badge: "Popular"
    },
    {
        id: 9,
        title: "Smart Thermostat",
        category: "Energy",
        price: 199.99,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1558002038-1055e2e0e8a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        description: "Energy-saving smart thermostat with AI learning capabilities.",
        location: "New York, NY",
        badge: "Best Seller"
    },
    {
        id: 10,
        title: "Reusable Shopping Bags",
        category: "Lifestyle",
        price: 14.99,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        description: "Set of 3 durable, foldable shopping bags made from recycled materials.",
        location: "Los Angeles, CA",
        badge: "Popular"
    },
    {
        id: 11,
        title: "Rainwater Collection System",
        category: "Water",
        price: 149.99,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        description: "Complete rainwater harvesting system for garden irrigation.",
        location: "Portland, OR",
        badge: "New"
    },
    {
        id: 12,
        title: "LED Light Bulbs",
        category: "Energy",
        price: 29.99,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        description: "Pack of 6 energy-efficient LED bulbs with 25,000-hour lifespan.",
        location: "Seattle, WA",
        badge: "Best Seller"
    }
];

// Cart state
let cart = [];
let total = 0;

// DOM Elements
const productsGrid = document.querySelector('.products-grid');
const cartSidebar = document.querySelector('.cart-sidebar');
const cartItems = document.querySelector('.cart-items');
const cartCount = document.querySelector('.cart-count');
const totalAmount = document.querySelector('.total-amount');
const checkoutModal = document.querySelector('.checkout-modal');
const checkoutForm = document.querySelector('.checkout-form');
const orderItems = document.querySelector('.order-items');

// Filter elements
const categoryFilter = document.getElementById('product-category');
const sortFilter = document.getElementById('product-sort');
const locationFilter = document.getElementById('product-location');

// Initialize the page
function init() {
    loadProducts();
    setupEventListeners();
    loadCartFromStorage();
    updateCartUI();
}

// Load products into the grid
function loadProducts() {
    productsGrid.innerHTML = '';
    const filteredProducts = filterProducts();
    
    filteredProducts.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

// Create product card element
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    card.innerHTML = `
        <div class="product-image">
            <img src="${product.image}" alt="${product.title}">
            <span class="product-badge">${product.badge}</span>
        </div>
        <div class="product-content">
            <h3 class="product-title">${product.title}</h3>
            <p class="product-description">${product.description}</p>
            <div class="product-meta">
                <span class="product-price">$${product.price.toFixed(2)}</span>
                <div class="product-rating">
                    <i class="fas fa-star"></i>
                    <span>${product.rating}</span>
                </div>
            </div>
            <button class="add-to-cart" onclick="addToCart(${product.id})">
                <i class="fas fa-shopping-cart"></i>
                Add to Cart
            </button>
        </div>
    `;
    
    return card;
}

// Filter products based on selected filters
function filterProducts() {
    let filtered = [...products];
    
    // Category filter
    if (categoryFilter.value !== 'all') {
        filtered = filtered.filter(product => product.category === categoryFilter.value);
    }
    
    // Location filter
    if (locationFilter.value !== 'all') {
        filtered = filtered.filter(product => product.location === locationFilter.value);
    }
    
    // Sort products
    switch (sortFilter.value) {
        case 'price-low':
            filtered.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filtered.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            filtered.sort((a, b) => b.rating - a.rating);
            break;
        case 'newest':
            filtered.sort((a, b) => b.id - a.id);
            break;
    }
    
    return filtered;
}

// Add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCartUI();
    saveCartToStorage();
    showNotification('Product added to cart!');
}

// Remove product from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
    saveCartToStorage();
}

// Update cart UI
function updateCartUI() {
    // Update cart items
    cartItems.innerHTML = '';
    total = 0;
    
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        
        cartItem.innerHTML = `
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.title}">
            </div>
            <div class="cart-item-details">
                <h4 class="cart-item-title">${item.title}</h4>
                <span class="cart-item-price">$${item.price.toFixed(2)}</span>
                <div class="cart-item-quantity">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                </div>
            </div>
            <button class="remove-item" onclick="removeFromCart(${item.id})">
                <i class="fas fa-trash"></i>
            </button>
        `;
        
        cartItems.appendChild(cartItem);
        total += item.price * item.quantity;
    });
    
    // Update cart count and total
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    totalAmount.textContent = `$${total.toFixed(2)}`;
    
    // Update order summary in checkout form
    updateOrderSummary();
}

// Update product quantity in cart
function updateQuantity(productId, newQuantity) {
    if (newQuantity < 1) {
        removeFromCart(productId);
        return;
    }
    
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = newQuantity;
        updateCartUI();
        saveCartToStorage();
    }
}

// Update order summary in checkout form
function updateOrderSummary() {
    orderItems.innerHTML = '';
    
    cart.forEach(item => {
        const orderItem = document.createElement('div');
        orderItem.className = 'order-item';
        
        orderItem.innerHTML = `
            <span class="order-item-title">${item.title} x ${item.quantity}</span>
            <span class="order-item-price">$${(item.price * item.quantity).toFixed(2)}</span>
        `;
        
        orderItems.appendChild(orderItem);
    });
    
    // Update totals
    document.querySelector('.subtotal-amount').textContent = `$${total.toFixed(2)}`;
    const shipping = total > 0 ? 5.99 : 0;
    document.querySelector('.shipping-amount').textContent = `$${shipping.toFixed(2)}`;
    document.querySelector('.total-amount').textContent = `$${(total + shipping).toFixed(2)}`;
}

// Save cart to local storage
function saveCartToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Load cart from local storage
function loadCartFromStorage() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Setup event listeners
function setupEventListeners() {
    // Filter changes
    categoryFilter.addEventListener('change', loadProducts);
    sortFilter.addEventListener('change', loadProducts);
    locationFilter.addEventListener('change', loadProducts);
    
    // Cart toggle
    document.querySelector('.cart-icon').addEventListener('click', () => {
        cartSidebar.classList.add('active');
    });
    
    document.querySelector('.close-cart').addEventListener('click', () => {
        cartSidebar.classList.remove('active');
    });
    
    // Checkout button
    document.querySelector('.checkout-btn').addEventListener('click', () => {
        if (cart.length === 0) {
            showNotification('Your cart is empty!');
            return;
        }
        checkoutModal.classList.add('active');
    });
    
    // Close checkout modal
    document.querySelector('.close-modal').addEventListener('click', () => {
        checkoutModal.classList.remove('active');
    });
    
    // Form submission
    checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Here you would typically process the payment
        showNotification('Order placed successfully!');
        cart = [];
        updateCartUI();
        saveCartToStorage();
        checkoutModal.classList.remove('active');
        cartSidebar.classList.remove('active');
    });
}

// Sell Products Form Handling
document.addEventListener('DOMContentLoaded', function() {
    const sellProductForm = document.getElementById('sellProductForm');
    const imageInput = document.getElementById('product-image');
    const imagePreview = document.getElementById('image-preview');
    const uploadPlaceholder = document.querySelector('.upload-placeholder');

    // Image preview functionality
    imageInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                imagePreview.src = e.target.result;
                imagePreview.style.display = 'block';
                uploadPlaceholder.style.display = 'none';
            };
            reader.readAsDataURL(file);
        }
    });

    // Form submission handling
    sellProductForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form data
        const formData = {
            name: document.getElementById('product-name').value,
            category: document.getElementById('product-category').value,
            price: parseFloat(document.getElementById('product-price').value),
            description: document.getElementById('product-description').value,
            location: document.getElementById('product-location').value,
            contact: document.getElementById('seller-contact').value,
            image: imagePreview.src
        };

        // Validate form data
        if (!validateFormData(formData)) {
            return;
        }

        // Create new product object
        const newProduct = {
            id: products.length + 1,
            title: formData.name,
            category: formData.category,
            price: formData.price,
            rating: 0, // New products start with no ratings
            image: formData.image,
            description: formData.description,
            location: formData.location,
            badge: "New",
            sellerContact: formData.contact
        };

        // Add to products array
        products.push(newProduct);

        // Update the products grid
        loadProducts();

        // Show success message
        showNotification('Product submitted successfully!');

        // Reset form
        sellProductForm.reset();
        imagePreview.style.display = 'none';
        uploadPlaceholder.style.display = 'flex';
    });

    // Form validation
    function validateFormData(data) {
        if (!data.name || !data.category || !data.price || !data.description || !data.location || !data.contact || !data.image) {
            showNotification('Please fill in all required fields', 'error');
            return false;
        }

        if (data.price <= 0) {
            showNotification('Price must be greater than 0', 'error');
            return false;
        }

        if (!data.image.includes('data:image')) {
            showNotification('Please upload a product image', 'error');
            return false;
        }

        return true;
    }

    // Enhanced notification system
    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        `;

        document.body.appendChild(notification);

        // Add styles for notification
        notification.style.position = 'fixed';
        notification.style.bottom = '20px';
        notification.style.right = '20px';
        notification.style.padding = '1rem 2rem';
        notification.style.background = type === 'success' ? 'rgba(76, 175, 80, 0.9)' : 'rgba(244, 67, 54, 0.9)';
        notification.style.color = 'white';
        notification.style.borderRadius = '0.5rem';
        notification.style.display = 'flex';
        notification.style.alignItems = 'center';
        notification.style.gap = '0.5rem';
        notification.style.zIndex = '1000';
        notification.style.animation = 'slideIn 0.3s ease-out';

        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-in';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
});

// Initialize the page
init(); 