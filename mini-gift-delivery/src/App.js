import React, { useState, useEffect } from "react";
import { commerce } from "./lib/commerce";
import { Products, NavBar, Cart, Checkout } from "./components";
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

  // FUNCTION HANDLERS
  const handleAddToCart = async (productId, quantity) => {
      const { cart } = await commerce.cart.add(productId, quantity);

      setCart(cart);
  }
  
  const handleUpdateCartQty = async (productId, quantity) => {
    const { cart } = await commerce.cart.update(productId, {quantity});

    setCart(cart);
  }

  const handleRemoveFromCart = async (productId) => {
    const { cart } = await commerce.cart.remove(productId);

    setCart(cart);
  }

  const handleEmptyCart = async () => {
    const { cart } = await commerce.cart.empty();

    setCart(cart);
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
        {/* HOMEPAGE */}
        <Route exact path="/">
          <Products products={products} onAddToCart={handleAddToCart}/>
        </Route>

        {/* VIEW CART PAGE */}
        <Route exact path="/cart">
          <Cart 
          cart={cart} 
          handleUpdateCartQty={handleUpdateCartQty}
          handleRemoveFromCart={handleRemoveFromCart}
          handleEmptyCart={handleEmptyCart}
          />
        </Route>

        {/* CHECKOUT PAGE */}
        <Route exact path="/checkout">
          <Checkout />
        </Route>
  
      </Switch>
    
    </Router>
    )
    
}

export default App;