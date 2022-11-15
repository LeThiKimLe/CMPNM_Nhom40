/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
const { Order, Cart, UserAddress } = require('../../models');
const { Response } = require('../../utils');

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
const getAllOrder = async (req, res) => {
  const listUserAddress = await UserAddress.find({})
    .select('user address')
    .populate('user', '_id');
  const listOrder = await Order.find({})
    .select(
      '_id totalAmount orderStatus paymentStatus paymentType items shipAmount freeShip addressId user'
    )
    .populate('items.productId', '_id name productPicture salePrice');
  return Response(res, {
    list: [listUserAddress, listOrder],
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
          user: req.user.userId,
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
module.exports = {
  addOrder,
  getAllOrder,
  getOrder,
  getAllOrderOfUser,
};
