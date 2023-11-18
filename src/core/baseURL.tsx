import axios from "axios";

export const baseUrl = "http://localhost:8081/api/v1";
// export const userURL = 'http://localhost:8082';
// export const leaveURL = "http://localhost:8080";


export const AxiosInstance = axios.create({
    headers: {
        Authorization: `${sessionStorage.getItem("token")}`,
        Accept: "application/json"
    }
});