let express = require("express");
let DnaRoute = require("./routes/dnaRoute.js");

let app = express();
let dnaRoute = new DnaRoute();
// Middleware
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/", dnaRoute.getRouter());

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

module.exports = app;
