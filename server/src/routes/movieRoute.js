import { Router } from "express"; // Importing the Router from the Express library
import movieController from "../controllers/movieController.js"; // Importing the controller function for handling movie-related requests

const movieRouter = Router(); // Creating a new instance of the Express Router

// Defining a route to handle GET requests for retrieving movies
movieRouter.get("/", movieController);

export default movieRouter; // Exporting the configured movie router
