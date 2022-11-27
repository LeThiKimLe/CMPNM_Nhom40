/* eslint-disable no-shadow */
/* eslint-disable eqeqeq */
/* eslint-disable array-callback-return */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
const { Order, Cart, UserAddress, Color, Product } = require('../../models');
const { Response, ServerError } = require('../../utils');

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
      order.save((err, data) => {
        if (err) return res.status(400).json({ err });
        if (data) {
          res.status(201).json({ order });
        }
      });
    }
  });
};
const getAllOrderOfUser = (req, res) => {
  Order.find({ user: req.user.userId })
    .select('_id totalAmount orderStatus paymentStatus items freeShip')
    .populate('items.productId', '_id name productPicture salePrice')
    .exec((error, orders) => {
      if (error) return res.status(400).json({ error });
      if (orders) {
        res.status(200).json({ orders });
      }
    });
};
const getAllOrder = (req, res) => {
  let promiseArray = [];
  const listUserAddress = UserAddress.find({})
    .select('user address')
    .populate('user', '_id');

  promiseArray.push(listUserAddress);
  const listOrder = Order.find({})
    .select(
      '_id totalAmount orderStatus paymentStatus paymentType items shipAmount freeShip addressId user'
    )
    .populate(
      'items.productId',
      '_id name productPictures salePrice detailsProduct color'
    );
  promiseArray.push(listOrder);
  Promise.all(promiseArray)
    .then((value) => {
      Response(res, {
        list: [value[0], value[1]],
      });
    })
    .catch((error) => {
      ServerError(res, error);
    });
};
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
  const newStatus = {
    type: status,
    date: new Date(),
    isCompleted: true,
  };
  const updateOrder = Order.updateOne(
    { _id: orderId },
    {
      $push: {
        orderStatus: newStatus,
      },
    },
    {
      upsert: true,
    }
  ).exec((error, data) => {
    if (data) {
      let promiseArray = [];
      // todo Trạng thái đóng gói thì giảm số lượng trong kho
      if (status == 'packed') {
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
    },
    {
      upsert: true,
    }
  ).exec((error, data) => {
    if (data) {
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
};
