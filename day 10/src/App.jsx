import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { PRODUCTS, CATEGORIES } from './data/products';
import ProductCard from './components/ProductCard';
import ProductModal from './components/ProductModal';
import CartSidebar from './components/CartSidebar';

// ─── Toast ────────────────────────────────────────────────
function Toast({ toasts }) {
  return (
    <div className="toast-container">
      {toasts.map((t) => (
        <div key={t.id} className="toast">
          {t.emoji} {t.message}
        </div>
      ))}
    </div>
  );
}

// ─── Navbar ───────────────────────────────────────────────
function Navbar({ cartCount, onCartOpen }) {
  return (
    <nav className="navbar">
      <a href="#" className="navbar-logo">
        <span>🛍</span>ShopVerse
      </a>
      <div className="navbar-actions">
        <button
          className="cart-btn"
          id="open-cart-btn"
          onClick={onCartOpen}
          aria-label={`Open cart with ${cartCount} items`}
        >
          🛒 Cart
          {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
        </button>
      </div>
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────
function Hero() {
  const productCount  = PRODUCTS.length;
  const categoryCount = CATEGORIES.length - 1;
  const avgRating     = (PRODUCTS.reduce((a, p) => a + p.rating, 0) / PRODUCTS.length).toFixed(1);

  return (
    <section className="hero" aria-label="Hero banner">
      <div className="hero-overlay" />
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />
      <div className="hero-content">
        <div className="hero-tag">✦ New Season Collection 2026</div>
        <h1 className="hero-title">
          Shop <span className="gradient-text">Everything</span>
          <br />You Love
        </h1>
        <p className="hero-subtitle">
          Discover premium products across every category — from gourmet foods
          and sports gear to elegant dresses and stunning accessories.
        </p>
        <div className="hero-stats">
          <div className="stat">
            <div className="stat-number">{productCount}</div>
            <div className="stat-label">Products</div>
          </div>
          <div className="stat">
            <div className="stat-number">{categoryCount}</div>
            <div className="stat-label">Categories</div>
          </div>
          <div className="stat">
            <div className="stat-number">{avgRating}★</div>
            <div className="stat-label">Avg Rating</div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Main App ─────────────────────────────────────────────
export default function App() {
  const [activeCategory,   setActiveCategory]   = useState('all');
  const [searchQuery,      setSearchQuery]       = useState('');
  const [sortBy,           setSortBy]            = useState('default');
  const [view,             setView]              = useState('grid');
  const [cartItems,        setCartItems]         = useState([]);
  const [wished,           setWished]            = useState(new Set());
  const [cartOpen,         setCartOpen]          = useState(false);
  const [selectedProduct,  setSelectedProduct]   = useState(null);
  const [toasts,           setToasts]            = useState([]);

  const addToast = useCallback((message, emoji = '✅') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, emoji }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 2600);
  }, []);

  const handleAddToCart = useCallback((product) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) return prev.map((i) => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
    addToast(`${product.name.slice(0, 24)}… added to cart`, '🛒');
  }, [addToast]);

  const handleUpdateQty = useCallback((id, qty) => {
    if (qty < 1) setCartItems((prev) => prev.filter((i) => i.id !== id));
    else         setCartItems((prev) => prev.map((i) => i.id === id ? { ...i, qty } : i));
  }, []);

  const handleRemove = useCallback((id) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
    addToast('Item removed from cart', '🗑️');
  }, [addToast]);

  const handleWishlist = useCallback((id) => {
    setWished((prev) => {
      const next = new Set(prev);
      if (next.has(id)) { next.delete(id); addToast('Removed from wishlist', '💔'); }
      else              { next.add(id);    addToast('Added to wishlist', '❤️'); }
      return next;
    });
  }, [addToast]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        if (selectedProduct) setSelectedProduct(null);
        else if (cartOpen)   setCartOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selectedProduct, cartOpen]);

  const filteredProducts = useMemo(() => {
    let list = PRODUCTS;
    if (activeCategory !== 'all') list = list.filter((p) => p.category === activeCategory);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter((p) =>
        p.name.toLowerCase().includes(q) ||
        p.desc.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    }
    switch (sortBy) {
      case 'price-asc':  list = [...list].sort((a, b) => a.price - b.price); break;
      case 'price-desc': list = [...list].sort((a, b) => b.price - a.price); break;
      case 'rating':     list = [...list].sort((a, b) => b.rating - a.rating); break;
      case 'reviews':    list = [...list].sort((a, b) => b.reviews - a.reviews); break;
      case 'name':       list = [...list].sort((a, b) => a.name.localeCompare(b.name)); break;
      default: break;
    }
    return list;
  }, [activeCategory, searchQuery, sortBy]);

  const cartCount = cartItems.reduce((s, i) => s + i.qty, 0);

  return (
    <>
      <Navbar cartCount={cartCount} onCartOpen={() => setCartOpen(true)} />
      <Hero />

      <main className="main-container">
        {/* Search & Sort */}
        <div className="search-filter-bar">
          <div className="search-wrapper">
            <span className="search-icon">🔍</span>
            <input
              id="product-search"
              className="search-input"
              type="search"
              placeholder="Search products, categories…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search products"
            />
          </div>
          <select
            id="sort-select"
            className="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            aria-label="Sort products"
          >
            <option value="default">Sort: Default</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="rating">Top Rated</option>
            <option value="reviews">Most Reviewed</option>
            <option value="name">Name A–Z</option>
          </select>
        </div>

        {/* Category Pills */}
        <div className="categories-section">
          <p className="section-label">Browse by Category</p>
          <div className="category-pills" role="tablist" aria-label="Product categories">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                id={`cat-${cat.id}`}
                className={`pill ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
                role="tab"
                aria-selected={activeCategory === cat.id}
              >
                <span className="pill-emoji">{cat.emoji}</span>
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results Info */}
        <div className="results-info">
          <p className="results-count">
            Showing <strong>{filteredProducts.length}</strong> of{' '}
            <strong>{PRODUCTS.length}</strong> products
            {activeCategory !== 'all' && (
              <> in <strong>{CATEGORIES.find((c) => c.id === activeCategory)?.label}</strong></>
            )}
          </p>
          <div className="view-toggle">
            <button
              id="grid-view-btn"
              className={`view-btn ${view === 'grid' ? 'active' : ''}`}
              onClick={() => setView('grid')}
              aria-label="Grid view"
              title="Grid view"
            >⊞</button>
            <button
              id="list-view-btn"
              className={`view-btn ${view === 'list' ? 'active' : ''}`}
              onClick={() => setView('list')}
              aria-label="List view"
              title="List view"
            >☰</button>
          </div>
        </div>

        {/* Product Grid */}
        <div
          className={`products-grid ${view === 'list' ? 'list-view' : ''}`}
          role="list"
          aria-label="Product catalog"
        >
          {filteredProducts.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🔍</div>
              <p className="empty-title">No products found</p>
              <p className="empty-desc">Try adjusting your search or browse a different category.</p>
            </div>
          ) : (
            filteredProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                onWishlist={handleWishlist}
                isWished={wished.has(product.id)}
                onOpen={setSelectedProduct}
                style={{ animationDelay: `${index * 45}ms` }}
              />
            ))
          )}
        </div>
      </main>

      <footer className="footer">
        <div className="footer-logo">🛍 ShopVerse</div>
        <p>© 2026 ShopVerse — Premium Product Catalog. All rights reserved.</p>
      </footer>

      {cartOpen && (
        <CartSidebar
          cartItems={cartItems}
          onClose={() => setCartOpen(false)}
          onUpdateQty={handleUpdateQty}
          onRemove={handleRemove}
        />
      )}

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
          isWished={wished.has(selectedProduct.id)}
          onWishlist={handleWishlist}
        />
      )}

      <Toast toasts={toasts} />
    </>
  );
}
