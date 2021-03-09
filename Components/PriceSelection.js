import React from 'react';
import {StyleSheet, TouchableOpacity, View,Text} from 'react-native'
import ColourPalette from '../Resources/ColourPalette';

export default function PriceSelection({text, color, onPress}) {
    return (
        <View>
            <TouchableOpacity onPress={onPress} style={{...styles.container, backgroundColor: color}}>
                <Text style={{...styles.pound}}>{text}</Text>
            </TouchableOpacity>
        </View>

    );
};


const styles = StyleSheet.create({
    container: {
        backgroundColor: ColourPalette.grey,
        marginHorizontal: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 25,


    },
    pound: {
        fontSize: 25,
        paddingHorizontal: 10,
        color: ColourPalette.darkBlue,
    },
});
