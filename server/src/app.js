// Importing necessary modules
import express from "express"; // Express.js for handling HTTP requests
import cors from "cors"; // CORS middleware for handling cross-origin resource sharing
import cookieParser from "cookie-parser"; // Middleware for parsing cookies
import verifyToken from "./middlewares/verifyToken.js"; // Custom middleware for token verification
import { CORS_OPTIONS } from "./config/constants.js"; // Importing CORS_OPTIONS from constants file
import "./config/dbConfig.js"; // Importing database configuration

// Importing Routers
import signupRouter from "./routes/signupRoute.js";
import loginRouter from "./routes/loginRoute.js";
import refreshTokenRouter from "./routes/refreshTokenRoute.js";
import movieRouter from "./routes/movieRoute.js";
import seriesRouter from "./routes/seriesRoute.js";
import bookmarkRouter from "./routes/bookmarkRoute.js";
import logoutRouter from "./routes/logoutRoute.js";
import featuredRouter from "./routes/featuredRoute.js";
import deatilsRouter from "./routes/detailsRoute.js";

const app = express(); // Creating an instance of Express application

// Middlewares
app.use(express.json()); // Parsing incoming request bodies in JSON format
app.use(cookieParser()); // Parsing cookies from incoming requests
app.use(cors(CORS_OPTIONS)); // Configuring CORS with options from constants

// Public Routes
app.use("/api/login", loginRouter); // Handling login requests
app.use("/api/signup", signupRouter); // Handling signup requests
app.use("/api/refresh", refreshTokenRouter); // Handling token refresh requests
app.use("/api/logout", logoutRouter); // Handling logout requests

app.use(verifyToken); // Applying token verification middleware for subsequent routes

// Protected Routes
app.use("/api/movies", movieRouter); // Handling movie-related requests
app.use("/api/series", seriesRouter); // Handling series-related requests
app.use("/api/bookmark", bookmarkRouter); // Handling bookmark-related requests
app.use("/api/featured", featuredRouter); // Handling featured content requests
app.use("/api/detail", deatilsRouter); // Handling detailed information requests

export default app; // Exporting the configured Express app
