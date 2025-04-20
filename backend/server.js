const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./db");

const app = express();
const port = 5000;

// Connect to DB
connectDB();

// Middleware
app.use(cors());              // CORS middleware
app.use(express.json());      // JSON parsing middleware

// Serve static files from the 'uploads' folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Example route to confirm the API is running
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Routes
const bookRoutes = require("./routes/bookRoutes");
app.use("/api/books", bookRoutes);

const authRoute = require('./routes/users');
app.use('/api/users', authRoute);

// Start the server
app.listen(port, () => {
  console.log(`✅ Backend running on http://localhost:${port}`);
});
