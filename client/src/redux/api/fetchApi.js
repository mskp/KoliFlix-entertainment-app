// Importing the API slice to inject fetch-related endpoints
import { apiSlice } from "./apiSlice";

// Injecting fetch-related endpoints into the existing API slice
const fetchApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Defining a query endpoint to fetch featured data
        fetchFeatured: builder.query({
            query: () => ({ url: "/featured" }),
            // Providing the "data" tag to enable caching and refetching
            providesTags: ["data"]
        }),

        // Defining a query endpoint to fetch movies data
        fetchMovies: builder.query({
            query: () => ({ url: "/movies" }),
            // Providing the "data" tag to enable caching and refetching
            providesTags: ["data"]
        }),

        // Defining a query endpoint to fetch series data
        fetchSeries: builder.query({
            query: () => ({ url: "/series" }),
            // Providing the "data" tag to enable caching and refetching
            providesTags: ["data"]
        }),

        // Defining a query endpoint to fetch bookmarks data
        fetchBookmarks: builder.query({
            query: () => ({ url: "/bookmark" }),
            // Providing the "data" tag to enable caching and refetching
            providesTags: ["data"]
        }),

        // Defining a query endpoint to fetch details data
        fetchDetails: builder.query({
            query: ({ paramId }) => ({ url: `/detail/${paramId}` })
        })
    })
});

// Extracting generated hooks for each fetch-related query endpoint
export const {
    useFetchBookmarksQuery,
    useFetchMoviesQuery,
    useFetchSeriesQuery,
    useFetchFeaturedQuery,
    useFetchDetailsQuery
} = fetchApi;
