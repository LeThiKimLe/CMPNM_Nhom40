/* eslint-disable no-shadow */
/* eslint-disable eqeqeq */
/* eslint-disable array-callback-return */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
const paypal = require('paypal-rest-sdk');
const crypto = require('crypto');
const https = require('https');
const _ = require('lodash');
const { Order, Cart, UserAddress, Product } = require('../../models');
const { Response, ServerError, BadRequest, Create } = require('../../utils/response');
const redisClient = require('../../connections/cachingRedis');

const partnerCode = 'MOMO';
const accessKey = 'F8BBA842ECF85';
const secretkey = 'K951B6PE1waDMi640xX08PD3vg6EkVlz';
const requestId = partnerCode + new Date().getTime();
const orderId = requestId;
const orderInfo = 'pay with MoMo';
const redirectUrl = 'https://localhost:3002/checkout/checkoutMomo';
const ipnUrl = 'https://localhost:3000/api/order/checkResponse';
const requestType = 'captureWallet';
const extraData = '';
const orderGroupId = '';
const autoCapture = true;
const lang = 'vi';
const amount = '50000';

const exchangePrice = async (from, to) => {
  let url = "";
  if (to === "USD") {
    url = process.env.API_URL_CURRENCY_USD; 
  } else {
    url = process.env.API_URL_CURRENCY_VND;
  }
  const res = await fetch(url);
  const data = await res.json();
  const rate = data.conversion_rates;
  const valueChange = _.get(rate, from)
  return valueChange; 
}
const paymentWithPaypal = async (req, res) => {
  const orderData = req.body.data;
  console.log(orderData);
  const { subAmount, totalAmount, shipAmount, freeShip, items } = orderData;
  const { name, address, mobileNumber, provinceName, districtName, wardName, wardCode } = orderData.address;
  const exchange = await exchangePrice("USD", "VND");
  console.log(exchange);
  const totalPrice = (totalAmount*exchange).toFixed(2).toString();
  const shipPrice = (shipAmount*exchange).toFixed(2).toString();
  const shipDiscount = (freeShip*exchange).toFixed(2).toString();
  const subPrice = (subAmount*exchange).toFixed(2).toString();
  const listProducts = items.map((item) => {
    const priceItem = (item.salePrice*exchange).toFixed(2).toString();
    return {
      name:`${item.name} ${item.ram} ${item.storage} ${item.colorName}`,
      price: priceItem,
      quantity: item.quantity,
      currency: "USD"
    }
  })
  console.log(JSON.stringify(listProducts, null, 1));
  const createPaymentJson = {
    "intent": "sale",
    "payer": {
      "payment_method": "paypal"
    },
    "redirect_urls": {
          "return_url": "http://localhost:3002/checkout/success",
          "cancel_url": "http://localhost:3002/checkout/cancel"
    },
    "transactions": [
      {
       "amount": {
          "currency": "USD",
          "total": totalPrice,
          "details": {
            "subtotal": subPrice,
            "shipping": shipPrice,
            "shipping_discount": shipDiscount,
          }
        },

        "item_list": {
          "items": listProducts,
          "shipping_address": {
            "recipient_name": name,
            "line1": `${address} ${wardName}`,
            "city": districtName,
            "state": provinceName,
            "phone": mobileNumber,
            "postal_code": wardCode,
            "country_code": "VN"
          }
        },
        "description": "This is the payment description.",
      }
    ]
  }
  console.log(createPaymentJson)
  paypal.payment.create(createPaymentJson, (error, payment) => {
    if (error) {
      return ServerError(res, error);
    } 
    return Create(res, { payment });
  })
}

