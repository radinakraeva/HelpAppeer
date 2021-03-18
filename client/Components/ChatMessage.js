import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import ColourPalette from '../Resources/ColourPalette';

export default function ChatMessage({message, timeSent, userSent}){
    let styles = StyleSheet.create();
    if(userSent === true){
        styles = StyleSheet.create({
            messageBox: {
                backgroundColor: ColourPalette.darkBlue,
                borderRadius: 10,
                maxWidth: '60%',
                margin: 5,
                paddingVertical: 4,
                paddingHorizontal: 10,
                display: 'flex',
                alignSelf: 'flex-end',
                justifyContent: 'flex-end',
            },
            text:{
                color: ColourPalette.grey,
                display: 'flex',
                alignSelf: 'flex-end',
                flexDirection: 'row-reverse',
            },
            time:{
                color: ColourPalette.grey,
                fontSize: 10,
                display: 'flex',
                alignSelf: 'flex-end',
                flexDirection: 'row-reverse',
            }
        })
    }
    else{
        styles = StyleSheet.create({
            messageBox: {
                backgroundColor: ColourPalette.grey,
                borderRadius: 10,
                maxWidth: '60%',
                margin: 5,
                paddingVertical: 4,
                paddingHorizontal: 10,
                display: 'flex',
                alignSelf: 'flex-start',
                justifyContent: 'flex-start',
            },
            text:{
                color: '#000',
                display: 'flex',
                alignSelf: 'flex-start',
                flexDirection: 'row',
            },
            time:{
                color: '#000',
                fontSize: 10,
                display: 'flex',
                alignSelf: 'flex-start',
                flexDirection: 'row',
            }
        })
    }
    return (
        <View style = {styles.messageBox}>
            <Text style = {styles.text}>{message}</Text>
            <Text style = {styles.time}>{timeSent}</Text>
        </View>
    );
}
