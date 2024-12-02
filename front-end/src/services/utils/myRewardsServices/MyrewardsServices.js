import serviceUtil from "../index";
const config = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "content-type": "application/json",
  },
};
const getRewardPoints = (datas) => {
  return serviceUtil
    .post(`/peerGoodyPoints`, datas, config)
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

export { getRewardPoints };
