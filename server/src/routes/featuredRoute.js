import { Router } from "express"; // Importing the Router from the Express library
import featuredController from "../controllers/featuredController.js"; // Importing the controller function for handling featured content

const featuredRouter = Router(); // Creating a new instance of the Express Router

// Defining a route to handle GET requests for retrieving featured content
featuredRouter.get("/", featuredController);

export default featuredRouter; // Exporting the configured featured content router
