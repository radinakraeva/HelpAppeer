/* eslint-disable prettier/prettier */
import React from 'react';
import {View, TouchableHighlight, StyleSheet} from 'react-native';

import Icon from 'react-native-vector-icons/AntDesign';
import ColourPalette from '../Resources/ColourPalette';

export default function IconButton({iconName, iconBgColor = '#e3e9ef', size = 40}){

    // const [isChosen, setIsChosen] = React.useState(false);
    //
    // let bgColor = {
    //     activeOpacity: 1,
    //     underlayColor: ColourPalette.grey,
    //     style: isChosen ? styles.pressed : styles.notPressed,
    //     onHideUnderlay: () => setIsChosen(false),
    //     onShowUnderlay: () => setIsChosen(true),
    //     onPress: () => console.log('HELLO'),
    // };

    return (
        <View style = {{width: size, height: size, borderRadius: size / 2, backgroundColor: iconBgColor, justifyContent: 'center', alignItems: 'center', overflow: 'hidden'}}>
            <Icon name={iconName} size={size / 2} color= {ColourPalette.darkBlue} />
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
