// Importing necessary functions and modules from Redux Toolkit Query
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Defining the server URL using the environment variable or a default local URL
const SERVER_URL = import.meta.env.VITE_SERVER_URL ?? "http://localhost:8000";

// Creating a base query with common settings for all API endpoints
const baseQuery = fetchBaseQuery({
    // Base URL for API requests
    baseUrl: `${SERVER_URL}/api`,
    // Including credentials with the requests
    credentials: "include",

    // Preparing headers for each request
    prepareHeaders: (headers, { getState }) => {
        // Getting the access token from the authentication state
        const accessToken = getState().auth?.accessToken;

        // If an access token exists, adding it to the Authorization header
        if (accessToken)
            headers.set("Authorization", `Bearer ${accessToken}`);

        // Returning the modified headers
        return headers;
    }
});

// Creating the API slice using createApi
export const apiSlice = createApi({
    // Configuring the base query for all endpoints
    baseQuery,
    // Defining tag types for the API (e.g., 'data', 'error', 'baseQuery')
    tagTypes: ['data'],

    // Defining endpoints (currently empty, to be expanded as needed)
    endpoints: builder => ({})
});
