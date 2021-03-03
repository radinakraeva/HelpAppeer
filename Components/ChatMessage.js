/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import ColourPalette from '../Resources/ColourPalette';

export default function ChatMessage({message, timeSent, userSent}){
    let styles = StyleSheet.create({});
    if(userSent === true){

    }
    return (
        <View>
            <Text>{message}</Text>
            <Text>{timeSent}</Text>
        </View>
    );
}
