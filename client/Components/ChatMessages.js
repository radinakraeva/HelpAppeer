import React, {useRef} from 'react';
import {View,StyleSheet, ScrollView} from 'react-native';
import ChatMessage from '../Components/ChatMessage';

const styles = StyleSheet.create({
    messages:{
        height: '75%',
    }
})

const chatMessages = () => {
    const messageView = useRef();
    return (<ScrollView style = {styles.messages} showHorizontalScrollIndicator = {false}
                ref={messageView}
                onContentSizeChange={() => messageView.current.scrollToEnd({animated: true})}>
        <ChatMessage message={"Hi"} timeSent={"14:45"} userSent={false}/>
        <ChatMessage message={"Aldi doesn't have any full fat"} timeSent={"14:45"} userSent={false}/>
        <ChatMessage message={"Do they have anything else?"} timeSent={"14:46"} userSent={true}/>
        <ChatMessage message={"They have semi skimmed"} timeSent={"14:47"} userSent={false}/>
        <ChatMessage message={"Semi skimmed is good"} timeSent={"14:50"} userSent={true}/>
        <ChatMessage message={"Hi"} timeSent={"14:45"} userSent={false}/>
        <ChatMessage message={"Aldi doesn't have any full fat"} timeSent={"14:45"} userSent={false}/>
        <ChatMessage message={"Do they have anything else?"} timeSent={"14:46"} userSent={true}/>
        <ChatMessage message={"They have semi skimmed"} timeSent={"14:47"} userSent={false}/>
        <ChatMessage message={"Semi skimmed is good"} timeSent={"14:50"} userSent={true}/>
        <ChatMessage message={"Hi"} timeSent={"14:45"} userSent={false}/>
        <ChatMessage message={"Aldi doesn't have any full fat"} timeSent={"14:45"} userSent={false}/>
        <ChatMessage message={"Do they have anything else?"} timeSent={"14:46"} userSent={true}/>
        <ChatMessage message={"They have semi skimmed"} timeSent={"14:47"} userSent={false}/>
        <ChatMessage message={"Semi skimmed is good"} timeSent={"14:50"} userSent={true}/>
    </ScrollView>);
}

export default function ChatMessages(){
    return chatMessages();
}
