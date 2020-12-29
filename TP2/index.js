const express = require("express");
const app = express();

const port = 3000;

const bodyParser = require("body-parser");
app.use(bodyParser.json());

require("./user-routes.js")(app);

app.listen(port, () => {
  console.log(`API listening at http://localhost:${port}`);
});
