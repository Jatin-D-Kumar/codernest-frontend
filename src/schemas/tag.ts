import * as yup from "yup";

export const tagSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .required("Tag name is required")
    .min(3, "Tag name must be at least 3 characters long")
    .max(15, "Tag name cannot be greater than 15 characters"),
});
