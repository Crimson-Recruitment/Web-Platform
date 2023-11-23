import { ChangePasswordModel } from "../Models/ChangePasswordModel";
import { UserUpdateModel } from "../Models/UserUpdateModel";
import { AxiosUserInstance, baseUrl } from "./baseURL";

export const updateUser = async (user: UserUpdateModel) => {
    try {
        const response = await AxiosUserInstance.post(`${baseUrl}/user/update`,JSON.stringify(user) ,{
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

export const changePassword = async (password: ChangePasswordModel) => {
    try {
        const response = await AxiosUserInstance.post(`${baseUrl}/user/change-password`,JSON.stringify(password) ,{
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