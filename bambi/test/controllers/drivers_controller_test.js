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

  it("get to /drivers finds drivers in a location", (done) => {
    const seattleDriver = new Driver({
      email: "seattle@test.com",
      geometry: { type: "Point", coordinates: [-122.4759902, 47.6147628] },
    });
    const miamiDriver = new Driver({
      email: "miami@test.com",
      geometry: { type: "Point", coordinates: [-80.253, 25.791] },
    });

    Promise.all([seattleDriver.save(), miamiDriver.save()]).then(() => {
      request(app)
        .get("/drivers?lng=-80&lat=25")
        .end((err, response) => {
          assert(response.body.length === 2)
          assert(response.body[0].obj.email === 'miami@test.com')
          done();
        });
    });
  });
});
