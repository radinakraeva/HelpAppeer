import client from './client'

const getOpenConvos= (username) => {
    console.log('Gonna get open convos');
    return client.post("/getOpenConvos", {username: username});
};

const getMessages = (listing_id, username) => {
    console.log('Gonna get messages');
    return client.post("/getMessages" , {listing_id : listing_id,  username: username});
};

const sendMessage = (listing_id, send_user, reci_user, msg_contents, time_sent) => {
    console.log('Gonna send a message');
    return client.post("/sendMessage",
        {listing_id: listing_id,
        send_user: send_user,
        reci_user: reci_user,
        msg_contents: msg_contents,
        time_sent: time_sent});
}

const getConvoNames = () => {
    console.log('Getting convo names');
    return client.post('/getConvoNames', {});
}

export default {getOpenConvos, getMessages, sendMessage, getConvoNames};


