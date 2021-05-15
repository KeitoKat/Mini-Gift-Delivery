import React, { useState } from 'react';
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button} from "@material-ui/core";

import useStyle from "./styles";
import AddressForm from "../AddressForm";
import PaymentForm from "../PaymentForm";

const steps = ['Shipping Address', 'Payment details'];

const Checkout = () => {

  const classes = useStyle();

  // USESTATE
  const [activeStep, setActiveStep] = useState(1)

  
  // FUNCTIONS
  const ConfirmOrder = () => {
    <div>
      <h3>Your Order Has Been Made! Have a nice day.</h3>
    </div>
  }
  
  // RENDER STEPPER
  const Form = () => 
    activeStep === 0 ? <AddressForm /> : <PaymentForm />
  
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
