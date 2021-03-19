import {create} from "apisauce";
import { NetworkInfo } from "react-native-network-info";

// const ipAddress = await NetworkInfo.getIPAddress();
const ipAddress = async () => {
    // console.log(ip);
    let ipAddress = await NetworkInfo.getIPAddress()
    return ipAddress
    NetworkInfo.getIPAddress().then(ipAddress => {
        return ipAddress
    })
}

const apiClient = create({
    //Alina's
    baseURL: 'http://192.168.1.161:3001'
    //Arthur's
    // baseURL: 'http://192.168.1.151:3001'
    //Slavka's
    //baseURL: 'http://10.136.131.79:3001'
    //Ludwig's
    // baseURL: 'http://192.168.1.70:3001'
})

export default apiClient;



// ssh -L 3306:devweb2020.cis.strath.ac.uk:3306 gwb18150@cafe.cis.strath.ac.uk
