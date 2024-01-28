import Movie from "../models/Movie.js";
import Series from "../models/Series.js";
import Bookmark from "../models/Bookmark.js";

// Controller to fetch featured content, combining recommended and trending items with user bookmarks
export default async function featuredController(req, res) {
    try {
        const userId = req?.user?.id;

        // Find the bookmark for the given userId
        const userBookmarks = await Bookmark.findOne({ userId });

        // Fetch recommended movies and series
        const recommendedMovies = await Movie.find({ isRecommended: true });
        const recommendedSeries = await Series.find({ isRecommended: true });

        // Fetch trending movies and series
        const trendingMovies = await Movie.find({ isTrending: true });
        const trendingSeries = await Series.find({ isTrending: true });

        // Combine movies and series in recommended and trending arrays
        const recommended = [...recommendedMovies, ...recommendedSeries];
        const trending = [...trendingMovies, ...trendingSeries];

        // Add isBookmarked field to each item based on user bookmarks
        const userMovieIds = userBookmarks?.movies.map(movie => String(movie.movieId)) || [];
        const userSeriesIds = userBookmarks?.series.map(series => String(series.seriesId)) || [];

        // Create new arrays with added isBookmarked property
        const recommendedWithBookmarks = recommended.map(item => ({
            ...item.toObject(), // Convert Mongoose document to plain JavaScript object
            isBookmarked: (
                (item.type === 'movie' && userMovieIds.includes(String(item._id))) ||
                (item.type === 'series' && userSeriesIds.includes(String(item._id)))
            ),
        }));

        const trendingWithBookmarks = trending.map(item => ({
            ...item.toObject(), // Convert Mongoose document to plain JavaScript object
            isBookmarked: (
                (item.type === 'movie' && userMovieIds.includes(String(item._id))) ||
                (item.type === 'series' && userSeriesIds.includes(String(item._id)))
            ),
        }));

        // Respond with the combined arrays of recommended and trending items along with isBookmarked property
        res.json({
            recommended: recommendedWithBookmarks,
            trending: trendingWithBookmarks,
        });
    } catch (error) {
        console.error(error.message);
        res.sendStatus(500);
    }
}
