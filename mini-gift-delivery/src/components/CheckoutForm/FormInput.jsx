import React from 'react';
import { TextField, Grid } from "@material-ui/core";
import { useFormContext, Controller } from "react-hook-form";

const FormInput = ({ name, label, placeholder }) => {

  const { control } = useFormContext();

  // MAIN
  return (
    <Grid item xs={12} sm={6}>
      <Controller 
        render={({ field }) => <TextField {...field} label={label}/>}
        control={control} 
        fullWidth 
        name={name}
        required/>
    </Grid>
  );
}

export default FormInput;
