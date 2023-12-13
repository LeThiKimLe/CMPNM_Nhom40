export const customListOrder = (listOrder, listUserAddress) => {
  let newListOrder = [];
  listOrder.map((item) => {
    const address = getAddressUser(listUserAddress, item.user, item.addressId);
    const newOrder = {
      ...item,
      addressDetail: address,
    };
    newListOrder.push(newOrder);
  });
  return newListOrder;
};

const getAddressUser = (listAddress, user, addressId) => {
  let address = {};
  listAddress.map((item) => {
    if (item.user._id === user) {
      for (const addressItem of item.address) {
        if (addressItem._id === addressId) {
          address = addressItem;
        }
      }
    }
  });
  return address;
};

export const customOrderStatusList = (orderStatusList) => {
  let options = [];
  const size = orderStatusList.length;
  if (size === 1) {
    options = [
      {
        value: 'packed',
        label: 'Packaged',
      },
      {
        value: 'cancelled',
        label: 'Canceled',
      },
    ];
  } else if (size > 1 && orderStatusList[size - 1].type == 'packed') {
    options = [
      {
        value: 'shipping',
        label: 'Delivery',
      },
    ];
  } else if (size > 1 && orderStatusList[size - 1].type == 'shipping') {
    options = [
      {
        value: 'delivered',
        label: 'Delivered',
      },
      {
        value: 'refund',
        label: 'Returned',
      },
    ];
  }
  return options;
};
