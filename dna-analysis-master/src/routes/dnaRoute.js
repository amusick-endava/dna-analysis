let express = require("express");
let DnaController = require("../controllers/dnaController.js");

class DnaRoute {
  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post("/mutation", DnaController.postMutation);
    this.router.get("/stats", DnaController.getStats);
  }

  getRouter() {
    return this.router;
  }
}

module.exports = DnaRoute;
