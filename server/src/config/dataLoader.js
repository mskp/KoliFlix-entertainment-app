// Import the database configuration
import "./dbConfig.js";

// Import models and data for Movies and Series
import Movies from "../models/Movie.js";
import movies from "../data/movies.json" assert { type: "json" };
import Series from '../models/Series.js';
import series from "../data/series.json" assert { type: "json" };

import { CHECK_MARK, CROSS_MARK } from './constants.js';

// Immediately-invoked function expression (IIFE) to insert data into the database
(async () => {
    try {
        // Insert movies data into the Movies collection
        await Movies.insertMany(movies);

        // Insert series data into the Series collection
        await Series.insertMany(series);

        // Log success message
        console.log(`${CHECK_MARK} Data inserted successfully`);

        // Exit the process with a success status code
        process.exit(0);
    } catch (error) {
        // Log error message with the specific error message
        console.error(`${CROSS_MARK} Data insertion failed - ${error.message}`);

        // Exit the process with a failure status code
        process.exit(1);
    }
})();
