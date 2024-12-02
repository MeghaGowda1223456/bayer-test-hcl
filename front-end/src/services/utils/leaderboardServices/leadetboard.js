import serviceUtil from "../index";

const config = {
  headers: {
    "content-type": "application/json",
    "x-api-key": "DIkVHZcD8C7YpxIy614uS84SOXlCczXHUSg4kQh1",
  },
};

const leadetboardTableData = (datas) => {
  console.log("leadf is ", datas);
  return serviceUtil
    .post(`/updateLeaderboard`, datas, config)
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

export { leadetboardTableData };
