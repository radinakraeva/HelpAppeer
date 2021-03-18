import React, {useEffect, useState} from 'react';
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import ChatList from '../Components/ChatList';
import msgAPI from '../api/msgAPI';
import ColourPalette from '../Resources/ColourPalette';

export default function ChatListScreen({username}){

    const [openConvos, setOpenConvos] = useState([]);

    useEffect( () => {
        loadOpenConvos();
    }, [])

    const loadOpenConvos = async () => {
        const x = await msgAPI.getOpenConvos(username);
        setOpenConvos(x.data);
    }

    return (
        <SafeAreaView style = {styles.chatListScreen}>
            <View style = {styles.topSection}>
                <View style = {styles.topLeftSection}>
                    <Text style = {styles.titleText}>Your Current Pending Listings</Text>
                </View>
            </View>
            <ChatList openConvos={openConvos}/>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    chatListScreen: {
        height: '100%',
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
        color: ColourPalette.yellow,
    }
})
