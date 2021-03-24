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

const setNotifToken = (username) => {
    console.log("setting notif token for " + username)
    return client.post("/setToken", {username: username})
}

const getNotifToken = (reci_user) => {
    console.log('Getting token of receiver');
    return client.post('/getReceiverToken', {username: reci_user});
}

export default { addUser, verifyUser, verify, getUser, getProfileImage, setNotifToken, getNotifToken };

