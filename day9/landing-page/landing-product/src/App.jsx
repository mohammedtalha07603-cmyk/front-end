import "./App.css";

function App() {
  const products = [
    {
      id: 1,
      name: "Wireless Headphones",
      price: "$79",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400"
    },
    {
      id: 2,
      name: "Smart Watch",
      price: "$99",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400"
    },
    {
      id: 3,
      name: "Gaming Mouse",
      price: "$49",
      image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=400"
    },
    {
      id: 4,
      name: "Bluetooth Speaker",
      price: "$65",
      image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=400"
    }
  ];

  return (
    <div className="app">
      <nav className="navbar">
        <h2>TechStore</h2>
        <ul>
          <li>Home</li>
          <li>Products</li>
          <li>Offers</li>
          <li>Contact</li>
        </ul>
      </nav>

      <section className="hero">
        <div className="hero-text">
          <h1>Discover Amazing Tech Products</h1>
          <p>Shop the latest gadgets with premium quality and affordable prices.</p>
          <button>Shop Now</button>
        </div>
      </section>

      <section className="catalog">
        <h2>Featured Products</h2>

        <div className="products">
          {products.map((item) => (
            <div className="card" key={item.id}>
              <img src={item.image} alt={item.name} />
              <h3>{item.name}</h3>
              <p>{item.price}</p>
              <button>Add to Cart</button>
            </div>
          ))}
        </div>
      </section>

      <footer>
        <p>© 2026 TechStore. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default App;