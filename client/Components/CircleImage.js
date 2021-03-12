import React from 'react';
import {View, Image} from 'react-native';

export default function CircleImage({size = 40, backGroundColor = '#000', image, margin = 10}){
    return (
        <View style = {{width: size, height: size, borderRadius: size/2, backGroundColor: backGroundColor, color: 'red', overflow: 'hidden', margin: margin}}>
            <Image style = {{width: size, height: size,}} source ={image} />
        </View>
    );
}

