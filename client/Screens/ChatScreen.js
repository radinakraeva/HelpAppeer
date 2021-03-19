import React, {useEffect, useState, useRef} from 'react';
import {View, Text, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, FlatList} from 'react-native';
import msgAPI from '../api/msgAPI';

import ColourPalette from '../Resources/ColourPalette';
import CircleIcon from '../Components/CircleIcon';
import ChatMessage from '../Components/ChatMessage';

const styles = StyleSheet.create({
    chatScreen: {
        height: '100%',
        display: 'flex',
    },
    topSection: {
        height: '15%',
        flexDirection: 'row',
        padding: 10,
    },
    topLeftSection:{
        flex:1,
        justifyContent: 'center',
    },
    titleText:{
        fontSize: 24,
        color: ColourPalette.yellow,
    },
    text:{
        fontSize: 15,
    },
    bottomSection:{
        height: '10%',
        minHeight: 60,
        display: 'flex',
        flexDirection: 'row',
        padding: 5,
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    textInput:{
        backgroundColor: ColourPalette.grey,
        borderRadius: 10,
        padding: 3,
        width: '80%',
        height: '80%',
    },
    messages:{
        display: 'flex',
        height: '70%',

    },
    chatMessages:{
        height: '75%',
        padding: 5
    }
})

export default function ChatScreen({listing_id, username, receiver}){
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState([]);
    const messagesList = useRef();

    useEffect( () => {
        initLoadMessages();
    }, [])

    const initLoadMessages = async () => {
        loadMessages();
        setInterval(loadMessages, 3000);
    }
    const loadMessages = async () =>{
        const m = await msgAPI.getMessages(listing_id);
        setMessages(m.data);
    }

    const sendPushNotification = async (expoPushToken) => {
        const message = {
            to: expoPushToken,
            sound: 'default',
            title: 'Update on your listing!',
            body: 'Tap to view the message',
            data: { someData: 'goes here' },
        };

        await fetch('https://exp.host/--/api/v2/push/send', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Accept-encoding': 'gzip, deflate',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(message),
        });
    };

    const enter = () =>{
        console.log("Sending Message");
        let currentDate = new Date();
        let formattedDate = currentDate.getFullYear() + "-" + (currentDate.getMonth() + 1) + "-" + currentDate.getDate() + " " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds()
        msgAPI.sendMessage(listing_id,username,receiver,newMessage, formattedDate);
        updateNewMessage("");
        messagesList.current.scrollToEnd();

        //send notif to receiver
        const rec = msgAPI.getReceiver(receiver);
        if (rec != '') {
            sendPushNotification(rec).then(()=>console.log("notif sent!"), ()=>console.log("notif failed"));
        }

        setTimeout(loadMessages, 300);
    }

    const updateNewMessage = (input) =>{
        setNewMessage(input);
    }

    function timeDifference(date){
        let date2 = new Date();
        let diffMs = (date2 - Date.parse(date));
        if (Math.floor(diffMs / 86400000) > 1){
            return Math.floor(diffMs / 86400000) + "d";
        }
        if (Math.floor((diffMs % 86400000)/ 3600000) > 1){
            return Math.floor((diffMs % 86400000)/ 3600000) + "h";
        }
        if ((Math.floor(((diffMs % 86400000) % 3600000) / 60000 )) > 0) {
            return (Math.floor(((diffMs % 86400000) % 3600000) / 60000)) + "m";
        }
        return "Just now";
    }

    const makeMessage = (message) => {
        message = message["item"];
        return(
            <ChatMessage
                message={message["msg_contents"]}
                timeSent={timeDifference(message["time_sent"])}
                userSent={message["send_user"] == username}
            />
        );
    }


    return (
        <SafeAreaView style = {styles.chatScreen}>
            <View style = {styles.topSection}>
                <View style = {styles.topLeftSection}>
                    <Text style = {styles.text}>Chat regarding:</Text>
                    <Text style = {styles.titleText}>{listing_id}</Text>
                </View>
            </View>
            <View>
                <FlatList
                    style = {styles.chatMessages}
                    showsVerticalScrollIndicator = {false}
                    data = {messages}
                    keyExtractor = {message => message.msg_id.toString()}
                    renderItem = {makeMessage}
                    ref = {messagesList}
                />
                <View style = {styles.bottomSection}>
                    <TextInput value={newMessage} style = {styles.textInput} placeholder = "Type your message here..." onChangeText = {(input) => updateNewMessage(input)}/>
                    <TouchableOpacity onPress={enter}>
                        <CircleIcon iconName='right' iconColor = {ColourPalette.darkBlue} size ={43}/>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}


