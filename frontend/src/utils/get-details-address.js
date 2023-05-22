const getAPIProvince = async () => {
  const response = await fetch(
    'https://online-gateway.ghn.vn/shiip/public-api/master-data/province',
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Origin: 'cors',
        Host: 'api.producthunt.com',
        token: `53cff26c-f9d5-11ec-ad26-3a4226f77ff0`,
      },
    }
  ).then((response) => response.json());

  // update the state
  if (response.code === 200) {
    console.log(response.data);
    return response.data;
  }
};

const getAPIDistrict = async (value) => {
  const response = await fetch(
    `https://online-gateway.ghn.vn/shiip/public-api/master-data/district?province_id=${value}`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Origin: 'cors',
        Host: 'api.producthunt.com',
        token: `53cff26c-f9d5-11ec-ad26-3a4226f77ff0`,
      },
    }
  ).then((response) => response.json());

  // update the state
  if (response.code === 200) {
    console.log(response);
    return response.data;
  }
};

const getAPIWard = async (value) => {
  const response = await fetch(
    `https://online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=${value}`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Origin: 'cors',
        Host: 'api.producthunt.com',
        token: `53cff26c-f9d5-11ec-ad26-3a4226f77ff0`,
      },
    }
  ).then((response) => response.json());
  // update the state
  if (response.code === 200) {
    console.log(response);
    return response.data;
  }
};

const getAddressDefault = (userAddresses, indexKey) => {
  let address = {};
  userAddresses.map((item, index) => {
    if (index === indexKey) {
      address = item;
    }
  });
  return address;
};
const getIndexDefault = (userAddresses) => {
  const pos = userAddresses.map((e) => e.isDefault).indexOf(true);
  return pos;
};
const getAddressAPI = {
  getAPIProvince,
  getAPIDistrict,
  getAPIWard,
  getAddressDefault,
  getIndexDefault,
};
export default getAddressAPI;
