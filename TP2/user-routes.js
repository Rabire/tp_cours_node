module.exports = (app) => {
  const user = require("./user-controller.js");

  app.get("/users", user.getAll);
  app.get("/user/:id", user.getOne);

  app.post("/user", user.create);
  app.put("/user/:id", user.edit);

  app.delete("/user/:id", user.delete);
};
