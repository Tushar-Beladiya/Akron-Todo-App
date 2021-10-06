import axios from "axios";

const instance = axios.create({
  baseURL: "https://acv-admin-react.azurewebsites.net/",
});

export const setAuthToken = (token) => {
  if (token) {
    //applying token
    instance.defaults.headers.common["Authorization"] = token;
  } else {
    //deleting the token from header
    delete instance.defaults.headers.common["Authorization"];
  }
};
