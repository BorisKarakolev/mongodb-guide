const assert = require("assert");
const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../../app");

const Driver = mongoose.model("driver");

describe("Drivers controller", () => {
  it("post to /drivers creates a new drvier", (done) => {
    Driver.count().then((count) => {
      request(app)
        .post("/drivers")
        .send({ email: "test@test.com", driving: true })
        .end(() => {
          Driver.count().then((newCount) => {
            assert(count + 1 === newCount);
            done();
          });
        });
    });
  });
});
