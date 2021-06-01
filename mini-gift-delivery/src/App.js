import React, { useState, useEffect } from "react";
import { commerce } from "./lib/commerce";
import { Products, NavBar, Cart, Checkout } from "./components";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";

const App = () => {
// STATES
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

// FETCH API FUNC
  const fetchProducts = async () => { 
    const { data } = await commerce.products.list();

    setProducts(data);
  };

  const fetchCart = async () => { 
    setCart(await commerce.cart.retrieve());
  };

  //HANDLER FUNCTIONS
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

  const resetOrderCart = async () => {
      const newCart = await commerce.cart.refresh();

      setCart(newCart)
  }

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);

      setOrder(incomingOrder);
      resetOrderCart();

    } catch (error) {
      setErrorMessage(error.data.error.message);
    }
  }


  // USE EFFECT
  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);




// MAIN
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
          <Checkout 
          cart={cart} 
          order={order}
          handleCaptureCheckout={handleCaptureCheckout}
          error={errorMessage}
          />
        </Route>
  
      </Switch>
    
    </Router>
    )
    
}

export default App;