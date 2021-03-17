/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import Feed from '../Components/Feed';

import ColourPalette from '../Resources/ColourPalette';
import CircleIcon from '../Components/CircleIcon';
import Button from '../Components/Button';
import listingsApi from "../api/listingsApi";

export default function FeedScreen(){

    return (
        <SafeAreaView style = {styles.feedScreen}>
            <View style = {styles.topSection}>
                <View style = {styles.topLeftSection}>

                    <Text style = {styles.text}>Find a listing in</Text>
                    <Text style = {styles.locationText}>Glasgow</Text>
                </View>
                <View style = {styles.topRightSection}>
                    <CircleIcon iconName='filter' iconColor = {ColourPalette.darkBlue} size ={43} />
                </View>
            </View>

            <Feed style = {styles.feed}/>

            <View style = {styles.bottomSection}>
                <Button title = "Add" />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    feed: {},
    feedScreen: {
        height: '100%',
    },
    topSection: {
        height: '15%',
        flexDirection: 'row',
    },
    topLeftSection:{
        flex:1,
        justifyContent: 'center',
    },
    topRightSection:{
        marginTop: 13,
        alignItems: 'flex-end',
    },
    locationText:{
        fontSize: 24,
        color: ColourPalette.yellow,
    },
    text:{
        fontSize: 15,
    },
    bottomSection:{
        paddingTop: 10,
        alignItems: 'center',
        height: '8%',
    }
})
