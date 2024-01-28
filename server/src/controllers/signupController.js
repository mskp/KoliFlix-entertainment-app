import bcrypt from "bcrypt";
import User from "../models/User.js";
import Joi from "joi";

// Validation schema using Joi
const validationSchema = Joi.object({
    fullName: Joi.string()
        .min(3)
        .max(30)
        .required(),

    email: Joi.string()
        .email()
        .required(),

    password: Joi.string()
        .min(6)
        .required(),
});

// Controller for handling user signup
export default async function signUpController(req, res) {
    try {
        // Validate the request body against the defined schema
        const { error, value } = validationSchema.validate(req.body);

        // Check for validation errors
        if (error) return res.status(400).json({ message: error.details[0].message });

        // Extract fullName, email, and password from the validated request body
        const { fullName, email, password } = value;

        // Check if the email already exists in the database
        const emailExists = await User.findOne({ email });
        if (emailExists) return res.status(409).json({ message: "Email already exists" });

        // Hash the password before saving it to the database
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user instance using the User model
        const newUser = new User({
            fullName,
            email,
            password: hashedPassword
        });

        // Save the new user to the database
        await newUser.save();

        // Respond with a success message
        res.status(201).json({ message: "Account created successfully" });
    } catch (error) {
        // Handle unexpected errors and log them
        console.log(error.message);
        res.status(500).json({ message: "Some error occured on server" });
    }
}
