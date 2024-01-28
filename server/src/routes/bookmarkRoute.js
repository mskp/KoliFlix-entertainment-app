import { Router } from "express"; // Importing the Router from the Express library
import {
  addBookmarkController,
  deleteBookmarkController,
  getBookmarksController
} from "../controllers/bookmarkController.js"; // Importing controller functions for bookmark operations

const bookmarkRouter = Router(); // Creating a new instance of the Express Router

// Defining routes for bookmark operations
bookmarkRouter.route("/")
  .get(getBookmarksController) // Handling GET request to retrieve bookmarks
  .post(addBookmarkController) // Handling POST request to add a bookmark
  .delete(deleteBookmarkController); // Handling DELETE request to remove a bookmark

export default bookmarkRouter; // Exporting the configured bookmark router
