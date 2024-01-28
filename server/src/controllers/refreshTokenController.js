import {
    ACCESS_TOKEN_EXPIRATION_TIME,
    ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET
} from "../config/constants.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

// Controller for refreshing access tokens using a refresh token
export default async function refreshTokenController(req, res) {
    try {
        // Extract the refresh token from the request cookies
        const refreshToken = req.cookies?.refreshToken;

        // If no refresh token is present, respond with No Content status (204)
        if (!refreshToken) {
            return res.sendStatus(204);
        }

        // Find the user associated with the provided refresh token
        const user = await User.findOne({ refreshTokens: { $in: [refreshToken] } });

        // If no user is found, respond with Forbidden status (403)
        if (!user) {
            return res.sendStatus(403);
        }

        // Verify the refresh token against the secret key and user ID
        jwt.verify(
            refreshToken,
            REFRESH_TOKEN_SECRET,
            (error, decoded) => {
                // If there's an error or the user ID in the token doesn't match the user's ID, respond with Forbidden status (403)
                if (error || !user._id.equals(decoded.id)) {
                    return res.sendStatus(403);
                }

                // Generate a new access token for the user
                const accessToken = jwt.sign(
                    { id: user._id },
                    ACCESS_TOKEN_SECRET,
                    { expiresIn: ACCESS_TOKEN_EXPIRATION_TIME }
                );

                // Respond with the new access token
                res.json({ accessToken });
            }
        );
    } catch (error) {
        console.error(error.message);
        res.sendStatus(500);
    }
}
