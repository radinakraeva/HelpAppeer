import client from './client'

const endpoint = '/users';

const verifyUser = (userInfo) => {
    return client.post("/verify", userInfo);
}

const verify = (userInfo) => {
    return client.post("/verifying", userInfo);
}

const addUser = (userInfo) => {
    return client.post("/register", userInfo);
}

export default { addUser, verifyUser, verify
};

