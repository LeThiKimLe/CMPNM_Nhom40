/* eslint-disable prefer-arrow-callback */
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const http = require('http');
const paypal = require('paypal-rest-sdk');

const app = express();
const server = http.createServer(app);

const helmet = require('helmet');

const corsOptions = require('./src/configs/cors-options');

require('dotenv').config();

paypal.configure({
  mode: 'sandbox',
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.CLIENT_SECRET,
});
/**
 * * mongoose connect db cloud
 */
const connect = require('./src/connections/connect');

const urlMongoose = process.env.MONGO_CONNECTION;

const userRouter = require('./src/routes/user.routes');
const adminRouter = require('./src/routes/admin/admin.routes');
const categoryRouter = require('./src/routes/category.routes');

const productRouter = require('./src/routes/product.routes');
const cartRouter = require('./src/routes/cart.routes');
const addressRouter = require('./src/routes/address.routes');
const orderRouter = require('./src/routes/order.routes');
const bannerRouter = require('./src/routes/banner.routes');

app.use(cookieParser());
app.use(helmet());

app.use(cookieParser());

// built-in middleware for json
app.use(express.json({ limit: '50mb' }));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,content-type'
  );
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
app.use(cors(corsOptions));

app.use('/api/category', categoryRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/address', addressRouter);
app.use('/api/order/', orderRouter);
app.use('/api/banner/', bannerRouter);
app.use('/api/admin', adminRouter);
app.use('/api', userRouter);

const PORT = process.env.PORT || 3000;
server.listen(PORT, async () => {
  connect(urlMongoose);
  console.log(`App listen at https://localhost:${PORT}`);
});

module.exports = app;
