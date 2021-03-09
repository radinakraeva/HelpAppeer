/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import Feed from '../Components/Feed';

import ColourPalette from '../Resources/ColourPalette';
import CircleIcon from '../Components/CircleIcon';
import Button from '../Components/Button';

export default function FeedScreen(){
    return (
        <SafeAreaView style = {styles.feedScreen}>
            <View style = {styles.topSection}>
                <View style = {styles.topLeftSection}>
                    <CircleIcon iconName='menuunfold' iconColor = {ColourPalette.darkBlue} size ={43} />
                </View>
                <View style = {styles.topRightSection}>
                    <Text style = {styles.text}>Find a listing in</Text>
                    <Text style = {styles.locationText}>Glasgow</Text>
                </View>
            </View>

            <Feed style = {styles.feed}/>

            <View style = {styles.topSection}>
            <View style = {styles.bottomLeftSection}>
                <CircleIcon iconName='filter' iconColor = {ColourPalette.darkBlue} ackground = {ColourPalette.darkBlue} size ={43} />
            </View>
            <View style = {styles.bottomCenterSection}>
                <Button title = "Add" />
            </View>
            <View style = {styles.bottomRightSection}>
                <CircleIcon iconName='message1' iconColor = {ColourPalette.darkBlue} background = {ColourPalette.darkBlue} size ={43} />
            </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    feedScreen: {
        height: '100%',
    },
    topSection: {
        height: '10%',
        flexDirection: 'row',
    },
    topLeftSection:{
        flex:0.95,
        marginTop: 13,
        marginLeft: 10,
        alignItems: 'flex-start',
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
    bottomSection: {
        height: '20%',
        flexDirection: 'row',
    },
    bottomLeftSection:{
        flex: 0.14,
        marginTop: 20,
        marginLeft: 10,
        alignItems: 'flex-start',
    },
    bottomCenterSection:{
        flex:0.84,
        marginTop: 5,
        alignItems: 'center',
    },
    bottomRightSection:{
        marginTop: 20,
        alignItems: 'flex-start',
    }
})
