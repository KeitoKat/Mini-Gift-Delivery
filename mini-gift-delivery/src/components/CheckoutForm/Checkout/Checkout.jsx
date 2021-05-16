import React, { useState, useEffect } from 'react';
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button} from "@material-ui/core";

import { commerce } from "../../../lib/commerce";
import useStyle from "./styles";
import AddressForm from "../AddressForm";
import PaymentForm from "../PaymentForm";

const steps = ['Shipping Address', 'Payment details'];

const Checkout = ({ cart }) => {

  const classes = useStyle();

  // USESTATE
  const [activeStep, setActiveStep] = useState(0);
  const [checkoutToken, setCheckoutToken] = useState(null);

  // USEEFFECT
  useEffect(() => {
    const generateToken = async () => {
      try {
      const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' });
console.log(token);
      setCheckoutToken(token);
      }
      catch (error) {

      }
    }

    generateToken();
  }, [cart]);

  // FUNCTIONS
  const ConfirmOrder = () => {
    <div>
      <h3>Your Order Has Been Made! Have a nice day.</h3>
    </div>
  }
  
  // RENDER STEPPER
  const Form = () => 
    activeStep === 0 ? <AddressForm checkoutToken={checkoutToken}/> : <PaymentForm />
  
  // MAIN
  return (
    <>
      <div className={classes.toolbar}>
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography variant="h4" align="center">Checkout</Typography>
            <Stepper activeStep={activeStep} className={classes.stepper}>
              {steps.map((step) => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
              ))}
            </Stepper>
        
          {/* LAST STEP? */}
          {activeStep === steps.length ? ConfirmOrder() : Form()}
          </Paper>
        </main>
      </div>
    </>
  )
}

export default Checkout
