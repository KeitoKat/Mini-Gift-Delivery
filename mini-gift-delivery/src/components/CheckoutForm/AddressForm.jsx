// !!! issue: options of fetchShippingOptions should have USA toolbar, but it doesn't and idk why
import React, { useState, useEffect } from 'react';
import { Grid, InputLabel, Select, MenuItem, Button, Typography }  from "@material-ui/core";
import { useForm, FormProvider } from "react-hook-form";
import { Link } from "react-router-dom";

import FormInput from "./FormInput";
import { commerce } from "../../lib/commerce";



const AddressForm = ({ checkoutToken, next }) => {

  // USEFORM
  const methods = useForm();

  // USESTATE
  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState('');
  const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
  const [shippingSubdivision, setShippingSubdivision] = useState('');
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState('');
 
  // // FETCH FUNCTIONS
  const fetchShippingCountries = async (checkoutTokenId) => {
    const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId);

    setShippingCountries(countries);
    setShippingCountry(Object.keys(countries)[0])
  }

  const fetchSubdivisions = async (countryCode) => {
    const { subdivisions } = await commerce.services.localeListSubdivisions(countryCode);
   
    setShippingSubdivisions(subdivisions);
    setShippingSubdivision(Object.keys(subdivisions)[0]);
  }

  const fetchShippingOptions = async (checkoutTokenId, country, region = null) => {
    const options = await commerce.checkout.getShippingOptions(checkoutTokenId, { country, region });
    
    setShippingOptions(options)
    setShippingOption(options[0].id);
  }

   // USEEFFECT
  useEffect(() => {
      fetchShippingCountries(checkoutToken.id);
    }, [])

  useEffect(() => {
    if (shippingCountry) fetchSubdivisions(shippingCountry);
  },[shippingCountry])

  useEffect(() => {
    if (shippingSubdivision) fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubdivision);
  }, [shippingSubdivision]);


  // OTHER FUNCTIONS
  const countries = Object.entries(shippingCountries).map(([code, name])=>
  (
    {id: code, option: name}
  ))

  const subdivisions = Object.entries(shippingSubdivisions).map(([code, name])=>
  (
    {id: code, option: name}
  ))

  const choices = shippingOptions.map((choice)=>({id:choice.id, option:`${choice.description} - (${choice.price.formatted_with_symbol})`}))
  


  // MAIN
  return (
    <>
      <Typography variant="h6" gutterBottom>Shipping Address</Typography>
        <FormProvider {...methods}>
          <form onChange={methods.handleSubmit((e)=> next({...e, shippingCountries, shippingSubdivision, shippingOption}))}>
            <Grid container spacing={3}>
              <FormInput name="firstname" label="First name"/>
              <FormInput name="lastname" label="Last name" />
              <FormInput name="address1" label="Address" />
              <FormInput name="email" label="Email" />
              <FormInput name="City" label="City" />
              <FormInput name="zipcode" label="Zip / Postalcode" />
      
      {/* SHIPPING COUNTRY         */}
              <Grid item sx={12} sm={6}>
                <InputLabel>Shipping Country</InputLabel>
                <Select value={shippingCountry} fullWidth onChange={(e)=>setShippingCountry(e.target.value)}>
                  {countries.map((country)=> (
                    <MenuItem key={country.id} value={country.id}>{country.option}</MenuItem>
                  ))}
                </Select>
              </Grid>

      {/* SHIPPING SUBDIVSION         */}
              <Grid item sx={12} sm={6}>
                <InputLabel>Shipping Subdivision</InputLabel>
                <Select value={shippingSubdivision} fullWidth onChange={(e)=>setShippingSubdivision(e.target.value)}>
                  {subdivisions.map((subdivision)=> (
                    <MenuItem key={subdivision.id} value={subdivision.id}>{subdivision.option}</MenuItem>
                  ))}
                </Select>
              </Grid>

      {/* SHIPPING OPTIONS         */}
              <Grid item sx={12} sm={6}>
                <InputLabel>Shipping Fee</InputLabel>
                <Select value={shippingOption} fullWidth onChange={(e)=>setShippingOption(e.target.value)}>
                {choices.map((choice)=> (
                    <MenuItem key={choice.id} value={choice.id}>{choice.option}</MenuItem>
                  ))}
                </Select>
              </Grid>

            </Grid>

      {/* SUBMIT BUTTON */}
              <br/>
              <div style={{display:'flex', justifyContent:'space-between'}}>
                <Button component={Link} to="/cart" variant="outlined">Back to Cart</Button>
                <Button type="submit" variant="contained" color="primary">Next</Button>
              </div>

          </form>
        </FormProvider>
    </>
  );
}

export default AddressForm;
