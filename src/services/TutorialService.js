import http from "../http-common";

const getAll = () => {
  return http.get("/tutorials?limit=10");
};

const create = (data) => {
  return http.post("/tutorials", data);
};

const findByTitle = (description) => {
  return http.get(`/tutorials?description=${description}`);
};

export default {
  getAll,
  create,
  findByTitle,
};
