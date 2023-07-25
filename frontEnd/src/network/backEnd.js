import axios from "axios";
import Cookies from "js-cookie";
export const  backEndInstance = axios.create({
    baseURL:"http://localhost:4000",
})

backEndInstance.interceptors.request.use(function(config){
    config.headers["Authorization"]=Cookies.get("Authorization")
    return config
})