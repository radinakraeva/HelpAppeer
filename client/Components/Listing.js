import React from 'react';
import {View, StyleSheet, Image, Text, Touchable, TouchableWithoutFeedback} from 'react-native';
import CircleImage from './CircleImage';
import Icon from 'react-native-vector-icons/EvilIcons';

import ColourPalette from '../Resources/ColourPalette';
import {useNavigation} from "@react-navigation/native";
import {NavigationInjectedProps, withNavigation} from 'react-navigation';


function Listing({listing_id, title, category, image, profilePicture, timeSincePosting, priceCategory, distance, creator, user}){

    const navigation = useNavigation();
    function seeListing(){
        navigation.navigate('FullListing', {listID: listing_id, username: user, creator: creator})
    }

    let timeMeasurment = 'min';

    if(timeSincePosting > 60){
        timeSincePosting = Math.round(timeSincePosting / 60);

        if(timeSincePosting == 1)timeMeasurment = 'hour';
        else timeMeasurment = 'hours';
    }


    return (
        <TouchableWithoutFeedback onPress = {() =>seeListing()}>
        <View style = {styles.listing}>
            <View style = {styles.upperSection}>
                <Image style = {styles.image} source={image} />
                <CircleImage size = {45} image ={profilePicture}/>
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
                    <Text style = {{color: ColourPalette.darkBlue}}>{timeSincePosting} {timeMeasurment} ago</Text>
                    <Text style = {{color: ColourPalette.darkBlue, opacity: .6}}><Icon name="location" size={19} color={ColourPalette.darkBlue} />{distance}km away</Text>
                </View>
            </View>
        </View>
        </TouchableWithoutFeedback>
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
        elevation: 0.5,
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

export default Listing;
