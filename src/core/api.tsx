import axios from "axios";
import { AxiosCompanyInstance, AxiosInstance, baseUrl } from "./baseURL";
import { userModel } from "../Models/UserModel";
import { CompanyModel } from "../Models/companyModel";
import { JobsModel } from "../Models/JobsModel";

export const userLogin = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const response = await axios.post(
      `${baseUrl}/user/login`,
      JSON.stringify({ email, password }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    if (response?.status == 200) {
      sessionStorage.setItem("userToken", response.data.accessToken);
      sessionStorage.setItem("account", "user");
      sessionStorage.setItem("user", JSON.stringify(response.data.user));
      return response;
    }
  } catch (e: any) {
    return e.response;
  }
};

export const userRegister = async (user: userModel) => {
  try {
    const response = await axios.post(
      `${baseUrl}/user/register`,
      JSON.stringify(user),
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    if (response?.status == 200) {
      sessionStorage.setItem("userToken", response.data.accessToken);
      sessionStorage.setItem("account", "user");
      sessionStorage.setItem("user", JSON.stringify(response.data.user));
      return response;
    }
  } catch (e: any) {
    return e.response;
  }
};

export const companyLogin = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const response = await axios.post(
      `${baseUrl}/company/login`,
      JSON.stringify({ email, password }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    if (response?.status == 200) {
      sessionStorage.setItem("companyToken", response.data.accessToken);
      sessionStorage.setItem("account", "company");
      sessionStorage.setItem("company", JSON.stringify(response.data.company));
      return response;
    }
  } catch (e: any) {
    return e.response;
  }
};

export const companyRegister = async (user: CompanyModel) => {
  try {
    const response = await axios.post(
      `${baseUrl}/company/register`,
      JSON.stringify(user),
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    if (response?.status == 200) {
      sessionStorage.setItem("companyToken", response.data.accessToken);
      sessionStorage.setItem("account", "company");
      sessionStorage.setItem("company", JSON.stringify(response.data.company));
      return response;
    }
  } catch (e: any) {
    return e.response;
  }
};

export const postJob = async (job: JobsModel) => {
  try {
    const response = await AxiosCompanyInstance.post(
      `${baseUrl}/jobs/post-job`,
      JSON.stringify(job),
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    if (response?.status == 200) {
      return response;
    }
  } catch (e: any) {
    return e.response;
  }
};

export const getCompanyJobs = async () => {
  try {
    const response = await AxiosCompanyInstance.get(
      `${baseUrl}/jobs/company-jobs/${
        JSON.parse(sessionStorage.getItem("company")!).id
      }`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    if (response?.status == 200) {
      return response.data;
    }
  } catch (e: any) {
    return e.response;
  }
};

export const updateJob = async (job: JobsModel,id: any) => {
  try {
    const response = await AxiosCompanyInstance.post(
      `${baseUrl}/jobs/update-job/${id}`,
      JSON.stringify(job),
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    if (response?.status == 200) {
      return response;
    }
  } catch (e: any) {
    return e.response;
  }
};

export const getAllJobs = async () => {
  try {
    const response = await AxiosInstance.get(
      `${baseUrl}/jobs/all`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    if (response?.status == 200) {
      return response.data;
    }
  } catch (e: any) {
    return e.response;
  }
};