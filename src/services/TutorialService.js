import http from "../http-common";

const getAll = () => {
  return http.get("/tutorials");
};

const create = data => {
  return http.post("/tutorials", data);
};

const findByTitle = title => {
  return http.get(`/tutorials?title=${title}`);
};

export default {
  getAll,
  create,
  findByTitle
};
