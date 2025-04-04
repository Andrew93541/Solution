// Sustainable Product Marketplace Page JavaScript

document.addEventListener('DOMContentLoaded', () => {
    initializeProducts();
    initializeFilters();
    initializeViewOptions();
    initializeSortOptions();
    initializePagination();
    initializeSearch();
    initializeCart();
    updateCartCount();
});

// Sample data for products
const products = [
    {
        id: 1,
        title: 'Organic Cotton T-Shirt',
        category: 'fashion',
        price: 29.99,
        rating: 4.5,
        reviews: 128,
        description: 'Made from 100% organic cotton, sustainably sourced and ethically produced.',
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        sustainability: ['organic', 'fairtrade'],
        seller: {
            name: 'EcoFashion Co.',
            rating: 4.8,
            verified: true
        }
    },
    {
        id: 2,
        title: 'Bamboo Kitchen Utensils Set',
        category: 'home',
        price: 39.99,
        rating: 4.7,
        reviews: 89,
        description: 'Sustainable bamboo kitchen utensils set, perfect for eco-friendly cooking.',
        image: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        sustainability: ['recycled'],
        seller: {
            name: 'GreenHome',
            rating: 4.9,
            verified: true
        }
    },
    {
        id: 3,
        title: 'Organic Coffee Beans',
        category: 'food',
        price: 24.99,
        rating: 4.6,
        reviews: 256,
        description: 'Fair trade organic coffee beans, sustainably harvested and roasted.',
        image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        sustainability: ['organic', 'fairtrade'],
        seller: {
            name: 'EcoCoffee',
            rating: 4.7,
            verified: true
        }
    },
    {
        id: 4,
        title: 'Natural Face Cream',
        category: 'beauty',
        price: 34.99,
        rating: 4.8,
        reviews: 167,
        description: 'Vegan and cruelty-free face cream made with natural ingredients.',
        image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        sustainability: ['vegan'],
        seller: {
            name: 'PureBeauty',
            rating: 4.8,
            verified: true
        }
    },
    {
        id: 5,
        title: 'Recycled Glass Water Bottle',
        category: 'home',
        price: 19.99,
        rating: 4.9,
        reviews: 342,
        description: 'Eco-friendly water bottle made from recycled glass with silicone sleeve.',
        image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        sustainability: ['recycled'],
        seller: {
            name: 'EcoBottle',
            rating: 4.9,
            verified: true
        }
    },
    {
        id: 6,
        title: 'Organic Cotton Yoga Mat',
        category: 'fashion',
        price: 49.99,
        rating: 4.7,
        reviews: 198,
        description: 'Natural rubber yoga mat with organic cotton cover.',
        image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        sustainability: ['organic'],
        seller: {
            name: 'YogaEco',
            rating: 4.8,
            verified: true
        }
    },
    {
        id: 7,
        title: 'Fair Trade Chocolate',
        category: 'food',
        price: 12.99,
        rating: 4.8,
        reviews: 289,
        description: 'Dark chocolate made with fair trade cocoa beans.',
        image: 'https://images.unsplash.com/photo-1511381939415-e44015466834?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        sustainability: ['fairtrade'],
        seller: {
            name: 'EcoChocolate',
            rating: 4.9,
            verified: true
        }
    },
    {
        id: 8,
        title: 'Natural Shampoo Bar',
        category: 'beauty',
        price: 14.99,
        rating: 4.6,
        reviews: 156,
        description: 'Zero-waste shampoo bar made with natural ingredients.',
        image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        sustainability: ['vegan'],
        seller: {
            name: 'ZeroWasteBeauty',
            rating: 4.7,
            verified: true
        }
    }
];

let currentFilters = {
    categories: [],
    priceRange: { min: 0, max: 1000 },
    sustainability: [],
    searchQuery: ''
};

let currentSort = 'popular';
let currentView = 'grid';
let currentPage = 1;
const itemsPerPage = 8;

// Add search functionality
function initializeSearch() {
    const searchInput = document.querySelector('.search-input');
    const searchButton = document.querySelector('.search-icon');

    if (searchInput && searchButton) {
        searchButton.addEventListener('click', () => {
            const query = searchInput.value.toLowerCase().trim();
            if (query) {
                currentFilters.searchQuery = query;
                currentPage = 1;
                displayProducts();
            }
        });

        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const query = searchInput.value.toLowerCase().trim();
                if (query) {
                    currentFilters.searchQuery = query;
                    currentPage = 1;
                    displayProducts();
                }
            }
        });
    }
}

function initializeProducts() {
    displayProducts();
}

