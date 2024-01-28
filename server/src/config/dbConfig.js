// Import the mongoose library for MongoDB interactions
import mongoose from "mongoose";

// Import constants for check mark and cross mark symbols, and the database URI
import { CHECK_MARK, CROSS_MARK, DATABASE_URI } from "./constants.js";

// Immediately-invoked function expression (IIFE) to connect to the MongoDB database
(async () => {
    try {
        // Attempt to establish a connection to the MongoDB database using the provided URI
        await mongoose.connect(DATABASE_URI);

        // Log success message upon successful connection
        console.log(`${CHECK_MARK} Connected to database`);
    } catch (error) {
        // Log error message with the specific error message if connection fails
        console.error(`${CROSS_MARK} Database connection failed - ${error.message}`);

        // Exit the process with a failure status code
        process.exit(1);
    }
})();
