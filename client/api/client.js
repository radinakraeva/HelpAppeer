import {create} from "apisauce";

const apiClient = create({
    //Alina's
    //baseURL: 'http://192.168.1.161:3001'
    //Arthur's
    baseURL: 'http://192.168.1.151:3001'
    //Slavka
    //baseURL: 'http://10.136.131.79:3001'
})

export default apiClient;



// ssh -L 3306:devweb2020.cis.strath.ac.uk:3306 gwb18150@cafe.cis.strath.ac.uk
