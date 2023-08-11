import {
  Button,
  Dialog,
  DialogContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import React, { Fragment, useState } from "react";
import * as yup from "yup";
const checkoutSchema = yup.object({
  address: yup.string().required("required"),
  city: yup.string().required("required"),
  country: yup.string().required("required"),
});
const initialValues = {
  city: "",
  address: "",
  country: "Pakistan",
}; // ==================================================================

// ==================================================================
const NewAddressForm = ({ setNewAddress,setFieldValue }) => {
  const [addCardForm, setAddCardForm] = useState(false);
  const { handleChange, handleSubmit, errors, touched, values } = useFormik({
    initialValues: initialValues,
    validationSchema: checkoutSchema,
    onSubmit: (values, { resetForm }) => {
      setNewAddress(values);
      //  (values);

      if (values) {
        setFieldValue('address',values['address']);
        setFieldValue('city',values['city']);
        setAddCardForm(false);
        resetForm(initialValues);
      }
    },
  });
  return (
    <Fragment>
      <Button
        color="primary"
        variant="outlined"
        sx={{
          p: "2px 20px",
        }}
        onClick={() =>
          addCardForm ? setAddCardForm(false) : setAddCardForm(true)
        }
      >
        Add New Address
      </Button>

      <Dialog open={addCardForm} onClose={() => setAddCardForm(false)}>
        <DialogContent>
          <Typography variant="h6" mb={3}>
            Add New Address Information
          </Typography>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item sm={6} xs={12}>
                <TextField
                  fullWidth
                  name="city"
                  label="City"
                  inputProps={{ maxLength: 100 }}
                  value={values.city}
                  onChange={handleChange}
                  helperText={touched.city && errors.city}
                  error={touched.city && Boolean(errors.city)}
                />
              </Grid>

              <Grid item sm={6} xs={12}>
                <TextField
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                  variant="filled"
                  name="country"
                  label="Country"
                  value={values.country}
                  onChange={handleChange}
                  helperText={touched.country && errors.country}
                  error={touched.country && Boolean(errors.country)}
                />
              </Grid>

              <Grid item sm={12} xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  inputProps={{ maxLength: 150 }}
                  type="text"
                  name="address"
                  label="Complete Address"
                  value={values.address}
                  onChange={handleChange}
                  helperText={touched.address && errors.address}
                  error={touched.address && Boolean(errors.address)}
                />
              </Grid>

              <Grid item sm={6} xs={12}>
                <Button color="primary" variant="contained" type="submit">
                  Save
                </Button>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default NewAddressForm;
