import React, { useState, useEffect } from "react";
import { commerce } from "./lib/commerce";
import { Products, NavBar, Cart } from "./components";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";

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
    <Router>

{/* NAVBAR IS ALWAYS VISIBLEE */}
        <NavBar totalItems={cart.total_items}/>

{/* SWITCH BETWEEN THE TWO ROUTES */}
      <Switch>

        <Route exact path="/">
          <Products products={products} onAddToCart={handleAddToCart}/>
        </Route>

        <Route exact path="/cart">
          <Cart cart={cart}/>
        </Route>
  
      </Switch>
    
    </Router>
    )
    
}

export default App;