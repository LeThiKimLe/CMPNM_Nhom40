const { authenticateAdmin } = require('./authenticate');
const { adminCheckRole } = require('./authorization');
const credentials = require('./credentials');
const errorHandler = require('./error-handler');
const { logger, logEvents } = require('./logger');

module.exports = {
  authenticateAdmin,
  adminCheckRole,
  credentials,
  errorHandler,
  logger,
  logEvents,
};
