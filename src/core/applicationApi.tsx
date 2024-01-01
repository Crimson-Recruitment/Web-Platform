import { ApplicationApplyModel } from "../Models/ApplicationApplyModel";
import { IMeetingInfo } from "../Models/MeetingInfoModel";
import { AxiosCompanyInstance, AxiosUserInstance, baseUrl } from "./baseURL";

export const createApplication = async (
  apply: ApplicationApplyModel,
  id: number,
) => {
  try {
    const response = await AxiosUserInstance.post(
      `${baseUrl}/applications/create-application/${id}`,
      JSON.stringify(apply),
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    if (response?.status === 200) {
      return response;
    }
  } catch (e: any) {
    return e.response;
  }
};

export const getUserApplications = async () => {
  try {
    const response = await AxiosUserInstance.get(
      `${baseUrl}/applications/user-applications`,
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

export const getCompanyApplications = async () => {
  try {
    const response = await AxiosCompanyInstance.get(
      `${baseUrl}/applications/company-applications`,
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

export const setApplicationStatus = async (
  state: { status: string },
  id: number,
) => {
  try {
    const response = await AxiosCompanyInstance.post(
      `${baseUrl}/applications/update-application/${id}`,
      JSON.stringify(state),
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

export const scheduleMeeting = async (meetingInfo:IMeetingInfo, id:number) => {
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
}

export const getCode = async (accessToken:string, code:string) => {
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
}

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
}