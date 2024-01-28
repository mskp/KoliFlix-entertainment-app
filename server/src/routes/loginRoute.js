import { Router } from "express"; // Importing the Router from the Express library
import loginController from "../controllers/loginController.js"; // Importing the controller function for handling login

const loginRouter = Router(); // Creating a new instance of the Express Router

// Defining a route to handle POST requests for user login
loginRouter.post("/", loginController);

export default loginRouter; // Exporting the configured login router
