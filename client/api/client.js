import {create} from "apisauce";
import { NetworkInfo } from "react-native-network-info";


const apiClient = create({
    baseURL: 'https://devweb2020.cis.strath.ac.uk/kwb18179-nodejs/'

    //MUST USE GENERAL
    // baseURL: 'http://10.0.2.2:3001'

})

export default apiClient;

