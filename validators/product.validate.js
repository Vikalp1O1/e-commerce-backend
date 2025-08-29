
import * as yup from "yup";

export const productSchema = yup.object({
  name: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
  price: yup.number().required("Price is required").positive("Price must be positive"),
  // Image is handled by multer middleware, so we don't validate it here
  // category: yup.string().optional(),
});

export const userSchema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),  
});