const paymentPaypalSuccess = (req, res) => {
  const { paymentId, payerId, total, shipping_discount, shipping, subtotal } = req.query;
   const executePaymentJson = {
    payer_id: payerId,
    transactions: [
      {
        amount: {
          currency: "USD",
          total: total,
          details: {
            subtotal: subtotal,
            shipping: shipping,
            shipping_discount: shipping_discount,
          }
        },
      },
    ],
  };
 
  paypal.payment.execute(
    paymentId,
    executePaymentJson,
    (error, payment) => {
      if (error) {
        console.log(error.response);
        return ServerError(res, error);
      } 
       console.log(JSON.stringify(payment));
       return Response(res, { success: true, payment })
    }
  );
}
const paymentPaypalCancel = (req, res) => {
  
}
const addOrderPaypal = (req, res) => {
  const { userId } = req.user;
  const orderData = req.body.data;
   Cart.deleteOne({ user: userId }).exec((error, result) => {
    if (error) return res.status(400).json({ error });
    if (result) {
      orderData.orderStatus = [
        {
          type: 'pending',
          date: new Date(),
          isCompleted: true,
        },
      ];
      orderData.paymentType = "card"
      orderData.paymentStatus = "completed";
      orderData.user = userId;
      const order = new Order(orderData);
      order.save(async (err, data) => {
        if (err) return res.status(400).json({ err });
        if (data) {
          res.status(201).json({ order });
        }
      });
    }
  });

}
const addOrder = (req, res) => {
  const { userId } = req.user;
  const orderData = req.body.data;
  Cart.deleteOne({ user: userId }).exec((error, result) => {
    if (error) return res.status(400).json({ error });
    if (result) {
      orderData.orderStatus = [
        {
          type: 'pending',
          date: new Date(),
          isCompleted: true,
        },
      ];
      orderData.user = userId;
      const order = new Order(orderData);
      order.save(async (err, data) => {
        if (err) return res.status(400).json({ err });
        if (data) {
          res.status(201).json({ order });
        }
      });
    }
  });
};

// api momo
const paymentWithMomo = (req, res) => {
  const { totalAmount } = req.body.data;
  console.log(totalAmount);
  const rawSignature = `accessKey=${accessKey}&amount=${totalAmount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;
  console.log(rawSignature);
  const signature = crypto
    .createHmac('sha256', secretkey)
    .update(rawSignature)
    .digest('hex');
  console.log('--------------------SIGNATURE----------------');
  console.log('chu ky', signature);
  const requestBody = JSON.stringify({
    partnerCode,
    accessKey,
    requestId,
    amount: totalAmount,
    orderId,
    orderInfo,
    redirectUrl,
    ipnUrl,
    extraData,
    requestType,
    signature,
    lang: 'en',
  });
  const options = {
    hostname: 'test-payment.momo.vn',
    port: 443,
    path: '/v2/gateway/api/create',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(requestBody),
    },
    data: requestBody,
  };
  const reqChild = https.request(options, (resChild) => {
    console.log(`Status: ${resChild.statusCode}`);
    console.log(`Headers: ${JSON.stringify(resChild.headers)}`);
    resChild.setEncoding('utf8');
    resChild.on('data', (body) => {
      console.log('Body: ');
      console.log(body);
      console.log('resultCode: ');
      console.log(JSON.parse(body).resultCode);
      res.header('Access-Control-Allow-Origin');
      return res.json(JSON.parse(body).payUrl);
    });

    resChild.on('end', () => {
      console.log('No more data in response.');
    });
  });
  reqChild.on('error', (e) => {
    console.log(`problem with request: ${e.message}`);
  });
  // write data to request body
  console.log('Sending....');
  reqChild.write(requestBody);
  reqChild.end();
};
const checkResponseMomo = (req, res) => {
  try {
    const Secretkey = secretkey;
    const {
      orderId,
      requestId,
      orderInfo,
      orderType,
      transId,
      resultCode,
      message,
      payType,
      responseTime,
      extraData,
    } = req.body;
    const rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&message=${message}&orderId=${orderId}&orderInfo=${orderInfo}&orderType=${orderType}&partnerCode=${partnerCode}&payType=${payType}&requestId=${requestId}&responseTime=${responseTime}&resultCode=${resultCode}&transId=${transId}`;
    // Signature
    const signature = crypto
      .createHmac('sha256', Secretkey)
      .update(rawSignature)
      .digest('hex');
    console.log(signature);
    console.log(signature.body);
    if (signature === req.body.signature && req.body.resultCode === 0) {
      // handle update đơn hàng
      console.log('dúng r nè');

      return Response(res);
    }
    return BadRequest(res);
  } catch (error) {
    return ServerError(res);
  }
};

