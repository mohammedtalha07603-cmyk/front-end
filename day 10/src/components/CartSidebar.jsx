import React from 'react';

function CartSidebar({ cartItems, onClose, onUpdateQty, onRemove }) {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <>
      <div className="cart-overlay" onClick={onClose} />
      <aside className="cart-sidebar" role="dialog" aria-modal="true" aria-label="Shopping cart">
        <div className="cart-header">
          <h2 className="cart-title">🛒 Your Cart</h2>
          <button className="cart-close" onClick={onClose} aria-label="Close cart">✕</button>
        </div>
        <div className="cart-items">
          {cartItems.length === 0 ? (
            <div className="cart-empty-msg">
              <div className="cart-empty-icon">🛍️</div>
              <p style={{ fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>Your cart is empty</p>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Add some awesome products!</p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img
                  className="cart-item-img"
                  src={item.image}
                  alt={item.name}
                  onError={(e) => { e.target.src = 'https://placehold.co/64x64/141421/8b5cf6?text=?'; }}
                />
                <div className="cart-item-info">
                  <div className="cart-item-name" title={item.name}>{item.name}</div>
                  <div className="cart-item-price">${(item.price * item.qty).toLocaleString()}</div>
                  <div className="cart-item-controls">
                    <button className="qty-btn" onClick={() => onUpdateQty(item.id, item.qty - 1)} aria-label={`Decrease quantity of ${item.name}`}>−</button>
                    <span className="qty-value">{item.qty}</span>
                    <button className="qty-btn" onClick={() => onUpdateQty(item.id, item.qty + 1)} aria-label={`Increase quantity of ${item.name}`}>+</button>
                    <button className="cart-item-remove" onClick={() => onRemove(item.id)} aria-label={`Remove ${item.name}`} title="Remove">🗑️</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        {cartItems.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total-row">
              <span className="cart-total-label">Total ({cartItems.reduce((s, i) => s + i.qty, 0)} items)</span>
              <span className="cart-total-value">${total.toLocaleString()}</span>
            </div>
            <button
              className="checkout-btn"
              id="checkout-btn"
              onClick={() => alert(`Proceeding to checkout!\nTotal: $${total.toLocaleString()}`)}
            >
              ⚡ Checkout Now
            </button>
          </div>
        )}
      </aside>
    </>
  );
}

export default CartSidebar;
