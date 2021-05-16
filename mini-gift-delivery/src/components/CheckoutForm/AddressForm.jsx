import React, { useState, useEffect } from 'react';
import { Grid, InputLabel, Select, MenuItem, Button, Typography }  from "@material-ui/core";
import { useForm, FormProvider } from "react-hook-form";

import FormInput from "./FormInput";
import { commerce } from "../../lib/commerce";

const AddressForm = ({ checkoutToken }) => {

  // USEFORM
  const methods = useForm();

  // USESTATE
  const [shippingCountries, setShippingCounries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState('');
  const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
  const [shippingSubdivision, setShippingSubdivision] = useState('');
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState('');
 

  // FETCH FUNCTIONS
  const fetchShippingCountries = async (checkoutTokenId) => {
    const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId);
    console.log(countries)
    setShippingCounries(countries);
  }

   // USEEFFECT
   useEffect(()=> {
    fetchShippingCountries(checkoutToken.id);
  }, [])

  // MAIN
  return (
    <>
      <Typography variant="h6" gutterBottom>Shipping Address</Typography>
        <FormProvider {...methods}>
          <form>
            <Grid container spacing={3}>
              <FormInput required name="firstname" label="First name" />
              <FormInput required name="lastname" label="Last name" />
              <FormInput required name="address1" label="Address" />
              <FormInput required name="email" label="Email" />
              <FormInput required name="City" label="City" />
              <FormInput required name="zipcode" label="Zip / Postalcode" />
      
      {/* SHIPPING COUNTRY         */}
              {/* <Grid item sx={12} sm={6}>
                <InputLabel>Shipping Country</InputLabel>
                <Select value={} fullWidth onChange={}>
                  <MenuItem key={} value={}>Select Country</MenuItem>
                </Select>
              </Grid> */}

      {/* SHIPPING COUNTRY         */}
              {/* <Grid item sx={12} sm={6}>
                <InputLabel>Shipping Country</InputLabel>
                <Select value={} fullWidth onChange={}>
                  <MenuItem key={} value={}>Shipping Division</MenuItem>
                </Select>
              </Grid> */}

      {/* SHIPPING COUNTRY         */}
              {/* <Grid item sx={12} sm={6}>
                <InputLabel>Shipping Country</InputLabel>
                <Select value={} fullWidth onChange={}>
                  <MenuItem key={} value={}>Shipping Options</MenuItem>
                </Select>
              </Grid> */}

            </Grid>
          </form>
        </FormProvider>
    </>
  );
}

export default AddressForm;