const getAllOrderOfUser = (req, res) => {
  Order.find({ user: req.user.userId })
    .sort({ createdAt: "desc"})
    .select('_id totalAmount orderStatus paymentStatus items freeShip')
    .populate('items.productId', '_id name productPicture salePrice')
    .exec(async (error, orders) => {
      if (error) return res.status(400).json({ error });
      if (orders) {
        const listOrder = await Order.find({})
          .select(
            '_id totalAmount orderStatus paymentStatus paymentType items shipAmount freeShip addressId user'
          )
          .populate(
            'items.productId',
            '_id name productPictures salePrice detailsProduct'
          );
        await redisClient.set('orders', JSON.stringify(listOrder));
        res.status(200).json({ orders });
      }
    });
};

const updateOrderMomoPayment = (req, res) => {
  // update status order, paymentType
  const orderStatusData = req.body.data;
  const { orderId, status } = orderStatusData;
  Order.updateOne(
    { _id: orderId },
    {
      $set: {
        paymentStatus: status,
        paymentType: 'card',
      },
    },
    {
      upsert: true,
    }
  ).exec(async (error, data) => {
    if (data) {
      const listOrder = await Order.find({})
        .sort({ createdAt: 'desc' })
        .select(
          '_id totalAmount orderStatus paymentStatus paymentType items shipAmount freeShip addressId user createdAt'
        )
        .populate(
          'items.productId',
          '_id name productPictures salePrice detailsProduct'
        );
      await redisClient.set('orders', JSON.stringify(listOrder));
      Response(res);
    } else {
      ServerError(res, error);
    }
  });
};

