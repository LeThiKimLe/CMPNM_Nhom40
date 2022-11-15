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
