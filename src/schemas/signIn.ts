import * as yup from "yup";

export const signInSchema = yup.object().shape({
  username: yup.string().trim().required("Username is required"),
  password: yup.string().trim().required("Password is required"),
});
