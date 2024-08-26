import * as yup from "yup";

export const snippetSchema = yup.object().shape({
  title: yup
    .string()
    .trim()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters long")
    .max(30, "Title cannot be longer than 30 characters"),
  description: yup
    .string()
    .trim()
    .optional()
    .min(3, "Description must be at least 3 characters long")
    .max(100, "Description cannot be longer than 100 characters"),
  code: yup
    .string()
    .trim()
    .required("Code snippet is required")
    .max(1000, "Snippet cannot be longer than 1000 characters"),
  language: yup.string().trim().required("Language is required"),
  tags: yup.array().optional(),
});
