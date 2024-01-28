import User from "../models/User.js";

// Controller for handling user logout
export default async function logoutController(req, res) {
    try {
        // Extract the refresh token from the request cookies
        const refreshToken = req.cookies?.refreshToken;

        // If no refresh token is present, respond with No Content status (204)
        if (!refreshToken) {
            return res.sendStatus(204);
        }

        // Find the user associated with the provided refresh token
        const user = await User.findOne({ refreshTokens: { $in: [refreshToken] } });

        // If no user is found, clear the cookie and respond with No Content status (204)
        if (!user) {
            res.clearCookie('refreshToken', { httpOnly: true, secure: true, sameSite: "None" });
            return res.sendStatus(204);
        }

        // Remove the provided refresh token from the user's refreshTokens array
        await User.findOneAndUpdate(
            { _id: user._id },
            { $pull: { refreshTokens: refreshToken } },
            { new: true }
        );

        // Clear the cookie and respond with OK status (200)
        res.clearCookie('refreshToken', { httpOnly: true, secure: true, sameSite: "None" });
        res.sendStatus(200);
    } catch (error) {
        console.log(error.message);
        res.sendStatus(500);
    }
}
