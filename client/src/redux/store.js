// Importing necessary functions and modules from Redux Toolkit and the API slice
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import modalReducer from "./slices/modalSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { apiSlice } from "./api/apiSlice";

// Configuring the Redux store
const store = configureStore({
    // Combining reducers for different slices of the state
    reducer: {
        auth: authReducer,
        modal: modalReducer,
        [apiSlice.reducerPath]: apiSlice.reducer, // Reducer for the API slice
    },
    // Adding middleware, including middleware for handling API calls
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
});

// Setting up listeners for API slice actions
setupListeners(store.dispatch);

// Exporting the configured Redux store as the default export
export default store;
