const DnaService = require("../services/dnaService.js");
const MutationDetectorService = require("../services/mutationDetectorService.js");

class DnaController {
  static postMutation(req, res) {
    const mutationDetectorService = new MutationDetectorService();
    const dnaService = new DnaService();
    const dnaMatrix = req.body.dna;
    if (req.body.dna) {
      const hasMutation = mutationDetectorService.hasMutation(dnaMatrix);
      const message = hasMutation
        ? "DNA has a mutation"
        : "DNA has no mutation";
      try {
        dnaService.saveMutationData(dnaMatrix, hasMutation);
        if (hasMutation) {
          res.status(200).send({ message });
        } else {
          res.status(403).send({ message });
        }
      } catch {
        // TODO:: 1) Do we really need the error messaging in this case? 2) if so, we should add await
        console.error("Error saving mutation data:", error);
        res
          .status(500)
          .send({
            message: `${message}; Then an error occurred while saving mutation data`,
          });
      }
    } else {
      res.status(400).send("Request not properly formatted");
    }
  }

  static async getStats(req, res) {
    const dnaService = new DnaService();

    try {
      const stats = await dnaService.getStats();
      res.status(200).send(stats);
    } catch (error) {
      console.error("Error while querying data:", error);
      res.status(500).send("An error occurred while querying data");
    }
  }
}

module.exports = DnaController;
