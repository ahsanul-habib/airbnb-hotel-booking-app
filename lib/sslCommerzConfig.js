import { SslCommerzPayment } from "sslcommerz";

const store_id = process.env.SSLCommertz_STORE_ID;
const store_passwd = process.env.SSLCommertz_STORE_PASSWORD;
const is_live = false;

export const sslConfig = new SslCommerzPayment(store_id, store_passwd, is_live);

export const dataConfig = ({
  total_amount,
  tran_id,
  success_url,
  fail_url,
  cancel_url,
  product_name,
  product_category,
  cus_name,
  cus_email,
  cus_add1,
  cus_phone,
}) => {
  const data = {
    total_amount,
    tran_id,
    currency: "BDT",
    success_url,
    fail_url,
    cancel_url,
    ipn_url: "http://localhost:3030/ipn",
    shipping_method: "Courier",
    product_name,
    product_category,
    product_profile: "general",
    cus_name,
    cus_email,
    cus_add1,
    cus_add2: "Dhaka",
    cus_city: "Dhaka",
    cus_state: "Dhaka",
    cus_postcode: "1000",
    cus_country: "Bangladesh",
    cus_phone,
    cus_fax: "01711111111",
    ship_name: "Customer Name",
    ship_add1: "Dhaka",
    ship_add2: "Dhaka",
    ship_city: "Dhaka",
    ship_state: "Dhaka",
    ship_postcode: 1000,
    ship_country: "Bangladesh",
  };
  return data;
};
