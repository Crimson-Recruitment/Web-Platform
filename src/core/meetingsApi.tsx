import { ApplicationApplyModel } from "../Models/ApplicationApplyModel";
import { IMeetingInfo } from "../Models/MeetingInfoModel";
import { AxiosCompanyInstance, AxiosUserInstance, baseUrl } from "./baseURL";


export const scheduleMeeting = async (
    meetingInfo: IMeetingInfo,
    id: number, // application ID
  ) => {
    try {
      const response = await AxiosCompanyInstance.post(
        `${baseUrl}/meeting/schedule-meeting/${id}`,
        JSON.stringify(meetingInfo),
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      if (response?.status === 200) {
        return response.data;
      }
    } catch (e: any) {
      return e.response;
    }
  };
  
  

export const getCode = async (accessToken: string, code: string) => {
    try {
      const response = await AxiosCompanyInstance.post(
        `${baseUrl}/meeting/get-code?accessCode=${accessToken.trim()}&code=${code.trim()}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      if (response?.status === 200) {
        return response.data;
      }
    } catch (e: any) {
      return e.response;
    }
  };
  
  export const getRefreshToken = async () => {
    try {
      const response = await AxiosCompanyInstance.get(
        `${baseUrl}/meeting/refresh-token`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      if (response?.status === 200) {
        return response.data;
      }
    } catch (e: any) {
      return e.response;
    }
  };

   export const getCompanyMeetings = async () => {
    try {
      const response = await AxiosCompanyInstance.get(
        `${baseUrl}/meeting/company-meetings/${JSON.parse(sessionStorage.getItem("company")!).id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      if (response?.status === 200) {
        return response.data;
      }
    } catch (e: any) {
      return e.response;
    }
  };

  
  export const getUserMeetings = async () => {
    try {
      const response = await AxiosCompanyInstance.get(
        `${baseUrl}/meeting/user-meetings/${JSON.parse(sessionStorage.getItem("user")!).id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      if (response?.status === 200) {
        return response.data;
      }
    } catch (e: any) {
      return e.response;
    }
  };