import { Schema, model } from "mongoose";
import Movie from "./Movie.js"; // Importing the Movie model
import Series from "./Series.js"; // Importing the Series model

// Creating a Mongoose schema for bookmarks
const bookmarkSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User', // Reference to the User model
            required: true,
        },
        movies: [
            {
                movieId: {
                    type: Schema.Types.ObjectId,
                    ref: 'Movie', // Reference to the Movie model
                    required: true,
                },
                isBookmarked: {
                    type: Boolean,
                    default: true,
                },
                addedOn: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],
        series: [
            {
                seriesId: {
                    type: Schema.Types.ObjectId,
                    ref: 'Series', // Reference to the Series model
                    required: true,
                },
                isBookmarked: {
                    type: Boolean,
                    default: true,
                },
                addedOn: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],
    },
    {
        timestamps: true, // Adding timestamps for createdAt and updatedAt
    }
);

// Method to add a movie to the bookmark
bookmarkSchema.methods.addMovie = async function (movieId) {
    const movieExists = await Movie.findById(movieId);
    if (!movieExists) {
        throw new Error(`Movie with ID ${movieId} does not exist.`);
    }

    const existingMovie = this.movies.find((m) => m.movieId.equals(movieId));

    if (!existingMovie) {
        this.movies.push({ movieId });
        this.movies.sort((a, b) => b.addedOn - a.addedOn); // Sort movies after adding
    }
};

// Method to delete a movie from the bookmark
bookmarkSchema.methods.deleteMovie = function (movieId) {
    this.movies = this.movies.filter((m) => !m.movieId.equals(movieId));
    this.movies.sort((a, b) => b.addedOn - a.addedOn); // Sort movies after deletion
};

// Method to add a series to the bookmark
bookmarkSchema.methods.addSeries = async function (seriesId) {
    const seriesExists = await Series.findById(seriesId);
    if (!seriesExists) {
        throw new Error(`Series with ID ${seriesId} does not exist.`);
    }

    const existingSeries = this.series.find((s) => s.seriesId.equals(seriesId));

    if (!existingSeries) {
        this.series.push({ seriesId });
        this.series.sort((a, b) => b.addedOn - a.addedOn); // Sort series after adding
    }
};

// Method to delete a series from the bookmark
bookmarkSchema.methods.deleteSeries = function (seriesId) {
    this.series = this.series.filter((s) => !s.seriesId.equals(seriesId));
    this.series.sort((a, b) => b.addedOn - a.addedOn); // Sort series after deletion
};

// Creating a Mongoose model for bookmarks
const Bookmark = model('Bookmark', bookmarkSchema);

export default Bookmark;
