import Movie from "../models/Movie.js";
import Series from "../models/Series.js";
import mongoose from "mongoose";

// Controller to get details of a movie or series by ID
export default async function detailsController(req, res) {
    try {
        const id = req.params.id;

        // Check if the id is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid ID" });
        }

        // Try to find the details in the Movie collection
        const movieDetails = await Movie.findOne({ _id: id });

        // If details are found in the Movie collection, respond with the details
        if (movieDetails) return res.json(movieDetails);

        // If not found in Movie collection, try finding in the Series collection
        const seriesDetails = await Series.findOne({ _id: id });

        // If details are found in the Series collection, respond with the details
        if (seriesDetails) return res.json(seriesDetails);

        // If no details found in both Movie and Series collections, return Forbidden (403) status
        res.status(404).json({ message: "No details found" });
    } catch (error) {
        console.log(error.message);
        res.sendStatus(500);
    }
}
