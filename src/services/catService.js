import axiosConfig from "./axiosConfig";

const baseURL = "https://staging.mazaady.com/api/v1/";

export const getCats = () => {
  return axiosConfig.get(baseURL + "get_all_cats");
};

export const getProps = (subCatId) => {
  return axiosConfig.get(baseURL + "properties?cat=" + subCatId);
};

export const getOptChid = (optId) => {
  return axiosConfig.get(baseURL + "get-options-child/" + optId);
};
