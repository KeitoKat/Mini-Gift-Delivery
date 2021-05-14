import React, { useState, useEffect } from "react";
import { commerce } from "./lib/commerce";
import { Products, NavBar, Cart } from "./components";

const App = () => {
// STATES
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});

// FETCH API FUNC
  const fetchProducts = async () => { 
    const { data } = await commerce.products.list();

    setProducts(data);
  };

  const fetchCart = async () => { 
    setCart(await commerce.cart.retrieve());
  };

  const handleAddToCart = async (productId, quantity) => {
      const item = await commerce.cart.add(productId, quantity);

      setCart(item.cart)
  }
  
  // USE EFFECT
  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  return (
    <div>
      
      <NavBar totalItems={cart.total_items}/>
      {/* <Products products={products} onAddToCart={handleAddToCart}/> */}
      <Cart cart={cart}/>

    </div>
  )
}

export default App;