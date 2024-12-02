import serviceUtil from "../index";
const config = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "content-type": "application/json",
  },
};
const getwalletBalance = (datas) => {
  return serviceUtil
    .post(`/fetchBalanceAPI`, datas, config)
    .then((res) => {
      const data = res && res.data;
      return { data };
    })
    .catch((err) => {
      console.log("error", err);
      const errRes = err && err?.response?.data;
      return { errRes };
    });
};

export { getwalletBalance };
