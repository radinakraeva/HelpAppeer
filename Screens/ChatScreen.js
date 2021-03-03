/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import ChatList from '../Components/ChatList';

import ColourPalette from '../Resources/ColourPalette';
import CircleIcon from '../Components/CircleIcon';
import Button from '../Components/Button';
import ChatMessages from '../Components/ChatMessages';

export default function ChatScreen({listingName}){
    return (
        <SafeAreaView style = {styles.chatScreen}>
            <View style = {styles.topSection}>
                <View style = {styles.topLeftSection}>
                    <Text style = {styles.text}>Chat regarding:</Text>
                    <Text style = {styles.titleText}>{listingName}</Text>
                </View>
            </View>
            <View>
                <ChatMessages/>
                <View>
                    <ChatTextBox/>
                    <CircleIcon iconName='right' iconColor = {ColourPalette.darkBlue} size ={43} />
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    chatScreen: {
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
    },
    text:{
        fontSize: 15,
    },
})
