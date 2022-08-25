/* eslint-disable no-console */
const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
require('dotenv').config();
/**
 * * mongoose connect db cloud
 */
const connect = require('./src/db/connect');
const logger = require('./src/utils/logger');

const urlMongoose = process.env.MONGO_CONNECTION;

const userRouter = require('./src/routes/user.route');
const adminRouter = require('./src/routes/admin/admin.routes');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.JWT_SECRET));

app.use('/api', userRouter);
app.use('/api/admin', adminRouter);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  connect(urlMongoose);
  logger.log({
    level: 'info',
    message: `App listen at http://localhost:${PORT}`,
  });
});

module.exports = app;
