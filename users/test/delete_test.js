const assert = require("assert");
const User = require("../src/user");

describe("Deleting a user", () => {
  let joe;
  beforeEach((done) => {
    joe = new User({ name: "Joe" });
    joe.save().then(() => done());
  });

  const asserName = (operation, done, name) => {
    operation
      .then(() => User.findOne({ name: name }))
      .then((user) => {
        assert(user === null);
        done();
      });
  };

  it("model instance remove", (done) => {
    asserName(joe.remove(), done, "Joe");
  });

  it("class method remove", (done) => {
    asserName(User.deleteOne({ name: "Joe" }), done, "Joe");
  });

  it("class method findOneAndRemove", (done) => {
    asserName(User.findOneAndRemove({ name: "Joe" }), done, "Joe");
  });

  it("class method findByIdAndRemove", (done) => {
    asserName(User.findByIdAndRemove(joe._id), done, "Joe");
  });
});
