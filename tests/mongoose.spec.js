const localMongooseLogic = require("../src/mongoose.js");
const mongoose = require("mongoose");
const sinon = require("sinon");
const { expect, assert } = require("chai");

describe("DnaController", function () {
  let connect, promise, connection;
  beforeEach(() => {
    promise = sinon.promise();
    connect = sinon.stub(mongoose, "connect").returns(promise);
    localMongooseLogic.connectDB();
    connection = { foo: "foo" };
    promise.resolve(connection);
  });

  afterEach(function () {
    sinon.restore();
  });

  it("connectDB should call mongoose connect function", function () {
    sinon.assert.called(connect);
  });

  it("getConnection should return connection if exists", async function () {
    let output = localMongooseLogic.getConnection();
    assert.deepEqual(output, connection);
  });
});
