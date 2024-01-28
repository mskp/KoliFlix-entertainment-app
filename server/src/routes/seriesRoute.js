import { Router } from "express"; // Importing the Router from the Express library
import seriesController from "../controllers/seriesController.js"; // Importing the controller function for handling series-related requests

const seriesRouter = Router(); // Creating a new instance of the Express Router

// Defining a route to handle GET requests for retrieving series
seriesRouter.get("/", seriesController);

export default seriesRouter; // Exporting the configured series router
