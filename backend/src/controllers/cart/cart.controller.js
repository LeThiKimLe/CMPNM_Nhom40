/* eslint-disable no-underscore-dangle */
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable prefer-const */
/* eslint-disable array-callback-return */
/* eslint-disable no-console */
const mongoose = require('mongoose');
const { Cart, CartItem, Product } = require('../../models');
const { Response, ServerError } = require('../../utils');

function runUpdate(filter, updateData, options) {
  return new Promise((resolve, reject) => {
    Cart.updateOne(filter, updateData, options)
      .then(() => resolve())
      .catch((err) => reject(err));
  });
}
const getAllItems = (req, res) => {
  const { userId } = req.user;
  let newCartItems = [];
  Cart.findOne({ user: userId }).exec((error, cart) => {
    if (cart) {
      if (cart.cartItems.length > 0) {
        let promises = [];
        cart.cartItems.map((item) => {
          const product = Product.findById(item.product);
          promises.push(product);
        });
        Promise.all(promises).then((value) => {
          value.map((item, index) => {
            const newItem = {
              product: item,
              quantity: cart.cartItems[index].quantity,
            };
            newCartItems.push(newItem);
          });
          return Response(res, { cartItems: newCartItems });
        });
      } else {
        return Response(res, { cartItems: [] });
      }
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
const addItem = (req, res) => {
  const { cartItem } = req.body.data;
  const { userId } = req.user;
  const { product, quantity } = cartItem;
  Cart.findOne({
    user: userId,
  }).exec((error, cart) => {
    if (cart) {
      const item = cart.cartItems.find((c) => c.product == product);
      if (item) {
        const newQuantity = Number(item.quantity + Number(quantity));
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
      const newCartItem = new CartItem({
        product,
        quantity,
      });
      let newCart = new Cart({
        user: userId,
      });
      newCart.cartItems.push(newCartItem);
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
const updateCartItem = (req, res) => {
  const { cartItem } = req.body.data;
  const { userId } = req.user;
  const { product, quantity } = cartItem;
  Cart.findOne({
    user: userId,
  }).exec((error, cart) => {
    if (cart) {
      const item = cart.cartItems.find((c) => c.product == product);
      if (item) {
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
      }
    }
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
