# Koliflix - Explore movies and series

![Koliflix](https://koliflix.vercel.app/favicon.ico)

## Deployment URL

- **Front-End: <https://koliflix.vercel.app>**
- **Back-End: <https://koliflix-api.vercel.app>**

## Overview

Koliflix is a simple app designed to help you discover, bookmark, and search for your favorite movies and series. Its user-friendly interface allows easy navigation, and the practical search feature ensures you can quickly find and bookmark content. Built with simplicity in mind, Koliflix offers a straightforward experience for exploring and managing your entertainment preferences. Your bookmarks and preferences are securely stored, making Koliflix an uncomplicated and reliable choice for your movie and series enjoyment.


![Koliflix Pages](https://koliflix.vercel.app/pages.png)

### Features

- **Responsive UI**

  - Clean and responsive design for a seamless user experience.

- **Authentication**

  - Secure authentication system utilizing JWT access and refresh tokens, while safeguarding against XSS attacks through in-memory access-token storage.

- **Movies and Series Exploration**

  - Hassle-free exploration of a vast collection of movies and series.

- **Searching Functionality**

  - Convenient search bar for quick and easy content discovery.

- **Bookmark Functionality**

  - Users can add movies/series to bookmarks, securely stored in the database.

- **Proper Error Handling and Logging**
  - Comprehensive error handling for graceful recovery and detailed logging for efficient debugging and maintenance.

---

## Technologies Used

### Front-end

- **React.js:** Utilized React.js for building a dynamic and interactive user interface.

- **Tailwind CSS:** Employed Tailwind CSS for efficient and responsive designs.

- **Redux Toolkit:** Implemented Redux Toolkit for robust state management, ensuring a scalable and maintainable application structure.

- **RTK Query:** Leveraged RTK Query for streamlined and efficient data fetching.

### Back-end

- **Express.js:** Employed Express.js to create a robust and scalable RESTful API.

- **MongoDB:** Utilized MongoDB as the database to store and retrieve data, ensuring persistent and reliable data storage for the application.

---

## How to Run

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/mskp/KoliFlix-entertainment-app.git
   ```

2. **Install the dependencies:**

   ```bash
   # Install the dependencies of React App
   cd client && npm i
   # Install the dependencies of express API and insert the movies and series data into database
   cd server && npm i && npm run load-data
   ```

3. **Running the Project Locally:** Navigate to the project's root directory and run the following commands

   ```bash
   # Run the express server
   npm run server

   # Run the react server
   npm run client
   ```

   **OR**

   ```bash
   # Run both servers concurrently
   npm run both
   ```

**Upon Completion**

> The React development server will be accessible at http://localhost:3000.

> The Express server will be accessible at http://localhost:8000.

---

## API Documentation

Explore the API endpoints and understand how to interact with the entertainment app API.

> **Postman Documentation:** <https://documenter.getpostman.com/view/31476421/2s9YyqiMrc>

---

## Database Entity Relationship (ER) Diagram

![ER-Diagram](https://koliflix-db.netlify.app/db-ERD.png)

**Database Design:** <https://koliflix-db.netlify.app/>

---

## Developer Info

- **Name:** Sushant Pandey
- **GitHub:** <https://github.com/mskp>
- **LinkedIn:** <https://www.linkedin.com/in/mskp>
- **Website:** <https://sushant.fun>
- **All Links:** <https://linktr.ee/isushant>

---

## License

This repository is MIT licensed. [Read more](./LICENSE)

---
