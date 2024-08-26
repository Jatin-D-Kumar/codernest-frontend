import * as yup from "yup";

const MAX_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FORMATS = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/jpg",
  "image/webp",
];

export const signUpSchema = yup.object().shape({
  avatar: yup
    .mixed()
    .optional()
    .test("fileSize", "File too large", (value: any) => {
      if (!value) return true;
      return value && value.size <= MAX_SIZE;
    })
    .test("fileFormat", "Unsupported file format", (value: any) => {
      if (!value) return true;
      return value && ACCEPTED_FORMATS.includes(value.type);
    }),
  username: yup
    .string()
    .trim()
    .lowercase()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters long")
    .max(20, "Username cannot be longer than 20 characters"),
  email: yup
    .string()
    .trim()
    .lowercase()
    .required("Email is required")
    .email("Enter a valid email"),
  password: yup
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
