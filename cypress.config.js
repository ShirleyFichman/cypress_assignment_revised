const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportWidth: 375,
  viewportHeight: 640,
  e2e: {
    setupNodeEvents(on, config) {},
    baseUrl: "https://stgchrome.paradox.ai/automation-engineer-assignment/",
  },
});