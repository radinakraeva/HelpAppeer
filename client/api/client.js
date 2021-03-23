import {create} from "apisauce";
import { NetworkInfo } from "react-native-network-info";


const apiClient = create({
    //baseURL: 'https://devweb2020.cis.strath.ac.uk/kwb18179-nodejs/'
    //Alina's
    /*baseURL: 'http://192.168.1.161:3001'*/
    //Mike's
    /*baseURL: 'http://192.168.1.151:3001'*/

    //MUST USE GENERAL
    baceURL: 'http://10.0.2.2:3001'
})

export default apiClient;

// ssh -L 3306:devweb2020.cis.strath.ac.uk:3306 gwb18150@cafe.cis.strath.ac.uk
