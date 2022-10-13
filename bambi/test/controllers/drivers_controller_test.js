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

  it("put to /drivers/id edits an existing driver", (done) => {
    const driver = new Driver({ email: "t@t.com", driving: false });
    driver.save().then(() => {
      request(app)
        .put(`/drivers/${driver._id}`)
        .send({ driving: true })
        .end(() => {
          Driver.findOne({ email: "t@t.com" }).then((driver) => {
            assert(driver.driving === true);
            done();
          });
        });
    });
  });

  it("delete to /drivers/id deletes a driver", (done) => {
    const driver = new Driver({ email: "tasty@tasty.com" });

    driver.save().then(() => {
      request(app)
        .delete(`/drivers/${driver._id}`)
        .end(() => {
          Driver.findOne({ email: "tasty@tasty.com" }).then((driver) => {
            assert(driver === null);
            done();
          });
        });
    });
  });
});
