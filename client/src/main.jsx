// Importing React and ReactDOM from the appropriate modules
import React from "react";
import ReactDOM from "react-dom/client";

// Importing global styles for the application
import "./assets/globals.css";

// Importing the main App component
import App from "./App";

// Importing Redux Provider and the Redux store
import { Provider } from "react-redux";
import store from "./redux/store";

// Creating a root using ReactDOM.createRoot and rendering the App component
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // Wrapping the App component with StrictMode for additional development checks
  <React.StrictMode>
    {/* Providing the Redux store to the entire application using Provider */}
    <Provider store={store}>
      {/* Rendering the main App component */}
      <App />
    </Provider>
  </React.StrictMode>,
);
