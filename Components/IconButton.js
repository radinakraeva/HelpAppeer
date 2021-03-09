/* eslint-disable prettier/prettier */
import React from 'react';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';

import Icon from 'react-native-vector-icons/AntDesign';
import ColourPalette from '../Resources/ColourPalette';

export default function IconButton({iconName, onPress, iconBgColor, size = 40}){

    return (
        <View style = {{width: size, height: size, borderRadius: size / 2, backgroundColor: iconBgColor, justifyContent: 'center', alignItems: 'center', overflow: 'hidden', marginBottom:5}}>
            <TouchableOpacity onPress={onPress}>
            <Icon name={iconName} size={size / 2} color= {ColourPalette.darkBlue} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    general: {
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    notPressed: {
        backgroundColor: ColourPalette.grey,
    },
    pressed: {
        backgroundColor: ColourPalette.yellow,
    },
});
