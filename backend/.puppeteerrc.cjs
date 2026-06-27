const {join} = require('path');

/**
 * @type {import("puppeteer").Configuration}
 */
module.exports = {
  // Changes the cache location for Puppeteer to the project directory
  // This is required for deployment platforms like Render
  cacheDirectory: join(__dirname, '.cache', 'puppeteer'),
};
