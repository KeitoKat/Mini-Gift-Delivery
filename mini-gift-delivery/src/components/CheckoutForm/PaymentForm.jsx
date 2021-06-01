import React from 'react';
import { Typography, Button, Divider  } from "@material-ui/core";
import { Elements, CardElement, ElementsConsumer } from "@stripe/react-stripe-js";
import { loadStrip } from "@stripe/stripe-js";

import Review from "./Review";

const PaymentForm = ({ shippingData, checkoutToken, handleBack, handleCaptureCheckout, handleNext }) => {
  // FUNCTION HANDLER
  const handleSubmit = async (event, elements, stripe) => {
    event.preventDefault();
    console.log('next is working')

    if (!elements || !stripe) return;

    const cardElement = elements.getElement(CardElement);

    const { error, PaymentMethod } = await stripe.createPaymentMethod({ type:'card', card: cardElement });

    if (error){
      console.log('[error]', error)
    } else {
      const orderData = {
        list_items: checkoutToken.live.line_items,
        customer: { firstname: shippingData.firstName, lastname: shippingData.lastName, email: shippingData.email },
        shipping: { name: 'Primary',
                    street: shippingData.adress1,
                    town_city: shippingData.city,
                    county_state: shippingData.shippingSubdivision,
                    postal_zip_code: shippingData.zip,
                    country: shippingData.shippingCountry },
        fulfillment: { shipping_method: shippingData.shippingOption},
        payment: {
                    gateway: 'stripe',
                    stripe: {
                      payment_method_id: PaymentMethod.id
                    }
                }
      } 
      
      handleCaptureCheckout(checkoutToken.id, orderData);

      handleNext();

     
    }

  }

  // MAIN
  return (
    <div>
      <Review checkoutToken={checkoutToken}/>

      <Divider/>
      <Typography variant="h6" style={{ margin: '20px 0' }}>Payment Method</Typography>
      <Elements stripe={loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY)}>
        <ElementsConsumer>
          {({ elements, stripe }) => (
            <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
              <CardElement />
              <br/><br/>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button variant="outlined" onClick={handleBack}>Back</Button>
                <Button variant="contained" disabled={!stripe} color="primary">Pay {checkoutToken.live.total.formatted_with_symbol}</Button>
              </div>
            </form>
          )}
        </ElementsConsumer>
      </Elements>
    </div>
  )
}

export default PaymentForm;