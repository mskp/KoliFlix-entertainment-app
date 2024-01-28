import { Schema, model } from "mongoose";

const seriesSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    thumbnailURL: {
        type: String,
        required: true
    },
    genres: {
        type: [String],
        required: true
    },
    overview: {
        type: String,
        required: true
    },
    casts: {
        type: [String],
        required: true
    },
    languages: {
        type: [String],
        required: true
    },
    isRecommended: {
        type: Boolean,
        required: true,
        default: false
    },
    isTrending: {
        type: Boolean,
        required: true,
        default: false
    },
    releaseYear: {
        type: Number,
        required: true
    },
    rating: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    }
});

const Series = model('Series', seriesSchema);

export default Series;
