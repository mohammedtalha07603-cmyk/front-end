import React from 'react';
import StarRating from './StarRating';

function ProductModal({ product, onClose, onAddToCart, isWished, onWishlist }) {
  if (!product) return null;

  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="modal-overlay"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label={`Product detail: ${product.name}`}
    >
      <div className="modal">
        <img
          className="modal-image"
          src={product.image}
          alt={product.name}
          onError={(e) => {
            e.target.src = `https://placehold.co/700x280/141421/8b5cf6?text=${encodeURIComponent(product.name.slice(0, 15))}`;
          }}
        />
        <div className="modal-body">
          <div className="modal-header">
            <h2 className="modal-title">{product.name}</h2>
            <button className="modal-close" onClick={onClose} aria-label="Close product detail">✕</button>
          </div>
          <div className="modal-meta">
            <span className="modal-price">${product.price.toLocaleString()}</span>
            {product.oldPrice && <span className="modal-old-price">${product.oldPrice.toLocaleString()}</span>}
            {discount && (
              <span className="product-badge badge-sale" style={{ position: 'static', marginLeft: '4px' }}>
                -{discount}% OFF
              </span>
            )}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.2rem' }}>
            <StarRating rating={product.rating} />
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              {product.rating} · {product.reviews.toLocaleString()} reviews
            </span>
          </div>
          <p className="modal-desc">{product.desc}</p>
          {product.features?.length > 0 && (
            <div>
              <p style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.2px', color: 'var(--text-muted)', marginBottom: '0.7rem' }}>
                Key Features
              </p>
              <div className="modal-features">
                {product.features.map((feat, i) => (
                  <div key={i} className="feature-item">
                    <span className="feature-dot" />
                    {feat}
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="modal-actions">
            <button
              className="modal-add-btn"
              id={`modal-add-${product.id}`}
              onClick={() => { onAddToCart(product); onClose(); }}
              aria-label={`Add ${product.name} to cart`}
            >
              🛒 Add to Cart
            </button>
            <button
              className="modal-wish-btn"
              onClick={() => onWishlist(product.id)}
              aria-label={isWished ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              {isWished ? '❤️' : '🤍'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductModal;
