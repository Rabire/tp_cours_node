const express = require("express");
const app = express();
const sniffer = require("./sniffer");

const port = Math.floor(Math.random() * 1000) + 3000;
// const port = 3002;

app.get("/ping", (req, res) => {
  res.send(`Found port !!!`);
});

(async () => {
  await app.listen(port, () => {
    console.log(`API listening at http://localhost:${port}`);
  });

  await sniffer();
})();
