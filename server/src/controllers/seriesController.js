import Bookmark from "../models/Bookmark.js";
import Series from "../models/Series.js";

// Controller for fetching all series with bookmark information for a user
export default async function seriesController(req, res) {
    try {
        // Extract user ID from the request
        const userId = req?.user?.id;

        // Find the bookmark for the given userId
        const userBookmarks = await Bookmark.findOne({ userId });

        // If no user bookmarks found, initialize with an empty array
        const userBookmarksData = userBookmarks || { series: [] };

        // Fetch all series and include bookmark information using aggregation
        const series = await Series.aggregate([
            {
                // Perform a lookup to connect series with bookmarks
                $lookup: {
                    from: "bookmarks",
                    localField: "_id",
                    foreignField: "series",
                    as: "bookmarks",
                },
            },
            {
                // Add a field to each series indicating whether it is bookmarked by the user
                $addFields: {
                    isBookmarked: {
                        $in: ["$_id", userBookmarksData.series.map(series => series.seriesId)],
                    },
                },
            },
        ]);

        // Respond with the list of series including bookmark information
        res.json(series);
    } catch (error) {
        console.log(error.message);
        res.sendStatus(500);
    }
}
