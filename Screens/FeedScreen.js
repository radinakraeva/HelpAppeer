/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import Feed from '../Components/Feed';
import Icon from 'react-native-vector-icons/AntDesign';

import ColourPalette from '../Resources/ColourPalette';

export default function FeedScreen(){
    return (
        <SafeAreaView style = {styles.feedScreen}>
            <View style = {styles.topSection}>
                <View style = {styles.topLeftSection}>

                    <Text style = {styles.text}>Find a listing in</Text>
                    <Text style = {styles.locationText}>Glasgow</Text>
                </View>
                <View style = {styles.topRightSection}>

                    <Icon name="filter" size={25} color={ColourPalette.darkBlue} />
                </View>
            </View>

            <Feed style = {styles.feed}/>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    feedScreen: {
        height: '100%'
    },
    topSection: {
        height: '15%',
        flexDirection: 'row'
    },
    topLeftSection:{
        flex:1,
        justifyContent: 'center',
    },
    topRightSection:{
        flex:1,
        alignItems: 'flex-end',
    },
    locationText:{
        fontSize: 24,
        color: ColourPalette.yellow
    },
    text:{
        fontSize: 15,
    }
})
