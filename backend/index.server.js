/* eslint-disable no-console */
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const { logger } = require('./src/middlewares/logger');
const errorHandler = require('./src/middlewares/error-handler');
const corsOptions = require('./src/configs/cors-options');
const credentials = require('./src/middlewares/credentials');

const app = express();
require('dotenv').config();
/**
 * * mongoose connect db cloud
 */
const connect = require('./src/db/connect');

const urlMongoose = process.env.MONGO_CONNECTION;

const userRouter = require('./src/routes/user.route');
const adminRouter = require('./src/routes/admin/admin.routes');

app.use(cookieParser());
app.use(helmet());
app.use(logger);
// built-in middleware for json
app.use(express.json());
// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));

app.use('/api', userRouter);
app.use('/api/admin', adminRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  connect(urlMongoose);
  console.log(`App listen at http://localhost:${PORT}`);
});

module.exports = app;