function displayProducts() {
    const productsGrid = document.querySelector('.products-grid');
    if (!productsGrid) return;

    // Apply filters and sorting
    let filteredProducts = filterProducts(products);
    filteredProducts = sortProducts(filteredProducts);

    // Apply pagination
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    // Update grid/list view
    productsGrid.className = `products-${currentView}`;
    productsGrid.innerHTML = paginatedProducts.map(product => `
        <div class="product-card">
            <div class="product-image">
                <img src="${product.image}" alt="${product.title}">
                <span class="sustainability-badge">${product.sustainability.join(', ')}</span>
            </div>
            <div class="product-info">
                <h3>${product.title}</h3>
                <div class="product-rating">
                    ${generateStars(product.rating)}
                    <span>(${product.reviews})</span>
                </div>
                <p class="product-description">${product.description}</p>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <button class="add-to-cart" onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        </div>
    `).join('');

    // Update pagination
    updatePagination(filteredProducts.length);
}

function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
}

function initializeFilters() {
    const filterCheckboxes = document.querySelectorAll('.filter-option input[type="checkbox"]');
    const priceSlider = document.querySelector('.price-slider');
    const priceInputs = document.querySelectorAll('.price-input');
    const applyFiltersBtn = document.querySelector('.apply-filters-btn');

    // Handle category and sustainability filters
    filterCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            const category = checkbox.value;
            if (checkbox.checked) {
                if (['home', 'fashion', 'food', 'beauty'].includes(category)) {
                    currentFilters.categories.push(category);
                } else {
                    currentFilters.sustainability.push(category);
                }
            } else {
                if (['home', 'fashion', 'food', 'beauty'].includes(category)) {
                    currentFilters.categories = currentFilters.categories.filter(c => c !== category);
                } else {
                    currentFilters.sustainability = currentFilters.sustainability.filter(s => s !== category);
                }
            }
        });
    });

    // Handle price range filter
    priceSlider.addEventListener('input', (e) => {
        currentFilters.priceRange.max = parseInt(e.target.value);
        priceInputs[1].value = e.target.value;
    });

    priceInputs.forEach((input, index) => {
        input.addEventListener('change', () => {
            const value = parseInt(input.value);
            if (index === 0) {
                currentFilters.priceRange.min = value;
                priceSlider.min = value;
            } else {
                currentFilters.priceRange.max = value;
                priceSlider.max = value;
            }
        });
    });

    // Apply filters button
    applyFiltersBtn.addEventListener('click', () => {
        currentPage = 1;
        displayProducts();
    });
}

function filterProducts(products) {
    return products.filter(product => {
        // Search query filter
        if (currentFilters.searchQuery) {
            const searchLower = currentFilters.searchQuery.toLowerCase();
            const matchesSearch = 
                product.title.toLowerCase().includes(searchLower) ||
                product.description.toLowerCase().includes(searchLower) ||
                product.seller.name.toLowerCase().includes(searchLower);
            if (!matchesSearch) return false;
        }

        // Category filter
        if (currentFilters.categories.length > 0 && !currentFilters.categories.includes(product.category)) {
            return false;
        }

        // Price range filter
        if (product.price < currentFilters.priceRange.min || product.price > currentFilters.priceRange.max) {
            return false;
        }

        // Sustainability filter
        if (currentFilters.sustainability.length > 0) {
            const hasAllSustainability = currentFilters.sustainability.every(s => 
                product.sustainability.includes(s)
            );
            if (!hasAllSustainability) {
                return false;
            }
        }

        return true;
    });
}

function sortProducts(products) {
    switch (currentSort) {
        case 'newest':
            return [...products].sort((a, b) => b.id - a.id);
        case 'price-low':
            return [...products].sort((a, b) => a.price - b.price);
        case 'price-high':
            return [...products].sort((a, b) => b.price - a.price);
        case 'popular':
        default:
            return [...products].sort((a, b) => b.reviews - a.reviews);
    }
}

function initializeViewOptions() {
    const viewButtons = document.querySelectorAll('.view-btn');
    viewButtons.forEach(button => {
        button.addEventListener('click', () => {
            viewButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentView = button.dataset.view;
            displayProducts();
        });
    });
}

function initializeSortOptions() {
    const sortSelect = document.querySelector('.sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            currentSort = e.target.value;
            currentPage = 1;
            displayProducts();
        });
    }
}

