import React, { useEffect } from 'react'
import { Container, Typography, Button, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";

import useStyles from "./styles";
import CardItem from "./CartItem/CartItem";

const Cart = ( {cart, handleUpdateCartQty, handleRemoveFromCart, handleEmptyCart} ) => {
 
  const classes = useStyles();

  // ERROR CHECK  
if(!cart.line_items) return "Checking your order...";

// FUNCTIONS 

  const EmptyCart = () => (
    <Typography variant="subtitle1">
      Your shopping cart is empty. 
      <Link to="/" className={classes.link}> Start shopping now</Link>!
    </Typography>
  )

  const FilledCart = () => {
    return (
    <>
      <Grid container spacing={3}>
        {cart.line_items.map((item) => (
          <Grid item xs={12} sm={4} key={item.id}>
              <CardItem item={item} handleUpdateCartQty={handleUpdateCartQty} handleRemoveFromCart={handleRemoveFromCart}/>
          </Grid>
        ))}
      </Grid>
          
{/* SUBTOTAL */}
          <div className={classes.cardDetails}>
                <Typography variant="h4">
                  Subtotal: { cart.subtotal.formatted_with_symbol }
                </Typography>
          </div>

          <div className={classes.cardDetails}>
{/* BUTTON: EMPTYCART */}
          <Button className={classes.emptyButton} size="large" type="button" variant="contained" color="secondary" onClick={handleEmptyCart}>Empty Cart</Button>

{/* BUTTON: CONFIRM ORDER */}
          <Button className={classes.confirmButton} size="large" type="button" variant="contained" color="primary">Confirm Order</Button>
          </div>

    </>
    );};
console.log(cart.line_items)

// MAIN CODE
  return (
    <Container>
      <div className={classes.toolbar}/>
        <Typography className={classes.title} variant="h3" gutterBottom>Your Shopping Cart</Typography>
        { !cart.line_items.length ? EmptyCart() : FilledCart() }
    </Container>
  );
};

export default Cart;
