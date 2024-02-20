import axios from "axios";

// export const baseUrl = "https://services.crimsonrecruit.com/api/v1";
export const baseUrl = "http://localhost:8081/api/v1";

export const AxiosUserInstance = axios.create({
  headers: {
    Authorization: `${sessionStorage.getItem("userToken")}`,
    "Access-Control-Allow-Origin": true,
    Accept: "application/json",
  },
});

export const AxiosCompanyInstance = axios.create({
  headers: {
    Authorization: `${sessionStorage.getItem("companyToken")}`,
    "Access-Control-Allow-Origin": true,
    Accept: "application/json",
  },
});

const token: string | undefined =
  sessionStorage.getItem("companyToken") !== undefined
    ? sessionStorage.getItem("companyToken")!
    : sessionStorage.getItem("userToken") !== undefined
      ? sessionStorage.getItem("userToken")!
      : undefined;
export const AxiosInstance = axios.create({
  headers: {
    Authorization: `${token}`,
    Accept: "application/json",
  },
});
