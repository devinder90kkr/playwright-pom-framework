// Test data for Login functionality
require('dotenv').config();

module.exports = {
  username: process.env.SAUCE_USERNAME || "standard_user",
  password: process.env.SAUCE_PASSWORD || "secret_sauce"
};
