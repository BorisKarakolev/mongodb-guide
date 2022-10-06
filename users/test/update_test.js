const assert = require("assert");
const User = require("../src/user");

describe("Updating records", () => {
  let joe;

  beforeEach((done) => {
    joe = new User({ name: "Joe", likes: 0 });
    joe.save().then(() => done());
  });

  const assertName = (operation, done, name) => {
    operation
      .then(() => User.find({}))
      .then((users) => {
        assert(users.length === 1);
        assert(users[0].name === name);
        done();
      });
  };

  it("instance type using set n save", (done) => {
    joe.set("name", "Alex");
    assertName(joe.save(), done, "Alex");
  });

  it("instance can update", (done) => {
    assertName(joe.updateOne({ name: "Alex" }), done, "Alex");
  });

  it("class can update", (done) => {
    assertName(
      User.updateMany({ name: "Joe" }, { name: "Alex" }),
      done,
      "Alex"
    );
  });

  it("class can update one record", (done) => {
    assertName(
      User.findOneAndUpdate({ name: "Joe" }, { name: "Alex" }),
      done,
      "Alex"
    );
  });

  it("class can find a record with id and update", (done) => {
    assertName(User.findByIdAndUpdate(joe._id, { name: "Alex" }), done, "Alex");
  });

  it("user can have their likes incremented by 1", (done) => {
    User.updateMany({ name: "Joe" }, { $inc: { likes: 10 } })
      .then(() => User.findOne({ name: "Joe" }))
      .then((user) => {
        assert(user.likes === 10);
        done();
      });
  });
});
