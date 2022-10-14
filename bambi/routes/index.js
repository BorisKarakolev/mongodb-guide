const DriversController = require("../controllers/drivers_controller");

module.exports = (app) => {
  app.get("/", DriversController.greeting);
  app.post("/drivers", DriversController.create);
  app.put("/drivers/:id", DriversController.edit);
  app.delete("/drivers/:id", DriversController.delete);

  app.get("/drivers", DriversController.index);
};
