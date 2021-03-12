import client from './client'

const endpoint = '/users';

const getUsers = () => client.get(endpoint);

const addUser = (userInfo) => {
    return client.post("/users", userInfo);
}

export default { addUser };
