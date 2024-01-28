import { Router } from "express"; // Importing the Router from the Express library
import detailsController from "../controllers/detailsController.js"; // Importing the controller function for handling details

const deatilsRouter = Router(); // Creating a new instance of the Express Router

// Defining a route to handle GET requests for retrieving details based on ID
deatilsRouter.get("/:id", detailsController);

export default deatilsRouter; // Exporting the configured details router
