import React from 'react';
import {View, Text} from 'react-native';

export default function ChatMessage({message, timeSent, userSent}){
    if(userSent === true){

    }
    return (
        <View>
            <Text>{message}</Text>
            <Text>{timeSent}</Text>
        </View>
    );
}
