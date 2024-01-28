// Importing the API slice to inject bookmark endpoints
import { apiSlice } from "./apiSlice";

// Injecting bookmark endpoints into the existing API slice
const bookmarkApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Defining a mutation endpoint to add to bookmarks
        addToBookmark: builder.mutation({
            query: (data) => ({
                url: "/bookmark",
                method: "POST",
                body: data
            }),
            // Invalidating the "data" tag to trigger refetching after mutation
            invalidatesTags: ["data"]
        }),

        // Defining a mutation endpoint to remove from bookmarks
        removeFromBookmark: builder.mutation({
            query: (data) => ({
                url: "/bookmark",
                method: "DELETE",
                body: data
            }),
            // Invalidating the "data" tag to trigger refetching after mutation
            invalidatesTags: ["data"]
        }),
    })
});

// Extracting generated hooks for each bookmark mutation endpoint
export const {
    useAddToBookmarkMutation,
    useRemoveFromBookmarkMutation
} = bookmarkApi;