// *todo get-all-order [admin]
const getAllOrder = async (req, res) => {
  let listUserAddress = [];
  let listOrder = [];
  try {
    const cacheListOrder = await redisClient.get('orders');
    listUserAddress = await UserAddress.find({})
      .select('user address')
      .populate('user', '_id');
    if (cacheListOrder) {
      listOrder = JSON.parse(cacheListOrder);
    } else {
      listOrder = await Order.find({})
        .sort({ createdAt: 'desc' })
        .select(
          '_id totalAmount orderStatus paymentStatus paymentType items shipAmount freeShip addressId user'
        )
        .populate(
          'items.productId',
          '_id name productPictures salePrice detailsProduct'
        );
      await redisClient.set('orders', JSON.stringify(listOrder));
    }
    Response(res, {
      list: [listUserAddress, listOrder],
    });
  } catch (error) {
    ServerError(res);
  }
};
const getAllOrderAfterHandle = async (req, res) => {
  console.log('chay order');
  let listUserAddress = [];
  let listOrder = [];
  try {
    const cacheListAddress = await redisClient.get('userAddress');
    if (cacheListAddress) {
      listUserAddress = JSON.parse(cacheListAddress);
    } else {
      listUserAddress = await UserAddress.find({})
        .select('user address')
        .populate('user', '_id');
      await redisClient.set('userAddress', JSON.stringify(listUserAddress));
    }
    listOrder = await Order.find({})
      .sort({ createdAt: 'desc' })
      .select(
        '_id totalAmount orderStatus paymentStatus paymentType items shipAmount freeShip addressId user createdAt'
      )
      .populate(
        'items.productId',
        '_id name productPictures salePrice detailsProduct'
      );
    await redisClient.set('orders', JSON.stringify(listOrder));
    Response(res, {
      list: [listUserAddress, listOrder],
    });
  } catch (error) {
    ServerError(res);
  }
};
// get order 
const getOrder = (req, res) => {
  const { id } = req.params;
  Order.findOne({ _id: id })
    .populate(
      'items.productId',
      '_id name productPictures salePrice color detailsProduct regularPrice category'
    )
    .lean()
    .exec((error, order) => {
      if (error) return res.status(400).json({ error });
      if (order) {
        UserAddress.findOne({
          user: order.user,
        }).exec((err, address) => {
          if (err) return res.status(400).json({ err });
          order.address = address.address.find(
            (adr) => adr._id.toString() === order.addressId.toString()
          );
          res.status(200).json({
            order,
          });
        });
      }
    });
};
const updateOrderStatus = (req, res) => {
  const orderStatusData = req.body.data;
  const { orderId, status } = orderStatusData;
  let newPaymentStatus = '';
  const newStatus = {
    type: status,
    date: new Date(),
    isCompleted: true,
  };
  if (status == 'delivered') {
    newPaymentStatus = 'completed';
  } else if (status == 'refund') {
    newPaymentStatus = 'refund';
  } else if (status == 'cancelled') {
    newPaymentStatus = 'cancelled';
  } else {
    newPaymentStatus = 'pending';
  }
  Order.updateOne(
    { _id: orderId },
    {
      $push: {
        orderStatus: newStatus,
      },
      $set: {
        paymentStatus: newPaymentStatus,
      },
    },
    {
      upsert: true,
    }
  ).exec((error, data) => {
    if (data) {
      let promiseArray = [];
      // todo Trạng thái đóng gói thì giảm số lượng trong kho
      if (status == 'delivered') {
        //* get product
        Order.findOne({ _id: orderId })
          .populate(
            'items.productId',
            '_id name productPictures salePrice color detailsProduct regularPrice category quantitySold'
          )
          .lean()
          .exec((error, order) => {
            if (error) return res.status(400).json({ error });
            if (order) {
              order.items.map((item, index) => {
                const id = item.productId._id;
                const quantity = item.purchasedQty;
                const productUpdate = Product.updateOne(
                  { _id: id },
                  { $inc: { quantitySold: +quantity, stock: -quantity } }
                );
                promiseArray.push(productUpdate);
              });
              Promise.all(promiseArray)
                .then((value) => {
                  Response(res);
                })
                .catch((err) => {
                  ServerError(res, err);
                });
            }
          });
        //* giảm số lương
        //* save
      }
      // todo Nếu Trạng thái length > 3 và status === cancelled thì tăng số lượng lại
      else if (status == 'refund') {
        //* get product
        //* hoàn lai số lương
        //* save
        Order.findOne({ _id: orderId })
          .populate(
            'items.productId',
            '_id name productPictures salePrice color detailsProduct regularPrice category'
          )
          .lean()
          .exec((error, order) => {
            if (error) return res.status(400).json({ error });
            if (order) {
              order.items.map((item, index) => {
                const id = item.productId._id;
                const quantity = Number(item.purchasedQty);
                const productUpdate = Product.updateOne(
                  { _id: id },
                  { $inc: { quantitySold: -quantity, stock: +quantity } }
                );
                promiseArray.push(productUpdate);
              });
              Promise.all(promiseArray)
                .then((value) => {
                  Response(res);
                })

                .catch((err) => {
                  ServerError(res, err);
                });
            }
          });
      } else {
        Response(res);
      }
    } else {
      ServerError(res, error);
    }
  });
};
// user cancel order
const cancelOrder = (req, res) => {
  const orderStatusData = req.body.data;
  const { orderId, status } = orderStatusData;
  const newStatus = {
    type: status,
    date: new Date(),
    isCompleted: true,
  };
  Order.updateOne(
    { _id: orderId },
    {
      $push: {
        orderStatus: newStatus,
      },
      $set: {
        paymentStatus: 'cancelled',
      },
    },
    {
      upsert: true,
    }
  ).exec(async (error, data) => {
    if (data) {
      const listOrder = await Order.find({})
        .sort({ createdAt: 'desc' })
        .select(
          '_id totalAmount orderStatus paymentStatus paymentType items shipAmount freeShip addressId user createdAt'
        )
        .populate(
          'items.productId',
          '_id name productPictures salePrice detailsProduct'
        );
      await redisClient.set('orders', JSON.stringify(listOrder));
      Response(res);
    } else {
      ServerError(res, error);
    }
  });
};
module.exports = {
  addOrder,
  getAllOrder,
  getOrder,
  getAllOrderOfUser,
  updateOrderStatus,
  cancelOrder,
  getAllOrderAfterHandle,
  checkResponseMomo,
  paymentWithMomo,
  updateOrderMomoPayment,
  paymentWithPaypal,
  paymentPaypalSuccess,
  addOrderPaypal,
};
