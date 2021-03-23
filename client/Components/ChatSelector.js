import React from 'react';
import {View, StyleSheet, Text, TouchableWithoutFeedback} from 'react-native';
import CircleImage from './CircleImage';
import ColourPalette from '../Resources/ColourPalette';

import {useNavigation} from "@react-navigation/native";

export default function ChatSelector({listingName, mostRecentMessage, timeSinceMRM, profilePicture, unread, listing_id, username, receiver}){
    const navigation = useNavigation();
    let textStyles = StyleSheet.create({
        listingName:{
            fontSize: 17,
            color: ColourPalette.darkBlue,
        },
        mrm:{
        },
        timeMRM:{
            padding: 1
        }
    });
    if(unread === true){
        textStyles = StyleSheet.create({
            listingName:{
                fontSize: 17,
                color: ColourPalette.darkBlue,
                fontWeight:'bold'
            },
            mrm:{
                fontWeight:'bold',
            },
            timeMRM:{
                fontWeight:'bold',
                padding: 1
            }
        });
    }
    if(mostRecentMessage.length > 40){
        mostRecentMessage = mostRecentMessage.slice(0,40);
        mostRecentMessage = mostRecentMessage + "...";
    }

    function openChat(){
        console.log("Opening Chat");
        navigation.navigate('ChatScreen', {listing_id: listing_id, listingName: listingName, username: username , receiver: receiver})
    }
    return(
        <TouchableWithoutFeedback onPress = {() =>openChat()} style = {styles.test}>
            <View style = {styles.chatSelector}>
                <View>
                    <CircleImage size={45} image={profilePicture}/>
                </View>
                <View style = {styles.rightSideView}>
                    <View >
                        <View>
                            <Text style = {textStyles.listingName}>{listingName}</Text>
                        </View>
                        <View>
                            <Text style = {textStyles.mrm}>{mostRecentMessage}</Text>
                        </View>
                    </View>
                    <View>
                        <Text style = {textStyles.timeMRM}>{timeSinceMRM + ((unread === true) ? '•' : '')}</Text>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    chatSelector:{
        flex:1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 5,
        paddingBottom: 5,
        paddingRight: 10,
        margin: 5,
        backgroundColor: ColourPalette.grey,
        borderRadius:10,
    },
    rightSideView:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    test: {
        backgroundColor: '#000'
    }
})

