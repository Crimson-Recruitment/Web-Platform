import axios from "axios";
import { AxiosInstance, baseUrl } from "./baseURL"
import { userModel } from "../Models/UserModel";


export const userLogin = async ({email, password}:{email:string;password:string}) => {
    try{
        const response = await axios.post(`${baseUrl}/user/login`,JSON.stringify({email,password}),{
            headers: {
              'Content-Type': 'application/json',
            }})
            if(response?.status == 200) {
                sessionStorage.setItem("userToken", response.data.accessToken)
                sessionStorage.setItem("account", "user")
                return response;
            }
           

    } catch(e:any) {
        console.log(e.response.data.message);
        return e.response;
    }
}

export const userRegister = async(user:userModel) => {
    try{
        const response = await axios.post(`${baseUrl}/user/register`,JSON.stringify(user),{
            headers: {
              'Content-Type': 'application/json',
            }})
            if(response?.status == 200) {
                sessionStorage.setItem("userToken", response.data.accessToken)
                sessionStorage.setItem("account", "user")
                return response;
            }

    } catch(e:any) {
        console.log(e.response.data.message);
        return e.response;
    }
    
   
}