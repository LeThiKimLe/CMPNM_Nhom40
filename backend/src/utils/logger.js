const { format, transports, createLogger } = require('winston');

const { printf, combine, colorize } = format;
const myFormat = printf(
  ({ level, message, timestamp }) => `${timestamp} ${level}: ${message}`
);
const logger = createLogger({
  format: combine(
    colorize(),
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    myFormat
  ),
  transports: [new transports.Console()],
});

module.exports = logger;
