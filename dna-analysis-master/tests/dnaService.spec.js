const DnaService = require("../src/services/dnaService.js");
const sinon = require("sinon");
const Dna = require("../src/models/Dna.js");
const { assert } = require("chai");

const dnaService = new DnaService();
describe("DnaService", function () {
  describe("saveMutationData", function () {
    let save;

    beforeEach(() => {
      save = sinon
        .stub(Dna.prototype, "save")
        .returns(sinon.promise().resolve());
    });

    afterEach(function () {
      sinon.restore();
    });

    it("should call model save function", function () {
      const hasMutation = false;
      const dnaMatrix = [[]];
      dnaService.saveMutationData(dnaMatrix, hasMutation);
      sinon.assert.called(save);
    });
  });

  describe("getStats", function () {
    let count;

    beforeEach(() => {
      promise = sinon.promise();
      count = sinon.stub(Dna, "count").returns(promise);
    });

    afterEach(function () {
      sinon.restore();
    });

    it("should call model count and return 0 values if 0 was returned", async function () {
      const expected = {
        count_mutations: 0,
        count_no_mutation: 0,
        ratio: 0,
      };
      promise.resolve(0);
      const stats = await dnaService.getStats();
      sinon.assert.called(count);
      assert.deepEqual(stats, expected);
    });
    it("should call model count and return 1 values and 0.5 ratio if 1 was returned", async function () {
      const expected = {
        count_mutations: 1,
        count_no_mutation: 1,
        ratio: 0.5,
      };
      promise.resolve(1);
      const stats = await dnaService.getStats();
      sinon.assert.called(count);
      assert.deepEqual(stats, expected);
    });
  });
});
