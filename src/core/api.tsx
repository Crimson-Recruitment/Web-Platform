import axios from "axios";
import { AxiosInstance, baseUrl } from "./baseURL"
import { userModel } from "../Models/UserModel";


export const userLogin = async ({email, password}:{email:string;password:string}) => {
    const response = await axios.post(`${baseUrl}/user/login`,{email:email, password:password})
    console.log(response);
}

export const userRegister = async(user:userModel) => {
    try{
        const response = await axios.post(`${baseUrl}/user/register`,JSON.stringify(user),{
            headers: {
              'Content-Type': 'application/json',
            }})
            if(response?.status == 200) {
                sessionStorage.setItem("token", response.data.accessToken)
            }
            console.log(response);

    } catch(e:any) {
        console.log(e.response.data.message);
    }
    
   
}