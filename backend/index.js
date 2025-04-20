//const connectToMongo = require('./db');
connectToMongo();

const path = require("path");

const express = require('express');
const cors = require('cors');

const app = express(); // ✅ Moved this here
const port = 5000;

app.use(cors());
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.get('/uploads/*', (req, res) => {
  console.log(`Image request: ${req.url}`);
  res.sendStatus(200);  // or just return an empty response
});





const bookRoutes = require("./routes/bookRoutes");
app.use("/api/books", bookRoutes);

const authRoute = require('./routes/users');
app.use('/api/users', authRoute);


app.listen(port, () => {
  console.log(`✅ Backend running on http://localhost:${port}`);
});
