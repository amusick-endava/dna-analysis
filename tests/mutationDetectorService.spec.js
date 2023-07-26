let MutationDetectorService = require("../src/services/mutationDetectorService.js");
let assert = require("assert");

let mutationDetectorService = new MutationDetectorService();
describe("MutationDetectorService", function () {
  describe("hasMutation", function () {
    it("should return true when there is a mutation", function () {
      let mutatedDna = [
        "ATGCGA",
        "CAGTGC",
        "TTATGT",
        "AGAAGG",
        "CCCCTA",
        "TCACTG",
      ];
      let res = mutationDetectorService.hasMutation(mutatedDna);
      assert.equal(res, true);
    });

    it("should return false when there is not a mutation", function () {
      let notMutatedDna = [
        "ATGCGA",
        "CAGTGC",
        "TTATTT",
        "AGACGG",
        "GCGTCA",
        "TCACTG",
      ];
      let res = mutationDetectorService.hasMutation(notMutatedDna);
      assert.equal(res, false);
    });
  });

  describe("hasHorizontalMutation", function () {
    describe("when horizontalLetter is a match and original count is 2 or less", function () {
      it("should increase match count by one and return undefined", function () {
        let originalCount = 0;
        let mutatedDna = [
          "AAAAA",
          "CAGTGC",
          "TTATGT",
          "AGAAGG",
          "CCCCTA",
          "TCACTG",
        ];
        let mem = { horizontalLetter: "A", horizontalCount: originalCount };
        let i = (j = 0);
        let res = mutationDetectorService.hasHorizontalMutation(
          mutatedDna,
          mem,
          i,
          j
        );
        assert.equal(res, undefined);
        assert.equal(mem.horizontalCount, originalCount + 1);
      });
    });

    describe("when horizontalLetter is a match and original count is 3", function () {
      it("should increase match count by one and return true", function () {
        let originalCount = 3;
        let mutatedDna = [
          "AAAAA",
          "CAGTGC",
          "TTATGT",
          "AGAAGG",
          "CCCCTA",
          "TCACTG",
        ];
        let mem = { horizontalLetter: "A", horizontalCount: originalCount };
        let i = (j = 0);
        let res = mutationDetectorService.hasHorizontalMutation(
          mutatedDna,
          mem,
          i,
          j
        );
        assert.equal(res, true);
        assert.equal(mem.horizontalCount, originalCount + 1);
      });
    });

    describe("when horizontalLetter is not a match", function () {
      it("should reset horizontalCount to 0 and return undefined", function () {
        let mutatedDna = [
          "AAAAA",
          "CAGTGC",
          "TTATGT",
          "AGAAGG",
          "CCCCTA",
          "TCACTG",
        ];
        let mem = { horizontalLetter: "C", horizontalCount: 2 };
        let i = (j = 0);
        let res = mutationDetectorService.hasHorizontalMutation(
          mutatedDna,
          mem,
          i,
          j
        );
        assert.equal(res, undefined);
        assert.equal(mem.horizontalCount, 0);
      });
    });
  });

  describe("hasVerticalMutation", function () {
    describe("when verticalLetter is a match and original count is 2 or less", function () {
      it("should increase match count by one and return undefined", function () {
        let originalCount = 0;
        let mutatedDna = [
          "AAAAA",
          "CAGTGC",
          "TTATGT",
          "AGAAGG",
          "CCCCTA",
          "TCACTG",
        ];
        let mem = { verticalLetter: "A", verticalCount: originalCount };
        let i = (j = 0);
        let res = mutationDetectorService.hasVerticalMutation(
          mutatedDna,
          mem,
          i,
          j
        );
        assert.equal(res, undefined);
        assert.equal(mem.verticalCount, originalCount + 1);
      });
    });

    describe("when verticalLetter is a match and original count is 3", function () {
      it("should increase match count by one and return true", function () {
        let originalCount = 3;
        let mutatedDna = [
          "AAAAA",
          "CAGTGC",
          "TTATGT",
          "AGAAGG",
          "CCCCTA",
          "TCACTG",
        ];
        let mem = { verticalLetter: "A", verticalCount: originalCount };
        let i = (j = 0);
        let res = mutationDetectorService.hasVerticalMutation(
          mutatedDna,
          mem,
          i,
          j
        );
        assert.equal(res, true);
        assert.equal(mem.verticalCount, originalCount + 1);
      });
    });

    describe("when verticalLetter is not a match", function () {
      it("should reset verticalCount to 0 and return undefined", function () {
        let mutatedDna = [
          "AAAAA",
          "CAGTGC",
          "TTATGT",
          "AGAAGG",
          "CCCCTA",
          "TCACTG",
        ];
        let mem = { verticalLetter: "C", verticalCount: 2 };
        let i = (j = 0);
        let res = mutationDetectorService.hasVerticalMutation(
          mutatedDna,
          mem,
          i,
          j
        );
        assert.equal(res, undefined);
        assert.equal(mem.verticalCount, 0);
      });
    });
  });

  describe("hasDownhillDiagonalMutation", function () {
    describe("when all 4 members of diagonal are a match", function () {
      it("should return true", function () {
        let mutatedDna = ["AAAAA", "CAGTGC", "TTATGT", "AGAAGG", "TCACTG"];
        let i = (j = 0);
        let res = mutationDetectorService.hasDownhillDiagonalMutation(
          mutatedDna,
          i,
          j
        );
        assert.equal(res, true);
      });
    });

    describe("when only 3 members (or less) of diagonal are a match", function () {
      it("should return true", function () {
        let mutatedDna = ["AAAAA", "CAGTGC", "TTATGT", "AGACGG", "TCACTG"];
        let i = (j = 0);
        let res = mutationDetectorService.hasDownhillDiagonalMutation(
          mutatedDna,
          i,
          j
        );
        assert.equal(res, undefined);
      });
    });
  });

  describe("hasUphillDiagonalMutation", function () {
    describe("when all 4 members of diagonal are a match", function () {
      it("should return true", function () {
        let mutatedDna = ["AAAAA", "AAAAA", "CCACCC", "TATTTT", "AGGGA"];
        let i = 4;
        let j = 0;
        let res = mutationDetectorService.hasUphillDiagonalMutation(
          mutatedDna,
          i,
          j
        );
        assert.equal(res, true);
      });
    });

    describe("when only 3 members (or less) of diagonal are a match", function () {
      it("should return true", function () {
        let mutatedDna = ["TCACTG", "AAAAA", "CAGTGC", "TTATGT", "AGACGG"];
        let i = (j = 0);
        let res = mutationDetectorService.hasUphillDiagonalMutation(
          mutatedDna,
          i,
          j
        );
        assert.equal(res, undefined);
      });
    });
  });
});
