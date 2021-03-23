import React, {useEffect, useState} from 'react';
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import ChatList from '../Components/ChatList';
import msgAPI from '../api/msgAPI';
import ColourPalette from '../Resources/ColourPalette';

export default function ChatListScreen(props){


    const [openConvos, setOpenConvos] = useState([]);
    const [convoNames, setConvoNames] = useState([]);

    useEffect( () => {
        loadOpenConvos();
        loadConvoNames();
    }, [])

    const loadOpenConvos = async () => {
        const x = await msgAPI.getOpenConvos(props.route.params.username);
        setOpenConvos(x.data);
    }

    const loadConvoNames = async () => {
        const names = await msgAPI.getConvoNames();
        setConvoNames(names);
    }

    console.log(convoNames);
    return (
        <SafeAreaView style = {styles.chatListScreen}>
            <View style = {styles.topSection}>
                <View style = {styles.topLeftSection}>
                    <Text style = {styles.titleText}>Your Current Pending Listings</Text>
                </View>
            </View>
            <ChatList openConvos={openConvos} convoNames = {convoNames} props = {props}/>
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
    }
})
