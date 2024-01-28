import Bookmark from "../models/Bookmark.js";
import Movie from "../models/Movie.js";
import Series from "../models/Series.js";

// Controller to get bookmarks for a user
export async function getBookmarksController(req, res) {
    try {
        const userId = req?.user?.id;
        if (!userId) return res.sendStatus(401);

        // Find the bookmark associated with the user
        const bookmark = await Bookmark.findOne({ userId });

        // Create a new empty bookmark if not found
        if (!bookmark)
            await new Bookmark({ userId, movies: [], series: [] }).save();

        // Extract movie and series IDs from the bookmark
        const movieIds = bookmark.movies;
        const seriesIds = bookmark.series;

        // Fetch movies and series using the extracted IDs
        const movies = await Movie.find({ _id: { $in: movieIds.map(movie => movie.movieId) } }).lean();
        const series = await Series.find({ _id: { $in: seriesIds.map(series => series.seriesId) } }).lean();

        // Add 'isBookmarked' property to each movie and series
        const moviesWithBookmark = movies.map((movie) => ({
            ...movie,
            isBookmarked: true,
        }));
        const seriesWithBookmark = series.map((series) => ({
            ...series,
            isBookmarked: true,
        }));

        res.json({ movies: moviesWithBookmark, series: seriesWithBookmark });
    } catch (error) {
        console.log(error.message);
        res.sendStatus(500);
    }
}

// Controller to add a movie or series to bookmarks
export async function addBookmarkController(req, res) {
    try {
        const userId = req?.user?.id;
        if (!userId) return res.sendStatus(401);
        const { movie, series } = req.body;

        if (!movie && !series) return res.sendStatus(400);

        // Find the bookmark associated with the user or create a new one
        const bookmark = await Bookmark.findOne({ userId }) ?? new Bookmark({ userId });

        if (movie) {
            await bookmark.addMovie(movie);
        } else if (series) {
            await bookmark.addSeries(series);
        }

        // Save the updated bookmark and respond with Success (200) status 
        await bookmark.save();
        res.sendStatus(200);
    } catch (error) {
        console.error(error.message);
        res.sendStatus(500);
    }
}

// Controller to delete a movie or series from bookmarks
export async function deleteBookmarkController(req, res) {
    try {
        const userId = req?.user?.id;
        if (!userId) return res.status(401).json({ message: "Unauthorized" });
        const { movie, series } = req.body;

        if (!movie && !series) return res.sendStatus(400);

        // Find the bookmark associated with the user
        const bookmark = await Bookmark.findOne({ userId });

        if (!bookmark) return res.status(404).json({ message: "No bookmarks found" });


        // Delete movie or series from the bookmark
        if (movie) {
            await bookmark.deleteMovie(movie);
        } else if (series) {
            await bookmark.deleteSeries(series);
        }

        // Save the updated bookmark and respond with Success (200) status
        await bookmark.save();
        return res.sendStatus(200);
    } catch (error) {
        console.error(error.message);
        res.sendStatus(500);
    }
}