function initializePagination() {
    const pagination = document.querySelector('.pagination');
    if (!pagination) return;

    pagination.addEventListener('click', (e) => {
        if (e.target.classList.contains('page-btn')) {
            const page = parseInt(e.target.textContent);
            if (!isNaN(page)) {
                currentPage = page;
                displayProducts();
            } else if (e.target.textContent === 'Previous') {
                if (currentPage > 1) {
                    currentPage--;
                    displayProducts();
                }
            } else if (e.target.textContent === 'Next') {
                const totalPages = Math.ceil(filterProducts(products).length / itemsPerPage);
                if (currentPage < totalPages) {
                    currentPage++;
                    displayProducts();
                }
            }
        }
    });
}

function updatePagination(totalItems) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const pagination = document.querySelector('.pagination');
    if (!pagination) return;

    const pageNumbers = pagination.querySelector('.page-numbers');
    const prevBtn = pagination.querySelector('.page-btn:first-child');
    const nextBtn = pagination.querySelector('.page-btn:last-child');

    // Update previous button
    prevBtn.disabled = currentPage === 1;

    // Update page numbers
    let pageNumbersHtml = '';
    for (let i = 1; i <= totalPages; i++) {
        if (
            i === 1 ||
            i === totalPages ||
            (i >= currentPage - 1 && i <= currentPage + 1)
        ) {
            pageNumbersHtml += `
                <button class="page-btn ${i === currentPage ? 'active' : ''}">${i}</button>
            `;
        } else if (
            i === currentPage - 2 ||
            i === currentPage + 2
        ) {
            pageNumbersHtml += '<span>...</span>';
        }
    }
    pageNumbers.innerHTML = pageNumbersHtml;

    // Update next button
    nextBtn.disabled = currentPage === totalPages;
}

// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function initializeCart() {
    const cartIcon = document.querySelector('.cart-icon');
    const cartModal = document.getElementById('cartModal');
    const closeCart = document.querySelector('.close-cart');
    const checkoutBtn = document.querySelector('.checkout-btn');

    if (cartIcon) {
        cartIcon.addEventListener('click', () => {
            cartModal.classList.add('active');
            updateCartDisplay();
        });
    }

    if (closeCart) {
        closeCart.addEventListener('click', () => {
            cartModal.classList.remove('active');
        });
    }

    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (cart.length > 0) {
                showNotification('Proceeding to checkout...', 'success');
                // Here you would typically redirect to a checkout page
                setTimeout(() => {
                    cartModal.classList.remove('active');
                }, 1500);
            } else {
                showNotification('Your cart is empty!', 'error');
            }
        });
    }

    // Close cart when clicking outside
    cartModal.addEventListener('click', (e) => {
        if (e.target === cartModal) {
            cartModal.classList.remove('active');
        }
    });
}

function updateCartDisplay() {
    const cartItems = document.querySelector('.cart-items');
    const totalAmount = document.querySelector('.total-amount');
    
    if (!cartItems) return;

    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        if (totalAmount) totalAmount.textContent = '$0.00';
        return;
    }

    cartItems.innerHTML = cart.map((item, index) => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.title}" class="cart-item-image">
            <div class="cart-item-details">
                <h3 class="cart-item-title">${item.title}</h3>
                <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn" onclick="updateQuantity(${index}, -1)">-</button>
                    <span>${item.quantity || 1}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${index}, 1)">+</button>
                </div>
            </div>
            <button class="remove-item" onclick="removeFromCart(${index})">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `).join('');

    // Update total amount
    const total = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
    if (totalAmount) totalAmount.textContent = `$${total.toFixed(2)}`;
}

function updateQuantity(index, change) {
    if (!cart[index]) return;
    
    cart[index].quantity = (cart[index].quantity || 1) + change;
    
    if (cart[index].quantity < 1) {
        removeFromCart(index);
    } else {
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
        updateCartCount();
    }
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
    updateCartCount();
    showNotification('Item removed from cart', 'success');
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        const existingItem = cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity = (existingItem.quantity || 1) + 1;
        } else {
            cart.push({
                id: product.id,
                title: product.title,
                price: product.price,
                image: product.image,
                quantity: 1
            });
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        showNotification('Product added to cart!', 'success');
        updateCartCount();
    }
}

function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
        cartCount.textContent = totalItems;
    }
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add styles for notifications
const styles = `
    .notification {
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        padding: 1rem 2rem;
        border-radius: 5px;
        background: white;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        transform: translateY(100px);
        opacity: 0;
        transition: all 0.3s;
    }

    .notification.show {
        transform: translateY(0);
        opacity: 1;
    }

    .notification.success {
        background: #e8f5e9;
        color: #2e7d32;
    }

    .notification.error {
        background: #ffebee;
        color: #c62828;
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = styles;
document.head.appendChild(styleSheet); 