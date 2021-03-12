import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

import ColourPalette from '../Resources/ColourPalette';

export default function Button({title, onPress, width, borderRadius}){
    return (
        <TouchableOpacity style = {styles.button} onPress = {onPress}>
                <Text style = {styles.text} >{title}</Text>
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    button:{
        backgroundColor: ColourPalette.darkBlue,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        width: '30%',
        elevation: 5,
    },
    text: {
        color: ColourPalette.white,
        fontSize: 18,
        // textTransform: 'upperCase',
        fontWeight: 'bold',
    },
})

