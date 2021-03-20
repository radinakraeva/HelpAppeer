import React from 'react';
import {StyleSheet, TouchableOpacity, View,Text} from 'react-native'
import ColourPalette from '../Resources/ColourPalette';

export default function PriceSelection({text, color, onPress, el=0}) {
    return (
        <View>
            <TouchableOpacity onPress={onPress} style={{...styles.container, elevation: el,  backgroundColor: color}}>
                <Text style={{...styles.pound, color: color === ColourPalette.darkBlue ? ColourPalette.yellow : ColourPalette.darkBlue}} >{text}</Text>
            </TouchableOpacity>
        </View>

    );
};


const styles = StyleSheet.create({
    container: {
        backgroundColor: ColourPalette.darkBlue,
        marginHorizontal: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 25,


    },
    pound: {
        fontSize: 25,
        paddingHorizontal: 10,
        // color: ColourPalette.grey,
    },
});
