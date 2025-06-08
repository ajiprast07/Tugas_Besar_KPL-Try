const Logger = require('../utils/Logger');

const logger = new Logger();

const errorHandler = (error, req, res, next) => {
  logger.error('Kesalahan yang tidak tertangani:', error);
  
  res.status(500).json({
    success: false,
    message: 'Kesalahan Server Internal',
    timestamp: new Date().toISOString(),
  });
};

module.exports = errorHandler;
