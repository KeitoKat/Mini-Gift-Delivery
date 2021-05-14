import React from 'react'
import {Card, CardMedia, CardContent, CardActions, Typography, IconButton} from "@material-ui/core";
import {AddShoppingCart} from "@material-ui/icons";


import useStyles from "./styles";

const Product = ({ product, onAddToCart }) => {
  const classes = useStyles();

  return (
    <main>
      <Card className={classes.root}>
      <CardMedia className={classes.media} title={product.name} image={product.media.source}/>
      
  {/* CARD CONTENT */}
      <CardContent>
        {/* NAME AND PRICE */}
        <div className={classes.cardcontent}>
          <Typography variant="h5" gutterBottom>
            {product.name}
          </Typography>
          <Typography variant="h5">
            {product.price.formatted_with_symbol}
          </Typography>
        </div>
        {/* DESCRIPTION */}
        <Typography dangerouslySetInnerHTML={{ __html: product.description }} variant="body2" color="textSecondary" />
      </CardContent>

  {/* CARD ACTION */}
      <CardActions>
        <IconButton aria-label="Add to Cart" onClick={() => onAddToCart(product.id, 1)}>
          <AddShoppingCart/>
        </IconButton>
      </CardActions>

     
      </Card>
    </main>
  )
}

export default Product;
