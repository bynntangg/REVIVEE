// Sample product data
const products = [
    {
        id: 1,
        name: "Vintage Denim",
        seller: "Denim Revival",
        price: 185000,
        originalPrice: 450000,
        category: "preloved",
        carbonScore: 88,
        image: "fa-tshirt",
        discount: 59
    },
    {
        id: 2,
        name: "iPhone X",
        seller: "Tech Revive",
        price: 4200000,
        originalPrice: 8000000,
        category: "refurbished",
        carbonScore: 92,
        image: "fa-mobile-alt",
        discount: 47
    },
    {
        id: 3,
        name: "Wood Table",
        seller: "Eco Furniture",
        price: 350000,
        originalPrice: 600000,
        category: "upcycled",
        carbonScore: 78,
        image: "fa-couch",
        discount: 42
    },
    {
        id: 4,
        name: "Batik Ecoprint",
        seller: "Batik Nusantara",
        price: 275000,
        originalPrice: 350000,
        category: "sustainable",
        carbonScore: 95,
        image: "fa-paint-brush",
        discount: 21
    }
];

// Load products
function loadProducts() {
    const productGrid = document.getElementById('productGrid');
    if (!productGrid) return;

    productGrid.innerHTML = '';

    products.forEach(product => {
        const carbonClass = product.carbonScore >= 85 ? 'low' : 'medium';
        
        const productCard = `
            <div class="product-card" data-category="${product.category}">
                <span class="product-badge">${product.category}</span>
                <div class="product-image">
                    <i class="fas ${product.image}"></i>
                    <div class="carbon-chip ${carbonClass}">
                        <i class="fa-solid fa-leaf"></i> ${product.carbonScore}
                    </div>
                </div>
                <div class="product-info">
                    <h4 class="product-title">${product.name}</h4>
                    <p class="product-seller">${product.seller}</p>
                    <div class="price-section">
                        <span class="current-price">Rp ${(product.price/1000).toFixed(0)}k</span>
                        <span class="original-price">Rp ${(product.originalPrice/1000).toFixed(0)}k</span>
                        <span class="discount">-${product.discount}%</span>
                    </div>
                    <button class="add-to-cart" onclick="addToCart('${product.name}')">
                        <i class="fa-regular fa-bag-shopping"></i> Keranjang
                    </button>
                </div>
            </div>
        `;
        
        productGrid.innerHTML += productCard;
    });
}

// Add to cart
function addToCart(productName) {
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        bottom: 80px;
        left: 50%;
        transform: translateX(-50%);
        background: #10b981;
        color: white;
        padding: 0.8rem 1.5rem;
        border-radius: 30px;
        font-size: 0.9rem;
        box-shadow: 0 10px 30px rgba(16, 185, 129, 0.3);
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    toast.textContent = `✓ ${productName} ditambahkan`;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        document.body.removeChild(toast);
    }, 2000);
}

// Tab click handler
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        const category = this.textContent.toLowerCase();
        filterProducts(category === 'semua' ? 'all' : category);
    });
});

// Filter products
function filterProducts(category) {
    const products = document.querySelectorAll('.product-card');
    
    products.forEach(product => {
        if (category === 'all' || product.dataset.category === category) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}

// Initialize
window.addEventListener('load', () => {
    loadProducts();
});

// Category click
document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', function() {
        const category = this.dataset.category;
        filterProducts(category);
    });
});