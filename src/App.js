import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import data from "./data";

// Components
import Navigation from "./components/Navigation";
import Products from "./components/Products";
import ShoppingCart from "./components/ShoppingCart";

//Context
import ProductContext from "./contexts/ProductContext";
import CartContext from "./contexts/CartContext";

function App() {
  const [products] = useState(data);
  const [cart, setCart] = useState(
    localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : []
  );

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const [empty, setEmpty] = useState([]);

  const addItem = item => {
    // add the given item to the cart
    setCart([...cart, item])
  };

  const removeItem = itemTitle => {
		setCart(cart.filter(item => item.title !== itemTitle))
  }

  function clearCart() {
    setCart(empty);
  }
  


  return (
    <ProductContext.Provider value={{ products, addItem }}>
      <CartContext.Provider value={ {cart, setCart, removeItem, clearCart} }>
        <div className="App">
          <Navigation cart={cart} />

          {/* Routes */}
          <Route exact path="/" component={Products} />

          <Route path="/cart" component={ShoppingCart} />
        </div>
      </CartContext.Provider>
    </ProductContext.Provider>
  );
}

export default App;
