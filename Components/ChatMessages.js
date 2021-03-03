/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';

import ColourPalette from '../Resources/ColourPalette';
import CircleIcon from '../Components/CircleIcon';
import ChatMessage from '../Components/ChatMessage';

export default function ChatMessages(){
    return (
        <View>
            <ChatMessage message={"Hi"} timeSent={"14:45"} userSent={false}/>
            <ChatMessage message={"Aldi doesn't have any full fat milk"} timeSent={"14:45"} userSent={false}/>
            <ChatMessage message={"Do they have anything else?"} timeSent={"14:46"} userSent={true}/>
            <ChatMessage message={"They have semi skimmed"} timeSent={"14:47"} userSent={false}/>
            <ChatMessage message={"Semi skimmed is good"} timeSent={"14:50"} userSent={true}/>
        </View>
    );
}
