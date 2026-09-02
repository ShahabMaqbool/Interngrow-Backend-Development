const client = require("prom-client");

// Default Node.js metrics
client.collectDefaultMetrics();

module.exports = client;