/* eslint-disable no-underscore-dangle */
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable prefer-const */
/* eslint-disable array-callback-return */
/* eslint-disable no-console */
const mongoose = require('mongoose');
const { Cart, CartItem, Product } = require('../../models');
const { Response, ServerError, BadRequest } = require('../../utils');

function runUpdate(filter, updateData, options) {
  return new Promise((resolve, reject) => {
    Cart.updateOne(filter, updateData, options)
      .then(() => resolve())
      .catch((err) => reject(err));
  });
}

const getAllItems = (req, res) => {
  const { userId } = req.user;
  Cart.findOne({ user: userId })
    .populate(
      'cartItems.product',
      '_id name salePrice regularPrice productPictures detailsProduct color category'
    )
    .exec((error, cart) => {
      if (error) return res.status(400).json({ error });
      if (cart) {
        let cartItems = [];
        cart.cartItems.forEach((item, index) => {
          const newCartItem = {
            _id: item.product._id.toString(),
            name: item.product.name,
            productPicture: item.product.productPictures[0],
            detailsProduct: item.product.detailsProduct,
            salePrice: item.product.salePrice,
            regularPrice: item.product.regularPrice,
            quantity: item.quantity,
            color: item.product.color,
            category: item.product.category,
          };
          cartItems.push(newCartItem);
        });
        res.status(200).json({ cartItems });
      } else {
        res.status(200).json({ cartItems: [] });
      }
    });
};
const addItems = (req, res) => {
  const { cartItems } = req.body.data;
  const { userId } = req.user;
  Cart.findOne({ user: userId }).exec((error, cart) => {
    if (cart) {
      // find product
      let promiseArray = [];
      cartItems.map((cartItem) => {
        const { product, quantity } = cartItem;
        const item = cart.cartItems.find((c) => c.product == product);
        let filter;
        let update;
        let options;
        if (item) {
          filter = {
            user: userId,
            'cartItems.product': product,
          };
          const newQuantity = Number(item.quantity + Number(quantity));
          update = {
            $set: {
              'cartItems.$.quantity': newQuantity,
            },
          };
          options = {
            arrayFilters: [{ 'cartItems.product': product }],
          };
        } else {
          filter = { user: userId };
          update = {
            $push: {
              cartItems: cartItem,
            },
          };
          options = {
            upsert: true,
          };
        }
        promiseArray.push(runUpdate(filter, update, options));
      });
      Promise.all(promiseArray)
        .then(() => Response(res))
        .catch((err) => ServerError(res, err));
    } else {
      let listItems = [];
      cartItems.map((item) => {
        const newCartItem = new CartItem({
          product: item.product,
          quantity: item.quantity,
        });
        listItems.push(newCartItem);
      });

      let newCart = new Cart({
        user: userId,
      });
      newCart.cartItems.push(listItems);
      newCart
        .save()
        .then(() => {
          Response(res);
        })
        .catch((err) => {
          ServerError(res, err);
        });
    }
  });
};
const addItem = async (req, res) => {
  const { cartItem } = req.body.data;
  const { userId } = req.user;
  const { product, quantity } = cartItem;
  const productData = await Product.findOne({ _id: product })
    .select('stock')
    .lean();
  const { stock } = productData;
  if (quantity > stock) {
    return BadRequest(res, {
      message: 'Số lượng sản phẩm vượt quá số lượng trong kho',
    });
  }
  Cart.findOne({
    user: userId,
  }).exec((error, cart) => {
    if (cart) {
      const item = cart.cartItems.find((c) => c.product == product);
      if (item) {
        const newQuantity = Number(item.quantity + Number(quantity));
        if (newQuantity > stock) {
          return BadRequest(res, {
            message: 'Số lượng sản phẩm vượt quá số lượng trong kho',
          });
        }
        Cart.updateOne(
          {
            user: userId,
            'cartItems.product': product,
          },
          {
            $set: {
              'cartItems.$.quantity': newQuantity,
            },
          },
          {
            arrayFilters: [{ 'cartItems.product': product }],
          }
        ).exec((err, data) => {
          if (data) {
            return Response(res);
          }
          return ServerError(res, err);
        });
      } else {
        Cart.updateOne(
          {
            user: userId,
          },
          {
            $push: {
              cartItems: cartItem,
            },
          },
          {
            upsert: true,
          }
        ).exec((err, data) => {
          if (data) {
            return Response(res);
          }
          return ServerError(res, err);
        });
      }
    } else {
      let newCart = new Cart({
        user: userId,
        cartItems: [
          {
            product,
            quantity,
          },
        ],
      });
      newCart
        .save()
        .then(() => {
          Response(res);
        })
        .catch((err) => {
          ServerError(res, err);
        });
    }
  });
};
const updateCartItem = async (req, res) => {
  const { cartItem } = req.body.data;
  const { userId } = req.user;
  const { product, quantity } = cartItem;
  const productData = await Product.findOne({ _id: product })
    .select('stock')
    .lean();
  const { stock } = productData;
  if (quantity > stock) {
    return BadRequest(res, {
      message: 'Số lượng sản phẩm vượt quá số lượng trong kho',
    });
  }

  Cart.updateOne(
    {
      user: userId,
      'cartItems.product': product,
    },
    {
      $set: {
        'cartItems.$.quantity': quantity,
      },
    },
    {
      arrayFilters: [{ 'cartItems.product': product }],
    }
  ).exec((err, data) => {
    if (data) {
      return Response(res);
    }
    return ServerError(res, err);
  });
};
const deleteCartItem = (req, res) => {
  const productId = req.body.data;
  const { userId } = req.user;
  Cart.findOneAndUpdate(
    { user: userId },
    {
      $pull: {
        cartItems: {
          product: productId,
        },
      },
    }
  ).exec((error, result) => {
    if (error) return res.status(400).json({ error });
    if (result) {
      res.status(200).json({ result });
    }
  });
};
module.exports = {
  getAllItems,
  addItems,
  addItem,
  deleteCartItem,
  updateCartItem,
};
