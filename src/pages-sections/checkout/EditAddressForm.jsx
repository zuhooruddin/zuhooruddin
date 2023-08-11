import {
  Button,
  Dialog,
  DialogContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import * as yup from "yup";

const checkoutSchema = yup.object({
  city: yup.string().required("Required"),
  country: yup.string().required("Required"),
  address: yup.string().required("Required"),
});

const EditAddressForm = (props) => {
  const {
    addressData,
    selected,
    setAddressData,
    openEditForm,
    setOpenEditForm,
  } = props;

  useEffect(() => {
    formik.setValues({
      city: selected?.city || "",
      country: selected?.country || "",
      address: selected?.address || "",
    });
  }, [selected]);

  const initialValues = {
    city: selected?.city || "",
    country: selected?.country || "",
    address: selected?.address || "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: checkoutSchema,
    onSubmit: (values) => {
      const updated = addressData.map((item) =>
        item.address === selected.address ? { ...item, ...values } : item
      );
      setAddressData(updated);
      setOpenEditForm(false);
    },
  });

  return (
    <Dialog open={openEditForm} onClose={() => setOpenEditForm(false)}>
      <DialogContent>
        <Typography variant="h6" mb={3}>
          Edit Address Information
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          <Box mb={3}>
            <Grid container spacing={3}>
              <Grid item sm={6} xs={12}>
                <TextField
                  fullWidth
                  type="text"
                  name="city"
                  label="City"
                  inputProps={{ maxLength: 100 }}
                  value={formik.values.city}
                  onChange={formik.handleChange}
                  error={formik.touched.city && Boolean(formik.errors.city)}
                  helperText={formik.touched.city && formik.errors.city}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                  variant="filled"
                  type="text"
                  name="country"
                  label="Country"
                  value={formik.values.country}
                  onChange={formik.handleChange}
                  error={formik.touched.country && Boolean(formik.errors.country)}
                  helperText={formik.touched.country && formik.errors.country}
                />
              </Grid>
              <Grid item sm={12} xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  type="text"
                  name="address"
                  label="Complete Address"
                  value={formik.values.address}
                  inputProps={{ maxLength: 150 }}
                  onChange={formik.handleChange}
                  error={formik.touched.address && Boolean(formik.errors.address)}
                  helperText={formik.touched.address && formik.errors.address}
                />
              </Grid>
            </Grid>
          </Box>

          <Button color="primary" variant="contained" type="submit">
            Save
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditAddressForm;
