import React from 'react';
import {View} from 'react-native';

import Icon from 'react-native-vector-icons/AntDesign';
import ColourPalette from '../Resources/ColourPalette';

export default function CircleIcon({iconName, size = 40, iconColor = '#ffffff'}){
    return (
        <View style = {{width: size, height: size, justifyContent: 'center', alignItems: 'center', backgroundColor: ColourPalette.grey, borderRadius: size / 2, overflow: 'hidden'}}>
                <Icon name={iconName} size={size / 2} color={iconColor}/>
        </View>
    );
}

