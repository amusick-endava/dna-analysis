const DnaController = require("../src/controllers/dnaController.js");
const MutationDetectorService = require("../src/services/mutationDetectorService.js");
const DnaService = require("../src/services/dnaService.js");
const sinon = require("sinon");

describe("DnaController", function () {
  describe("postMutation", function () {
    let req, status, send, res, hasMutation;

    beforeEach(() => {
      req = { body: { dna: [] } };
      status = sinon.stub();
      send = sinon.spy();
      res = { send: send, status: status };
      status.returns(res);
      hasMutation = sinon.stub(
        MutationDetectorService.prototype,
        "hasMutation"
      );
    });

    afterEach(function () {
      sinon.restore();
    });

    it("should return DNA has no mutation when hasMutation returns false", function () {
      hasMutation.returns(false);
      DnaController.postMutation(req, res);
      sinon.assert.calledWith(send, { message: "DNA has no mutation" });
    });

    it("should return DNA has a mutation when hasMutation returns true", function () {
      hasMutation.returns(true);
      DnaController.postMutation(req, res);
      sinon.assert.calledWith(send, { message: "DNA has a mutation" });
    });

    it("should return Request not properly formatted when body has no dna object", function () {
      hasMutation.returns(true);
      req.body.dna = undefined;
      DnaController.postMutation(req, res);
      sinon.assert.calledWith(send, "Request not properly formatted");
    });
  });

  describe("getStats", function () {
    let req, status, send, res, getStats;

    beforeEach(() => {
      req = {};
      status = sinon.stub();
      send = sinon.spy();
      res = { send: send, status: status };
      status.returns(res);
      getStats = sinon.stub(DnaService.prototype, "getStats");
    });

    afterEach(function () {
      sinon.restore();
    });

    it("should return stats returned by dna service", async function () {
      const fakeStats = { foo: 1, bar: 2 };
      getStats.returns(fakeStats);
      await DnaController.getStats(req, res);
      sinon.assert.called(send);
      sinon.assert.calledWith(send, sinon.match(fakeStats));
    });

    it("should return error message when an error is thrown", async function () {
      getStats.throws("mocked error", "THIS IS A FAKE ERROR");
      await DnaController.getStats(req, res);
      sinon.assert.called(send);
      sinon.assert.calledWith(send, "An error occurred while querying data");
    });
  });
});
