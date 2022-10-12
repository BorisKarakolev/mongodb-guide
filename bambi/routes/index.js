const DriversController = require("../controllers/drivers_controller");

module.exports = (app) => {
  app.get("/", DriversController.greeting);
  app.post("/drivers", DriversController.create);
};
