import React, { useState } from 'react';
import StarRating from './StarRating';

function ProductCard({ product, onAddToCart, onWishlist, isWished, onOpen, style }) {
  const [added, setAdded] = useState(false);

  const handleAdd = (e) => {
    e.stopPropagation();
    onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const handleWish = (e) => {
    e.stopPropagation();
    onWishlist(product.id);
  };

  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : null;

  const badgeLabel = {
    new:      '✦ New',
    hot:      '🔥 Hot',
    sale:     `🏷 -${discount}%`,
    trending: '📈 Trending',
  };

  return (
    <article
      className="product-card"
      onClick={() => onOpen(product)}
      style={style}
      role="listitem"
      aria-label={`View details for ${product.name}`}
    >
      <div className="product-image-wrap">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          onError={(e) => {
            e.target.src = `https://placehold.co/600x400/141421/8b5cf6?text=${encodeURIComponent(product.name.slice(0, 12))}`;
          }}
        />
        {product.badge && (
          <span className={`product-badge badge-${product.badge}`}>
            {badgeLabel[product.badge]}
          </span>
        )}
        <button
          className={`product-wish ${isWished ? 'wished' : ''}`}
          onClick={handleWish}
          aria-label={isWished ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          {isWished ? '❤️' : '🤍'}
        </button>
        <span className="product-category-badge">{product.category}</span>
      </div>

      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-desc">{product.desc}</p>
        <div className="product-rating">
          <StarRating rating={product.rating} />
          <span className="rating-text">{product.rating} ({product.reviews.toLocaleString()})</span>
        </div>
        <div className="product-footer">
          <div className="product-price">
            <span className="price-current">${product.price.toLocaleString()}</span>
            {product.oldPrice && <span className="price-old">${product.oldPrice.toLocaleString()}</span>}
          </div>
          <button
            className={`add-to-cart ${added ? 'added' : ''}`}
            onClick={handleAdd}
            id={`add-to-cart-${product.id}`}
            aria-label={`Add ${product.name} to cart`}
          >
            {added ? '✓ Added' : '🛒 Add'}
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
