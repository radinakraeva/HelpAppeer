import React from 'react';
import {ScrollView, FlatList} from 'react-native';
import ChatSelector from './ChatSelector';

export default function ChatList({openConvos}){
    function timeDifference(date){
        let date2 = new Date();
        let diffMs = (date2 - Date.parse(date));
        if (Math.floor(diffMs / 86400000) > 1){
            return Math.floor(diffMs / 86400000) + "d";
        }
        if (Math.floor((diffMs % 86400000)/ 3600000) > 1){
            return Math.floor((diffMs % 86400000)/ 3600000) + "h";
        }
            return (Math.floor(((diffMs % 86400000) % 3600000) / 60000 )) + "m";

    }
    const getChatSelector = (convo) => {
        convo = convo["item"];
        return (
            <ChatSelector
            listingName = {convo["listing_id"]}
            profilePicture = {require('../Resources/Images/Ludwig.jpg')}
            timeSinceMRM = {timeDifference(convo["time_sent"])}
            mostRecentMessage = {convo["msg_contents"]}
            unread = {false}/>
        );
    };
    return (
        <FlatList
        data = {openConvos}
        keyExtractor = {convo => convo.msg_id.toString()}
        renderItem = {getChatSelector}/>
);
}

/*<ScrollView showsVerticalScrollIndicator={false}>
    <ChatSelector listingName={"Aldi please"} profilePicture = {require('../Resources/Images/Radina.jpg')} timeSinceMRM = {10} mostRecentMessage = {"Semi skimmed milk is good"} unread={true}/>
    <ChatSelector listingName={"Aldi please"} profilePicture = {require('../Resources/Images/Michael.jpg')} timeSinceMRM = {15} mostRecentMessage = {"I'm on my way now"} unread={false}/>
    <ChatSelector listingName={"Fooooooood"} profilePicture = {require('../Resources/Images/Ludwig.jpg')} timeSinceMRM = {17} mostRecentMessage = {"Choose what ever you think is best"} unread={false}/>
    <ChatSelector listingName={"Fooooooood"} profilePicture = {require('../Resources/Images/Slavka.jpg')} timeSinceMRM = {10} mostRecentMessage = {"Cool! Thanks"} unread={true}/>
    <ChatSelector listingName={"Medicine needed asapp"} profilePicture = {require('../Resources/Images/Alina.jpg')} timeSinceMRM = {10} mostRecentMessage = {"Yep, thats the one"} unread={false}/>
</ScrollView>*/
