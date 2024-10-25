const { defineConfig } = require('cypress');

module.exports = defineConfig({
  viewportWidth: 1024,
  viewportHeight: 768,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://localhost:3000',
    testIsolation: false,
  },
});
