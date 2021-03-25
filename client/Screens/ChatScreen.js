import React, {useEffect, useRef, useState} from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import msgAPI from '../api/msgAPI';
import ColourPalette from '../Resources/ColourPalette';
import CircleIcon from '../Components/CircleIcon';
import ChatMessage from '../Components/ChatMessage';
import IconButton from '../Components/IconButton';
import {useNavigation} from "@react-navigation/native";
import pushNotifications from '../Resources/pushNotifications';
import usersApi from '../api/usersApi';


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
        color: ColourPalette.darkBlue,
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
    },
    backButton: {
        flex:2,
        marginTop:40,
        marginRight:20,
        position: 'absolute',
        top:0,
        right:0
    },
})

export default function ChatScreen(props){
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const messagesList = useRef();
    const listing_id = props.route.params.listing_id;
    const username = global.username;
    const receiver = props.route.params.receiver;
    const listingName = props.route.params.listingName;
    const navigation = useNavigation();
    let pageOpen = true;


    useEffect( () => {
        loadMessages().then(r => {});
        let messageUpdater = setInterval(loadMessages, 3000);
        return function(){
            clearInterval(messageUpdater);
        }
    }, [])

    async function initLoadMessages() {

    }
    const loadMessages = async () =>{
        if(pageOpen === true) {
            const m = await msgAPI.getMessages(listing_id, username);
            setMessages(m.data);
        }
    }
    initLoadMessages().then(r => {});

    const enter = () =>{
        let currentDate = new Date();
        let formattedDate = currentDate.getFullYear() + "-" + (currentDate.getMonth() + 1) + "-" + currentDate.getDate() + " " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds()
        msgAPI.sendMessage(listing_id, username, receiver, newMessage, formattedDate).then(r  => {});
        updateNewMessage("");
        messagesList.current.scrollToEnd();

        sendNotif()

        setTimeout(loadMessages, 300);
    }

    const sendNotif = () => {
        usersApi.getNotifToken(receiver).then(r=> {
            if (r.data != null) {
                const token = r.data[0];
                pushNotifications.sendPushNotification(token, listingName).then(

                )
            }
        })
    }

    const updateNewMessage = (input) =>{
        setNewMessage(input);
    }

    const goBack = () => {
        pageOpen = false;
        navigation.navigate('DrawerNavigation', {screen: "Messages"})
    };

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

    if(props.route.params.nowPending === true){
        let currentDate = new Date();
        let formattedDate = currentDate.getFullYear() + "-" + (currentDate.getMonth() + 1) + "-" + currentDate.getDate() + " " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds()
        msgAPI.sendMessage(listing_id,username,receiver,
            "Hi! I have accepted the listing you posted ( the name is above :) ) I'm on my way to pick it up now. If you have any questions, let me know, and I'll ask you if I have any questions. See you soon",
            formattedDate);
        sendNotif()
        props.route.params.nowPending = false;
    }

    return (
        <SafeAreaView style = {styles.chatScreen}>
            <View style = {styles.topSection}>
                <View style = {styles.topLeftSection}>
                    <Text style = {styles.text}>Chat regarding:</Text>
                    <Text style = {styles.titleText}>{listingName}</Text>
                    <View style={styles.backButton}>
                        <IconButton iconName={'back'} onPress={goBack} iconBgColor={ColourPalette.darkBlue} size={35}/>
                    </View>
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
