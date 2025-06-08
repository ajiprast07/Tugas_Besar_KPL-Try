const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Terlalu banyak permintaan dari IP ini, coba lagi nanti.',
});

const securityMiddleware = [
  helmet(), // Security headers
  limiter,  // Rate limiting
];

module.exports = securityMiddleware;
