import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET } from "../config/constants.js";

// Middleware to check if the request has a valid token
export default function verifyToken(req, res, next) {
    // Extracting the 'authorization' header from the request
    const authHeader = req.header("authorization");

    // If 'authorization' header is not present, sending an Unauthorized (401) response
    if (!authHeader) return res.sendStatus(401);

    // Extracting the token from the 'authorization' header
    const token = authHeader.split(" ")[1];

    // Verifying the token against the secret key
    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, decoded) => {
        // If there's an error or the token is invalid, sending an Forbidden (403) response
        if (err) return res.status(403).json({ message: "Invalid access token" });

        // If the token is valid, attaching the decoded user information to the request object
        req.user = decoded;

        // Passing control to the next route handler
        next();
    });
}
