/* eslint-disable prettier/prettier */
import React from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';

export default function CircleImage({size = 40, backGroundColor = '#000', image, margin = 10}){
    return (
        <View style = {{width: size, height: size, borderRadius: size/2, backGroundColor: backGroundColor, color: 'red', overflow: 'hidden', margin: margin}}>
            <Image style = {{width: size, height: size,}} source ={image} ></Image>
        </View>
    );
}

const styles = StyleSheet.create({

})
