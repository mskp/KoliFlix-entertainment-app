// Importing the API slice to inject authentication endpoints
import { apiSlice } from './apiSlice';

// Injecting authentication endpoints into the existing API slice
export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Defining a login mutation endpoint
        login: builder.mutation({
            query: (data) => ({
                url: '/login',
                method: 'POST',
                body: data,
            }),
        }),
        // Defining a signup mutation endpoint
        signup: builder.mutation({
            query: (data) => ({
                url: '/signup',
                method: 'POST',
                body: data,
            }),
        }),
        // Defining a logout mutation endpoint
        logout: builder.mutation({
            query: () => ({
                url: "/logout",
                method: "POST"
            })
        })
    }),
});

// Extracting generated hooks for each authentication endpoint
export const {
    useLoginMutation,
    useSignupMutation,
    useLogoutMutation
} = authApi;
