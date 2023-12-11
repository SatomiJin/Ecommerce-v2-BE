import nodemailer from "nodemailer";
require("dotenv").config();

const sendEmailConfirmOrder = async (data) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: process.env.EMAIL_ACCOUNT,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  let listItems = [];
  const attachImage = [];
  data?.orderItems.forEach((order) => {
    listItems += `<div>
    <div>Bạn đã đặt sản phẩm ${order?.name}</div>
    <div>Số lượng: <b>${order?.amount}</b> Giá tiền: <b>${formattedPrice(order?.price)} VNĐ</b></div>
    </div>`;
    attachImage.push({
      path: order.image,
      filename: order.name,
    });
  });
  const info = await transporter.sendMail({
    from: process.env.EMAIL_ACCOUNT, // sender address
    to: data.email, // list of receivers
    subject: "Bạn đã đặt hàng thành công tại Schwarzer Ritter", // Subject line
    text: "Sau đây là chi tiết sản phẩm đã đặt", // plain text body
    html: `<div><b>Bạn đã đặt hàng thành công tại Schwarzer Ritter</b></div>
    <div>${listItems}</div>
    <div>Phí vận chuyển: <b>${formattedPrice(data?.shippingPrice)} VNĐ</b></div>
    <div>Phương thức thanh toán: ${data?.paymentMethod.name}</div>
    <div>Tổng thanh toán: <b>${formattedPrice(data?.totalPrice)} VNĐ</b></div>
    <div>Tới địa chỉ: <b>${data?.shippingAddress}</b></div>
    <div>Phương thức giao hàng: ${data?.shippingMethod.name}</div>
    `, // html body

    attachments: attachImage,
  });
};

const formattedPrice = (price) => {
  let result = new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price);
  return result;
};
module.exports = {
  sendEmailConfirmOrder,
};
