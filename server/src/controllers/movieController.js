import Movie from "../models/Movie.js";
import Bookmark from "../models/Bookmark.js";

// Controller for fetching all movies with bookmark information for a user
export default async function movieController(req, res) {
    try {
        // Extract user ID from the request
        const userId = req?.user?.id;

        // Find the bookmark for the given userId
        const userBookmarks = await Bookmark.findOne({ userId });

        // If no user bookmarks found, initialize with an empty array
        const userBookmarksData = userBookmarks || { movies: [] };

        // Fetch all movies and include bookmark information using aggregation
        const movies = await Movie.aggregate([
            {
                // Perform a lookup to connect movies with bookmarks
                $lookup: {
                    from: "bookmarks",
                    localField: "_id",
                    foreignField: "movies",
                    as: "bookmarks",
                },
            },
            {
                // Add a field to each movie indicating whether it is bookmarked by the user
                $addFields: {
                    isBookmarked: {
                        $in: ["$_id", userBookmarksData.movies.map(movie => movie.movieId)],
                    },
                },
            },
        ]);

        // Respond with the list of movies including bookmark information
        res.json(movies);
    } catch (error) {
        console.log(error.message);
        res.sendStatus(500);
    }
}
