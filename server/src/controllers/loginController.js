import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import {
    ACCESS_TOKEN_EXPIRATION_TIME,
    ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_EXPIRATION_TIME,
    REFRESH_TOKEN_SECRET
} from "../config/constants.js";
import Joi from "joi";

// Validation schema using Joi
const validationSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.email': 'Invalid email address',
        'any.required': 'Email is required',
    }),
    password: Joi.string().required().messages({
        'any.required': 'Password is required',
    }),
});
// Controller for handling user login
export default async function loginController(req, res) {
    try {
        // Validate the request body against the defined schema
        const { error, value } = validationSchema.validate(req.body);

        // Check for validation errors
        if (error) return res.status(400).json({ message: error.details[0].message });

        // Extract email and password from the validated request body
        const { email, password } = value;

        // Find the user by email
        const user = await User.findOne({ email });

        // If user not found, respond with Unauthorized status
        if (!user) return res.status(401).json({ message: "Invalid credentials" });

        // Compare the provided password with the hashed password in the database
        const validPassword = await bcrypt.compare(password, user.password);

        // If password is not valid, respond with Unauthorized status
        if (!validPassword) return res.status(401).json({ message: "Invalid email or password" });

        // Generate an access token with user's ID
        const accessToken = jwt.sign(
            { id: user._id },
            ACCESS_TOKEN_SECRET,
            { expiresIn: ACCESS_TOKEN_EXPIRATION_TIME }
        );

        // Generate a refresh token with user's ID
        const refreshToken = jwt.sign(
            { id: user._id },
            REFRESH_TOKEN_SECRET,
            { expiresIn: REFRESH_TOKEN_EXPIRATION_TIME }
        );

        // Update the user document in the database to include the new refresh token
        await User.updateOne({ _id: user._id }, { $push: { refreshTokens: refreshToken } });

        // Set the refresh token as an HTTP-only cookie with expiration of 10 days
        const tenDaysInMillis = 10 * 24 * 60 * 60 * 1000;
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: tenDaysInMillis
        });

        // Respond with the access token
        res.json({ accessToken });
    } catch (error) {
        // Handle unexpected errors and log them
        console.log(error.message);
        res.status(500).json({ message: "Some error occured on server" });
    }
}
