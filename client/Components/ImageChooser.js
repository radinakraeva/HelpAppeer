import React, {useState} from 'react';
import {StyleSheet, SafeAreaView, PermissionsAndroid, TouchableOpacity,View, Text, Image} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Button from '../Components/Button';
import CircleIcon from './CircleIcon';
import ColourPalette from '../Resources/ColourPalette';

export default function ImageChooser({title, icon, action}) {


    return (
        <SafeAreaView style={styles.container}>

            <TouchableOpacity onPress={ action } style={styles.button}>
                <CircleIcon iconName={icon} size={35} style={styles.icon} iconColor={ColourPalette.darkBlue} bgColor={ColourPalette.grey}/>
                <Text style={styles.text}>{title}</Text>
            </TouchableOpacity>
        </SafeAreaView>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 10,
        flexDirection: "row",
        backgroundColor: ColourPalette.grey,
        margin: 5,
        padding: 10,
        borderRadius:20,
        height: 55,
        elevation: 5,
    },
    button: {
        flex: 10,
        flexDirection: "row",
    },
    icon: {
        flex: 3,
        flexDirection: "row",
    },
    text: {
        flex: 7,
        flexDirection: "row",
        paddingHorizontal: 15,
        paddingVertical: 5.5,
        fontSize:16,
        color: ColourPalette.darkBlue,
        fontFamily: 'Roboto',
    },





});
