const app = require("./app");

module.exports = (req, res) => {
  // Express app is invoked as a handler
  return app(req, res);
};
