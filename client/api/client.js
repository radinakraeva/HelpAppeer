import {create} from "apisauce";

const apiClient = create({
    //Alina's
    baseURL: 'http://192.168.1.161:3001'
    //Arthur's
    //baseURL: 'http://192.168.1.151:3001'
})

export default apiClient;
