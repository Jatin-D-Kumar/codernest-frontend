import * as yup from "yup";

export const resetPasswordSchema = yup.object().shape({
  newPassword: yup
    .string()
    .trim()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .max(20, "Password cannot be longer than 20 characters")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one digit")
    .matches(
      /[!@#$%^&*~?]/,
      "Password must contain at least one special character"
    ),
});
