// Constants for check mark and cross mark symbols
export const CHECK_MARK = "\x1b[32m\u2713\x1b[0m";
export const CROSS_MARK = "\x1b[31m\u2717\x1b[0m";

// Database URI, defaults to a local MongoDB instance if not provided through environment variables
export const DATABASE_URI = process.env.DATABASE_URI ?? "mongodb://127.0.0.1:27017/entertainmentApp";

// Access token and refresh token secrets, with default values if not provided through environment variables
export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET ?? "2c9020d44b2719c4687a30e7f44f3bd";
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET ?? "df5c88d863a00a2b7b775404f2cb6e5";

// Token expiration times for access and refresh tokens, with default values if not provided through environment variables
export const ACCESS_TOKEN_EXPIRATION_TIME = process.env.ACCESS_TOKEN_EXPIRATION_TIME ?? "30m";
export const REFRESH_TOKEN_EXPIRATION_TIME = process.env.REFRESH_TOKEN_EXPIRATION_TIME ?? "10d";

// Port number for the server, defaults to 8000 if not provided through environment variables
export const PORT = process.env.PORT ?? 8000;

// Allowed origins for CORS, retrieved from environment variables and defaulting to localhost:3000
const allowedOrigins = process.env.ALLOWED_ORIGIN.split(",") ?? ['http://localhost:3000'];

// CORS options specifying allowed origins, methods, credentials, and options success status
export const CORS_OPTIONS = {
  origin: function (origin, callback) {
    // Check if the request origin is allowed, otherwise, raise an error
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('This origin is not allowed by CORS'));
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};
