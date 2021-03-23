import React, {useEffect, useState} from 'react';
import {View, Text, SafeAreaView, StyleSheet, FlatList} from 'react-native';
import msgAPI from '../api/msgAPI';
import ColourPalette from '../Resources/ColourPalette';
import ChatSelector from '../Components/ChatSelector';

export default function ChatListScreen(props){


    const [openConvos, setOpenConvos] = useState([]);
    const [convoNames, setConvoNames] = useState([]);

    useEffect( () => {
        loadOpenConvos().then(() => {});
        loadConvoNames().then(() => {});
    }, [])

    const loadOpenConvos = async () => {
        const x = await msgAPI.getOpenConvos(props.route.params.username);
        setOpenConvos(x.data);
    }

    const loadConvoNames = async () => {
        const names = await msgAPI.getConvoNames();
        setConvoNames(names.data);
    }

    function timeDifference(date) {
        let date2 = new Date();
        let diffMs = (date2 - Date.parse(date));
        if (Math.floor(diffMs / 86400000) > 1) {
            return Math.floor(diffMs / 86400000) + "d";
        }
        if (Math.floor((diffMs % 86400000) / 3600000) > 1) {
            return Math.floor((diffMs % 86400000) / 3600000) + "h";
        }
        return (Math.floor(((diffMs % 86400000) % 3600000) / 60000)) + "m";

    }

    const getChatSelector = (convo) => {
        convo = convo["item"];
        return (
            <ChatSelector
                listingName={getChatName(convo.listing_id)}
                profilePicture={require('../Resources/Images/Ludwig.jpg')}
                timeSinceMRM={timeDifference(convo["time_sent"])}
                mostRecentMessage={convo["msg_contents"]}
                unread={false}
                username = {convo["send_user"]}
                receiver={convo["reci_user"]}
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
            return (
                <View style = {styles.back}>
                    <Text style = {styles.emptyText}>You have no listings pending. Make a listing and wait for someone to accept it or go accept someone
                        else's listing</Text>
                </View>);
        } else {
            return (
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
                    <Text style = {styles.titleText}>Your Current Pending Listings</Text>
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
    }
})
