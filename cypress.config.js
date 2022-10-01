const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'umbyft',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
