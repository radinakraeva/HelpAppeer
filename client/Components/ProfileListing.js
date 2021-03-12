import React from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';
import CircleImage from './CircleImage';

import ColourPalette from '../Resources/ColourPalette';


export default function ProfileListing({title, category, image, profilePicture, priceCategory}){
    return (
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
                    <View style={styles.button}>
                    <TouchableOpacity>
                        <Text style={{fontSize: 20, justifyContent: 'center',
                            alignItems: 'center',paddingLeft: 17, paddingTop: 3,fontWeight:'bold', color:'white' }}>Re-Order</Text>
                    </TouchableOpacity>
                    </View>
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
    button: {
        marginTop: 9,
        borderRadius: 20,
        borderWidth: 3,
        width: 120,
        height: 40,
        borderColor: ColourPalette.yellow,
        backgroundColor: ColourPalette.yellow,
    },
})
