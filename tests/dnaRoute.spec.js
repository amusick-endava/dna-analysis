let DnaRoute = require("../src/routes/dnaRoute.js");
let assert = require("assert");

describe("DnaRoute", function () {
  describe("constructor", function () {
    it("should initialize router", function () {
      let dnaRoute = new DnaRoute();
      assert.notEqual(dnaRoute.router, undefined);
    });
  });

  describe("getRouter", function () {
    it("should return router", function () {
      let dnaRoute = new DnaRoute();
      assert.notEqual(dnaRoute.router, undefined);
      assert.equal(dnaRoute.getRouter(), dnaRoute.router);
    });
  });
});
