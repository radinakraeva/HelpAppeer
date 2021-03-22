import React from 'react';
import {FlatList, Text, View,StyleSheet} from 'react-native';
import ChatSelector from './ChatSelector';
import ColourPalette from '../Resources/ColourPalette';

export default function ChatList({openConvos}, {convoNames}) {
    function timeDifference(date) {
        let date2 = new Date();
        let diffMs = (date2 - Date.parse(date));
        if (Math.floor(diffMs / 86400000) > 1) {
            return Math.floor(diffMs / 86400000) + "d";
        }
        if (Math.floor((diffMs % 86400000) / 3600000) > 1) {
            return Math.floor((diffMs % 86400000) / 3600000) + "h";
        }
        return (Math.floor(((diffMs % 86400000) % 3600000) / 60000)) + "m";

    }

    const getChatSelector = (convo) => {
        convo = convo["item"];
        return (
            <ChatSelector
                listingName={convo["listing_id"]}
                profilePicture={require('../Resources/Images/Ludwig.jpg')}
                timeSinceMRM={timeDifference(convo["time_sent"])}
                mostRecentMessage={convo["msg_contents"]}
                unread={false}
                username = {convo["send_user"]}
                receiver={convo["reci_user"]}
                listing_id={convo["listing_id"]}
            />
        );
    };

    if (openConvos.length == 0) {
        return (
            <View style = {styles.back}>
            <Text style = {styles.emptyText}>You have no listings pending. Make a listing and wait for someone to accept it or go accept someone
                else's listing</Text>
            </View>);
    } else {
        console.log(convoNames);
        return (
            <FlatList
                data={openConvos}
                keyExtractor={convo => convo.msg_id.toString()}
                renderItem={getChatSelector}/>);
    }
}

const styles = StyleSheet.create({
    emptyText: {
        margin: 10,
        textAlign: 'center'
    },
    back: {
        borderRadius: 10,
        backgroundColor: ColourPalette.grey,
        width: '60%',
        alignSelf: 'center',
    }
})
/*<ScrollView showsVerticalScrollIndicator={false}>
    <ChatSelector listingName={"Aldi please"} profilePicture = {require('../Resources/Images/Radina.jpg')} timeSinceMRM = {10} mostRecentMessage = {"Semi skimmed milk is good"} unread={true}/>
    <ChatSelector listingName={"Aldi please"} profilePicture = {require('../Resources/Images/Michael.jpg')} timeSinceMRM = {15} mostRecentMessage = {"I'm on my way now"} unread={false}/>
    <ChatSelector listingName={"Fooooooood"} profilePicture = {require('../Resources/Images/Ludwig.jpg')} timeSinceMRM = {17} mostRecentMessage = {"Choose what ever you think is best"} unread={false}/>
    <ChatSelector listingName={"Fooooooood"} profilePicture = {require('../Resources/Images/Slavka.jpg')} timeSinceMRM = {10} mostRecentMessage = {"Cool! Thanks"} unread={true}/>
    <ChatSelector listingName={"Medicine needed asapp"} profilePicture = {require('../Resources/Images/Alina.jpg')} timeSinceMRM = {10} mostRecentMessage = {"Yep, thats the one"} unread={false}/>
</ScrollView>*/
