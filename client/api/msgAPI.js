import client from './client'
import {shouldThrowAnErrorOutsideOfExpo} from 'expo/build/environment/validatorState';

const endpoint = '/messages';

const getOpenConvos= (username) => {
    console.log('Gonna get open convos');
    return client.post("/getOpenConvos", {username: username});
};

const getMessages = (listing_id) => {
    console.log('Gonna get messages');
    return client.post("/getMessages" , {listing_id : listing_id});
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

const getReceiver = (reci_user) => {
    console.log('Getting token of receiver');
    return client.post('/getReceiverToken', {username: reci_user});
}

export default {getOpenConvos, getMessages, sendMessage, getReceiver};


