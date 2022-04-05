const express = require("express");
const itemRoutes = require("./itemRoutes");
const expressError = require("./expressError");
const app = express();

app.use(express.json());
app.use("/items", itemRoutes);

// 404 Handler
app.use(function(req, res, next) {
  return new expressError("Not Found", 404);
});

app.listen("3000", () => {
  console.log("Server is listening on port 3000");
});
