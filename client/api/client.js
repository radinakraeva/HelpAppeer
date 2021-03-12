import {create} from "apisauce";

const apiClient = create({
    baseURL: 'http://192.168.1.161:3001'
})

export default apiClient;
