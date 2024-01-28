// Importing Yup for validation
import * as Yup from "yup";

// Validation schema for signup form
export const signupValidationSchema = Yup.object({
    fullName: Yup.string()
        .min(3, "Full name must be at least 3 characters long")
        .max(30, 'Full name must be at most 30 characters long')
        .required("Full name is required"),
    email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    password: Yup.string()
        .min(6, "Password must be at least 6 characters long")
        .required("Password is required"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Please re-enter the password"),
});

// Validation schema for login form
export const loginValidationSchema = Yup.object({
    email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    password: Yup.string().required("Password is required"),
});
