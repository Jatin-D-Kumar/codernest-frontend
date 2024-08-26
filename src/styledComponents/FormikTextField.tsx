import { TextField, TextFieldProps } from "@mui/material";
import { FormikProps } from "formik";
import React from "react";

interface FormikTextFieldProps extends Omit<TextFieldProps, "name"> {
  formik: FormikProps<any>;
  name: string;
}

const FormikTextField: React.FC<FormikTextFieldProps> = ({
  formik,
  name,
  ...props
}: any) => {
  return (
    <TextField
      {...props}
      name={name}
      value={formik.values[name]}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      error={formik.touched[name] && Boolean(formik.errors[name])}
      helperText={formik.touched[name] && formik.errors[name]}
    />
  );
};

export default FormikTextField;
