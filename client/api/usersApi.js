import client from './client'

const endpoint = '/users';

const verifyUser = (userInfo) => {
    return client.post("/verify", userInfo);
}

const verify = (userInfo) => {
    console.log("This Place");
    return client.post("/verifying", userInfo);
}

const addUser = (userInfo) => {
    return client.post("/register", userInfo);
}

const getUser = (userN) => {
    return client.post("/registers", userN);
}

const getProfileImage = (username) => {
    console.log("userAPI profile data is" + username);
    return client.post("/getProfilePhoto", username);
}

export default { addUser, verifyUser, verify, getUser, getProfileImage };

