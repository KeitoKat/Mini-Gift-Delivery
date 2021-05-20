import React, { useState, useEffect } from 'react';
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button} from "@material-ui/core";

import { commerce } from "../../../lib/commerce";
import useStyle from "./styles";
import AddressForm from "../AddressForm";
import PaymentForm from "../PaymentForm";

const steps = ['Shipping Address', 'Payment details'];

const Checkout = ({ cart, order, handleCaptureCheckout, error }) => {

  const classes = useStyle();

  // USESTATE
  const [activeStep, setActiveStep] = useState(0);
  const [checkoutToken, setCheckoutToken] = useState(null);
  const [shippingData, setShippingData] = useState({});

  // USEEFFECT
  useEffect(() => {
    const generateToken = async () => {
      try {
      const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' });

      setCheckoutToken(token);
      }
      catch (error) {

      }
    }

    generateToken();
  }, [cart]);

  // FUNCTIONS
  const ConfirmOrder = () => {
    return (
    <div>
      <Typography variant="h6" color="primary">Our order Has Been Made! Have a nice day.</Typography>
    </div>)
  }

  const handleNext = () => (
    setActiveStep(previousActiveStep => previousActiveStep + 1)
  )

  const handleBack = () => (
    setActiveStep(previousActiveStep => previousActiveStep - 1)
  )

  const nextButtonHandler = (data) => {
    setShippingData(data);
    handleNext();
  }
  
  // RENDER STEPPER
  const Form = () => 
    activeStep === 0 ? <AddressForm checkoutToken={checkoutToken} next={nextButtonHandler}/> : <PaymentForm shippingData={shippingData} checkoutToken={checkoutToken} handleBack={handleBack} handleCaptureCheckout={handleCaptureCheckout} handleNext={handleNext}/>
  
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
        {console.log(activeStep)}
          {/* LAST STEP? */}
          {activeStep === steps.length ? ConfirmOrder() : checkoutToken && Form()}
          </Paper>
        </main>
      </div>
    </>
  )
}

export default Checkout
