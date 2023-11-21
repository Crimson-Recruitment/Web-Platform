import { ApplicationApplyModel } from "../Models/ApplicationApplyModel";
import { AxiosCompanyInstance, AxiosUserInstance, baseUrl } from "./baseURL";

export const createApplication = async(apply:ApplicationApplyModel, id:number) => {
    try {
        const response = await AxiosUserInstance.post(`${baseUrl}/applications/create-application/${id}`,JSON.stringify(apply), {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response?.status == 200) {
          return response;
        }
      } catch (e: any) {
        return e.response;
      }

}

export const getUserApplications = async () => {
    try {
        const response = await AxiosUserInstance.get(`${baseUrl}/applications/user-applications`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response?.status == 200) {
          return response.data;
        }
      } catch (e: any) {
        return e.response;
      }

}

export const getCompanyApplications = async () => {
    try {
        const response = await AxiosCompanyInstance.get(`${baseUrl}/applications/company-applications`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response?.status == 200) {
          return response.data;
        }
      } catch (e: any) {
        return e.response;
      }

}