import React from 'react';
import {View, Text, SafeAreaView, StyleSheet,TextInput} from 'react-native';

import ColourPalette from '../Resources/ColourPalette';
import CircleIcon from '../Components/CircleIcon';
import ChatMessages from '../Components/ChatMessages';

const styles = StyleSheet.create({
    chatScreen: {
        height: '100%',
        display: 'flex',
    },
    topSection: {
        height: '15%',
        flexDirection: 'row',
        padding: 10,
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
    bottomSection:{
        height: '10%',
        minHeight: 60,
        display: 'flex',
        flexDirection: 'row',
        padding: 5,
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    textInput:{
        backgroundColor: ColourPalette.grey,
        borderRadius: 10,
        padding: 3,
        width: '80%',
        height: '80%',
    },
    messages:{
        display: 'flex',
        height: '70%',

    }
})

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
                <ChatMessages style = {styles.messages}/>
                <View style = {styles.bottomSection}>
                    <TextInput style = {styles.textInput} placeholder = "Type your message here..."/>
                    <CircleIcon iconName='right' iconColor = {ColourPalette.darkBlue} size ={43} />
                </View>
            </View>
        </SafeAreaView>
    );
}


