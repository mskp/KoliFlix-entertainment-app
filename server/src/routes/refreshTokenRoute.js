import { Router } from "express"; // Importing the Router from the Express library
import refreshTokenController from "../controllers/refreshTokenController.js"; // Importing the controller function for handling refresh token requests

const refreshTokenRouter = Router(); // Creating a new instance of the Express Router

// Defining a route to handle POST requests for refreshing authentication tokens
refreshTokenRouter.post("/", refreshTokenController);

export default refreshTokenRouter; // Exporting the configured refresh token router
