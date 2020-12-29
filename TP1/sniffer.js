const fetch = require("node-fetch");

module.exports = async (app) => {
  for (let i = 3000; i <= 4000; i++) {
    const response = await fetch(`http://localhost:${i}/ping`).catch(() =>
      console.log(`sniffing: it's not the port ${i}`)
    );

    if (response) {
      console.log(`sniffing: it's the port ${i} !`);
      break;
    }
  }
};
