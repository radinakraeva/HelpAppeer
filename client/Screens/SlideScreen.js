import React from 'react';
import {SliderBox} from "react-native-image-slider-box";
import {View,StyleSheet} from 'react-native';
import ColourPalette from '../Resources/ColourPalette';

import {useNavigation} from "@react-navigation/native";
export default function SlideScreen(){
    const navigation = useNavigation();
    const images = [require('../Resources/Images/HelpAppear1.png'),
        require('../Resources/Images/HelpAppear2.png'),
        require('../Resources/Images/HelpAppear3.png'),
        require('../Resources/Images/HelpAppear4.png'),
        require('../Resources/Images/HelpAppear5.png')];

    const style = StyleSheet.create({
        slide:{
            width: '100%',
            height: '100%',
            backgroundColor: ColourPalette.grey
        }
    })

    const next = () => {
        console.log("Move")
        navigation.navigate("LoginScreen");
    }
    return(
        <View style={style.slide}>
            <SliderBox style={style.slide} images={images} resizeMode={'stretch'} onCurrentImagePressed={() =>navigation.navigate("LoginScreen")} autoplay circleLoop/>
        </View>
    )
}
