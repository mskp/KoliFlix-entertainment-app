import app from "./app.js"; // Importing the Express application instance from the app module
import { CHECK_MARK, PORT } from "./config/constants.js"; // Importing constants for check mark symbol and port number

// Listening for incoming HTTP requests on the specified port
app.listen(PORT, () => {
    console.log(`${CHECK_MARK} Server Listening on port ${PORT}`); // Logging a message when the server starts successfully
});
