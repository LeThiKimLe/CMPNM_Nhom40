const Mailgen = require('mailgen');
const sendEmail = require('./send-mail');

const customizePrice = (num) =>
  num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
const sendOrderConfirm = async (orderData) => {
  const {
    email,
    address,
    totalAmount,
    shipAmount,
    subTotal,
    freeShip,
    paymentType,
    items,
    _id,
  } = orderData;

  const { mobileNumber, provinceName, districtName, wardName } = address;
  let payment;
  if (paymentType === 'cod') {
    payment = 'Pay upon delivery';
  } else if (paymentType === 'momo') {
    payment = 'Payment via MoMo wallet';
  } else {
    payment = 'Pay via Paypal wallet';
  }

  const dataProduct = items.map((item) => {
    const { productId, price, purchasedQty } = item;
    const { ram, storage, name } = productId;
    return {
      Name: `${name}`,
      '': `${ram} ${storage} x${purchasedQty}`,
      Price: `${customizePrice(price)}đ`,
    };
  });
  const mailGenerator = new Mailgen({
    theme: 'neopolitan',
    product: {
      // Appears in header & footer of e-mails
      name: 'Nhom 50',
      link: 'http://localhost:3002',
    },
  });
  const emailConfig = {
    body: {
      name: `${address.name}`,
      intro: `Your order has code: ${_id}`,
      table: [
        {
          title: `ORDER DETAILS`,
          data: dataProduct,
          columns: {
            customWidth: {
              Name: '50%',
              Price: '10%',
            },
            customAlignment: {
              Price: 'right',
            },
          },
        },
        {
          title: 'UNIT PRICE DETAILS',
          data: [
            {
              '': 'Total cost',
              Price: `${customizePrice(subTotal)}đ`,
            },
            {
              '': 'Total shipping fee',
              Price: `${customizePrice(shipAmount)}đ`,
            },
            {
              '': 'Total shipping fee reduction',
              Price: `-${customizePrice(freeShip)}đ`,
            },
            {
              '': 'Total payment',
              Price: `${customizePrice(totalAmount)}đ`,
            },
          ],
          columns: {
            customWidth: {
              '': '60%',
            },
            // Optionally, change column text alignment
            customAlignment: {
              Price: 'right',
            },
          },
        },
        {
          title: 'SHIPPING INFORMATION',
          data: [
            {
              'Delivery address': `${address.name} ${mobileNumber}`,
              'Payment method': `${payment}`,
            },
            {
              'Delivery address': `${wardName}`,
              'Payment methods': '',
            },
            {
              'Delivery address': `${districtName}, ${provinceName}`,
              'Payment methods': '',
            },
          ],
          columns: {
            customWidth: {
              'Delivery address': '60%',
            },
            // Optionally, change column text alignment
            customAlignment: {
              'Delivery address': 'left',
            },
          },
        },
      ],
      action: {
        instructions:
          'You can check your order status here:',
        button: {
          color: '#3869D4',
          text: 'See details',
          link: `http://localhost:3002/user/order/${_id}`,
        },
      },
      outro: 'Thank you for your purchase.',
    },
  };

  const emailBody = mailGenerator.generate(emailConfig);
  sendEmail({
    to: email,
    subject: 'CONFIRM ORDER',
    html: emailBody,
  });
};
module.exports = sendOrderConfirm;
