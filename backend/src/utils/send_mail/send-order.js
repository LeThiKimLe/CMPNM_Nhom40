const Mailgen = require('mailgen');
const sendEmail = require('./send-mail');

const customizePrice = (num) =>
  num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
const sendOrderConfirm = async (orderData) => {
  console.log('orderData', orderData);
  const {
    email,
    address,
    totalAmount,
    shipAmount,
    subTotal,
    freeShip,
    paymentType,
    // createdAt,
    items,
    _id,
  } = orderData;

  const { mobileNumber, provinceName, districtName, wardName } = address;
  let payment;

  if (paymentType === 'cod') {
    payment = 'Thanh toán khi nhận hàng';
  } else if (paymentType === 'momo') {
    payment = 'Thanh toán qua ví MoMo';
  } else {
    payment = 'Thanh toán qua ví Paypal';
  }

  const dataProduct = items.map((item) => {
    const { productId, price, purchasedQty } = item;
    const { ram, storage } = productId.detailsProduct;
    return {
      Tên: `${productId.name}`,
      '': `${ram} ${storage} x${purchasedQty}`,
      Giá: `${customizePrice(price)}đ`,
    };
  });
  const mailGenerator = new Mailgen({
    theme: 'neopolitan',
    product: {
      // Appears in header & footer of e-mails
      name: 'MT Shop',
      link: 'http://localhost:3002',
    },
  });
  const emailConfig = {
    body: {
      name: `${address.name}`,
      intro: `Đơn hàng của bạn có mã: ${_id}`,
      table: [
        {
          //
          // Optionally, add a title to each table.
          title: `CHI TIẾT ĐƠN HÀNG`,
          data: dataProduct,
          columns: {
            // Optionally, customize the column widths
            customWidth: {
              Tên: '50%',
              Giá: '10%',
            },
            // Optionally, change column text alignment
            customAlignment: {
              Giá: 'right',
            },
          },
        },
        {
          // Optionally, add a title to each table.
          title: 'CHI TIẾT ĐƠN GIÁ',
          data: [
            {
              '': 'Tổng tiền hàng',
              Giá: `${customizePrice(subTotal)}đ`,
            },
            {
              '': 'Tổng phí vận chuyển',
              Giá: `${customizePrice(shipAmount)}đ`,
            },
            {
              '': 'Tổng giảm phí vận chuyển',
              Giá: `-${customizePrice(freeShip)}đ`,
            },
            {
              '': 'Tổng thanh toán',
              Giá: `${customizePrice(totalAmount)}đ`,
            },
          ],
          columns: {
            customWidth: {
              '': '60%',
            },
            // Optionally, change column text alignment
            customAlignment: {
              Giá: 'right',
            },
          },
        },
        {
          title: 'THÔNG TIN VẬN CHUYỂN',
          data: [
            {
              'Địa chỉ giao hàng': `${address.name} ${mobileNumber}`,
              'Phương thức thanh toán': `${payment}`,
            },
            {
              'Địa chỉ giao hàng': `${wardName}`,
              'Phương thức thanh toán': '',
            },
            {
              'Địa chỉ giao hàng': `${districtName}, ${provinceName}`,
              'Phương thức thanh toán': '',
            },
          ],
          columns: {
            customWidth: {
              'Địa chỉ giao hàng': '60%',
            },
            // Optionally, change column text alignment
            customAlignment: {
              'Địa chỉ giao hàng': 'left',
            },
          },
        },
      ],
      action: {
        instructions:
          'Bạn có thể kiểm tra trạng thái đơn đặt hàng của mình tại đây:',
        button: {
          color: '#3869D4',
          text: 'Xem chi tiết',
          link: `http://localhost:3002/user/order/${_id}`,
        },
      },
      outro: 'Cảm ơn bạn đã mua hàng.',
    },
  };

  const emailBody = mailGenerator.generate(emailConfig);
  sendEmail({
    to: email,
    subject: 'XÁC NHẬN ĐƠN HÀNG',
    html: emailBody,
  });
};
// Configure mailgen by setting a theme and your product info
module.exports = sendOrderConfirm;
