const { connectDB } = require("./mongoose");

const port = process.env.PORT || 3000;

// Start the MongoDB connection
connectDB()
  .then(() => {
    // Start development server if mongodb connection successful
    const app = require("./app");
    app.listen(port, () => {
      console.log("Server started on port 3000");
    });
  })
  .catch((error) => {
    console.error("Error starting MongoDB connection:", error, "exiting");
  });
