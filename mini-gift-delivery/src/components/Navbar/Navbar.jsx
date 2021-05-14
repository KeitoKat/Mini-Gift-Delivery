import React from 'react';
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography } from "@material-ui/core";
import { ShoppingCart } from "@material-ui/icons";
import { Link, useLocation } from "react-router-dom";

import logo from "../../assets/molang-peach.png";
import useStyles from './styles';

const Navbar = ( {totalItems} ) => {
  const classes = useStyles();
  const location = useLocation();


// CHECK PATH - IF WE ARE IN THE ROOT ROUTE, THEN SHOW THE CART ICON, ELSE RETURN NULL

  return (
    <>
        <AppBar position="fixed" className={classes.appBar} color="inherit">
          <Toolbar>

{/* LOGO ICON */}
            <Typography component={ Link } to="/" variant="h6" className={classes.title} color="inherit">
              <img src={logo} alt="Mini Gift" width="30 px" className={classes.image}/>
              Mini Gift
            </Typography>

              <div className={classes.grow}/>

{/* CART ICON */}
            {location.pathname === "/" && (
              <div className={classes.button}>
                <IconButton component={ Link } to="/cart" aria-label="Show cart items" color="inherit">
                  <Badge badgeContent={ totalItems } color="secondary">
                    <ShoppingCart/>
                  </Badge>
                </IconButton>
              </div>
              )}

          </Toolbar>
        </AppBar>
    </>
  )
}

export default Navbar;
