import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import CircleImage from './CircleImage';
import ColourPalette from '../Resources/ColourPalette';

export default function ChatSelector({listingName, mostRecentMessage, timeSinceMRM, profilePicture, unread}){
    let textStyles = StyleSheet.create({
        listingName:{
            fontSize: 17,
            color: ColourPalette.darkBlue,
        },
        mrm:{
        },
        timeMRM:{
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
                fontWeight:'bold'
            },
            timeMRM:{
                fontWeight:'bold'
            }
        });
    }
    return(
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
                    <Text style = {textStyles.timeMRM}>{timeSinceMRM + "m" + ((unread === true) ? '•' : '')}</Text>
                </View>
            </View>
        </View>
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
    },
    rightSideView:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
})

