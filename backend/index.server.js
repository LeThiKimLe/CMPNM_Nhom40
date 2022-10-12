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

const userRouter = require('./src/routes/user.routes');
const adminRouter = require('./src/routes/admin/admin.routes');
const categoryRouter = require('./src/routes/category.routes');
const colorRouter = require('./src/routes/color.routes');
const productRouter = require('./src/routes/product.routes');

app.use(cookieParser());
app.use(helmet());
app.use(logger);
// built-in middleware for json
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

app.use('/api/category', categoryRouter);
app.use('/api/product', productRouter);
app.use('/api/color', colorRouter);
app.use('/api/admin', adminRouter);
app.use('/api', userRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  connect(urlMongoose);
  console.log(`App listen at https://localhost:${PORT}`);
});

module.exports = app;
