/* eslint-disable prettier/prettier */
import React from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import CircleButton from './CircleButton';
import Icon from 'react-native-vector-icons/EvilIcons';

import ColourPalette from '../Resources/ColourPalette';
import App from '../App';

export default function Listing({title, category, image, profilePicture, timeSincePosting, priceCategory, distance}){
    return (
        <View style = {styles.listing}>
            <View style = {styles.upperSection}>
                <Image style = {styles.image} source={image} />
                <CircleButton size = {45} image ={profilePicture}/>
            </View>
            <View style = {styles.lowerSection}>
                <View style = {styles.lowerLeftSection}>
                    <Text style = {styles.headerText}>{title}</Text>
                    <View style = {styles.categoryAndPriceSection}>
                        <Text style = {{color: ColourPalette.darkBlue}}>{category}</Text>
                        <Text style = {{color: ColourPalette.darkBlue}}>{priceCategory}</Text>
                    </View>
                </View>
                <View style = {styles.lowerRightSection}>
                    <Text style = {{color: ColourPalette.darkBlue}}>{timeSincePosting} min ago</Text>
                    <Text style = {{color: ColourPalette.darkBlue, opacity: .6}}><Icon name="location" size={19} color={ColourPalette.darkBlue} />{distance}km away</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    listing: {
        flex:1,
        borderRadius: 10,
        backgroundColor: '#fff',
        marginBottom: 20,
        overflow: 'hidden',
        width: '100%',
        height: 230,

    },
    upperSection: {
        flex: 7,
    },
    lowerSection: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 5,
        paddingRight: 10,
        paddingLeft: 10,
        paddingBottom: 14,
    },
    image: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    lowerLeftSection: {
        flex: 8,
        justifyContent: 'space-between',
    },
    lowerRightSection: {
        flex: 7,
        alignItems: 'flex-end',
        justifyContent: 'space-between',
    },
    categoryAndPriceSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    headerText: {
        fontSize: 17,
        color: ColourPalette.darkBlue
    },
})
