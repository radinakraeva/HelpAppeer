import React from 'react';
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import ChatList from '../Components/ChatList';

import ColourPalette from '../Resources/ColourPalette';

export default function ChatListScreen(){
    return (
        <SafeAreaView style = {styles.chatListScreen}>
            <View style = {styles.topSection}>
                <View style = {styles.topLeftSection}>
                    <Text style = {styles.titleText}>Your Current Pending Listings</Text>
                </View>
            </View>

            <ChatList/>
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
