import { Schema, model } from "mongoose";

// Creating a Mongoose schema for users
const userSchema = new Schema({
	fullName: {
		type: String,
		required: true, // fullName is a required field
	},
	email: {
		type: String,
		required: true,
		unique: true, // Each email must be unique
	},
	password: {
		type: String,
		required: true, // password is a required field
	},
	refreshTokens: {
		type: [String], // Array to store refresh tokens associated with the user
		required: true,
	},
}, {
	timestamps: true, // Adding timestamps for createdAt and updatedAt
});

// Creating a Mongoose model for users
const User = model('User', userSchema);

export default User;
