import { Router } from "express"; // Importing the Router from the Express library
import signupController from "../controllers/signupController.js"; // Importing the controller function for handling signup requests

const signupRouter = Router(); // Creating a new instance of the Express Router

// Defining a route to handle POST requests for user signup
signupRouter.post("/", signupController);

export default signupRouter; // Exporting the configured signup router
