import axios from "axios";

export const baseUrl = "http://crimson.eu-north-1.elasticbeanstalk.com/api/v1";
// export const userURL = 'http://localhost:8082';
// export const leaveURL = "http://localhost:8080";

export const AxiosUserInstance = axios.create({
  headers: {
    Authorization: `${sessionStorage.getItem("userToken")}`,
    Accept: "application/json",
  },
});

export const AxiosCompanyInstance = axios.create({
  headers: {
    Authorization: `${sessionStorage.getItem("companyToken")}`,
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
