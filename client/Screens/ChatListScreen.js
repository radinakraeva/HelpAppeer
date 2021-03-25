import React, {useEffect, useState} from 'react';
import {View, Text, SafeAreaView, StyleSheet, FlatList} from 'react-native';
import msgAPI from '../api/msgAPI';
import ColourPalette from '../Resources/ColourPalette';
import ChatSelector from '../Components/ChatSelector';
import usersApi from '../api/usersApi';
import IconButton from '../Components/IconButton';
import {useNavigation} from "@react-navigation/native";

export default function ChatListScreen(props){

    const [openConvos, setOpenConvos] = useState([]);
    const [convoNames, setConvoNames] = useState([]);
    const navigation = useNavigation();
    useEffect(() => {
        const loadConvos = () => {
            loadOpenConvos().then(() => {
            });
            loadConvoNames().then(() => {
            });
        }
        loadConvos();
        let convoUpdater = setInterval(loadConvos, 3000);
        return function() {
            clearInterval(convoUpdater);
        }
    }, [])



    const loadOpenConvos = async () => {
        const x = await msgAPI.getOpenConvos(global.username);
        setOpenConvos(x.data);
    }

    const loadConvoNames = async () => {
        const names = await msgAPI.getConvoNames();
        setConvoNames(names.data);

    }



    function timeDifference(date) {
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

    const goBack = () => {
        navigation.navigate("DrawerNavigation", {screen: "Feed"} );

    };

    const getChatSelector =  (convo) => {
        convo = convo["item"];
        let userN = "";
        let unread = false;
        if (convo.send_user === global.username) {
            userN = convo.reci_user;
        } else {
            userN = convo.send_user;
            if(convo.receiver_seen == '0'){
                unread = true;
            }
        }
        return (
            <ChatSelector
                listingName={getChatName(convo.listing_id)}
                profilePictureID={userN}
                timeSinceMRM={timeDifference(convo["time_sent"])}
                mostRecentMessage={convo["msg_contents"]}
                unread={unread}
                username={global.username}
                receiver={userN}
                listing_id={convo["listing_id"]}
            />
        );
    };

    const getChatName = (id) =>{
        for (let index in convoNames){
            if(convoNames[index].listing_id == id){
                if (convoNames[index].listingName.length >= 25){
                    return convoNames[index].listingName.slice(0,24) + "...";
                }
                return convoNames[index].listingName;
            }
        }
        return null
    }

    const chatList = () => {
        if (openConvos.length == 0) {
            return(
                <View style = {styles.back}>
                    <Text style = {styles.emptyText}>You have no listings pending. Make a listing and wait for someone to accept it or go accept someone
                        else's listing</Text>
                </View>);
        } else {
            return(
                <FlatList
                    data={openConvos}
                    keyExtractor={convo => convo.msg_id.toString()}
                    renderItem={getChatSelector}/>);
        }
    }

    return (
        <SafeAreaView style = {styles.chatListScreen}>
            <View style = {styles.topSection}>
                <View style = {styles.topLeftSection}>
                    <Text style = {styles.titleText}>Messages</Text>
                </View>
                <View style={styles.backButton}>
                    <IconButton iconName={'back'} onPress={goBack} iconBgColor={ColourPalette.darkBlue} size={35}/>
                </View>
            </View>
            {chatList()}
        </SafeAreaView>
    );


}

const styles = StyleSheet.create({
    chatListScreen: {
        height: '100%',
        padding : 5
    },
    topSection: {
        height: '15%',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    topLeftSection:{
        flex:1,
        justifyContent: 'center',
    },
    titleText:{
        fontSize: 24,
        color: ColourPalette.darkBlue,
    },
    emptyText: {
        margin: 10,
        textAlign: 'center'
    },
    back: {
        borderRadius: 10,
        backgroundColor: ColourPalette.grey,
        width: '60%',
        alignSelf: 'center',
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
