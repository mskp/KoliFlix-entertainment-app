import { Router } from "express"; // Importing the Router from the Express library
import logoutController from "../controllers/logoutController.js"; // Importing the controller function for handling logout

const logoutRouter = Router(); // Creating a new instance of the Express Router

// Defining a route to handle POST requests for user logout
logoutRouter.post("/", logoutController);

export default logoutRouter; // Exporting the configured logout router
