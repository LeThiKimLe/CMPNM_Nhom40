/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable no-shadow */
/* eslint-disable no-underscore-dangle */
const { UserAddress } = require('../../models');
const { Response, ServerError } = require('../../utils');

const addAddress = (req, res) => {
  const { address } = req.body.data;
  const { userId } = req.user;
  // find address default
  if (!address.isDefault) {
    UserAddress.updateOne(
      {
        user: userId,
      },
      {
        $push: {
          address,
        },
      },
      {
        upsert: true,
        new: true,
      }
    ).exec((err, data) => {
      if (data) {
        return Response(res);
      }
      return ServerError(res, err);
    });
  } else {
    UserAddress.findOne({ user: userId }).exec((err, userAddress) => {
      if (userAddress) {
        const addressData = userAddress.address;
        let id = '';
        addressData.map((item) => {
          if (item.isDefault) {
            id = item._id;
          }
        });
        UserAddress.updateOne(
          {
            user: userId,
            'address._id': id,
          },
          {
            $set: {
              'address.$.isDefault': false,
            },
          },
          {
            arrayFilters: [{ 'address._id': id }],
          }
        ).exec((error, data) => {
          if (data) {
            UserAddress.updateOne(
              {
                user: userId,
              },
              {
                $push: {
                  address,
                },
              },
              {
                upsert: true,
                new: true,
              }
            ).exec((err, data) => {
              if (data) {
                return Response(res);
              }
              return ServerError(res, err);
            });
          }
        });
      } else {
        UserAddress.updateOne(
          {
            user: userId,
          },
          {
            $push: {
              address,
            },
          },
          {
            upsert: true,
            new: true,
          }
        ).exec((err, data) => {
          if (data) {
            return Response(res);
          }
          return ServerError(res, err);
        });
      }
    });
  }
};
const updateAddress = (req, res) => {
  const { address } = req.body.data;
  const { userId } = req.user;
  if (!address.isDefault) {
    UserAddress.updateOne(
      {
        user: userId,
        'address._id': address._id,
      },
      {
        $set: {
          'address.$': address,
        },
      },
      {
        arrayFilters: [{ 'address._id': address._id }],
      }
    ).exec((err, data) => {
      if (data) {
        return Response(res);
      }
      return ServerError(res, err);
    });
  } else {
    UserAddress.findOne({ user: userId }).exec((err, userAddress) => {
      if (userAddress) {
        const addressData = userAddress.address;
        let id = '';
        addressData.map((item) => {
          if (item.isDefault) {
            id = item._id;
          }
        });
        UserAddress.updateOne(
          {
            user: userId,
            'address._id': id,
          },
          {
            $set: {
              'address.$.isDefault': false,
            },
          },
          {
            arrayFilters: [{ 'address._id': id }],
          }
        ).exec((error, data) => {
          if (data) {
            UserAddress.updateOne(
              {
                user: userId,
                'address._id': address._id,
              },
              {
                $set: {
                  'address.$': address,
                },
              },
              {
                arrayFilters: [{ 'address._id': address._id }],
              }
            ).exec((err, addressNew) => {
              if (err) {
                ServerError(res, err);
              }
              Response(res);
            });
          }
        });
      }
    });
  }
};
const getAllAddress = async (req, res) => {
  const { userId } = req.user;

  const address = await UserAddress.find({
    user: userId,
    'address.isActive': true,
  });
  if (address) {
    console.log(address);
    if (!address[0]?.address) {
      Response(res, { addresses: [] });
    } else {
      Response(res, { addresses: address[0]?.address });
    }
  }
};
const deleteAddress = (req, res) => {
  const addressId = req.body.data;
  const { userId } = req.user;
  UserAddress.updateOne(
    { user: userId, 'address._id': addressId },
    {
      $set: {
        'address.$.isActive': false,
      },
    },
    {
      arrayFilters: [{ 'address._id': addressId }],
    }
  ).exec((error, result) => {
    if (error) return res.status(400).json({ error });
    if (result) {
      res.status(200).json({ result });
    }
  });
};
const setDefaultAddress = (req, res) => {
  const addressId = req.body.data;
  const { userId } = req.user;
  UserAddress.findOne({ user: userId }).exec((err, userAddress) => {
    if (userAddress) {
      const addressData = userAddress.address;
      let id = '';
      addressData.map((item) => {
        if (item.isDefault) {
          id = item._id;
        }
      });
      UserAddress.updateOne(
        {
          user: userId,
          'address._id': id,
        },
        {
          $set: {
            'address.$.isDefault': false,
          },
        },
        {
          arrayFilters: [{ 'address._id': id }],
        }
      ).exec((error, data) => {
        if (data) {
          UserAddress.updateOne(
            {
              user: userId,
              'address._id': addressId,
            },
            {
              $set: {
                'address.$.isDefault': true,
              },
            },
            {
              arrayFilters: [{ 'address._id': addressId }],
            }
          ).exec((err, data) => {
            if (data) {
              return Response(res);
            }
            return ServerError(res, err);
          });
        }
      });
    }
  });
};
module.exports = {
  addAddress,
  getAllAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
};
