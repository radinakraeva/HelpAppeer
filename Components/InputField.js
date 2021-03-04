import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

import Icon from 'react-native-vector-icons/AntDesign';
import ColourPalette from '../Resources/ColourPalette';
import CircleIcon from './CircleIcon';


const InputField = ({icon, size=66, ...otherProps}) => {

    return(
        <View style={{...styles.container, height: size}}>
            {icon && <CircleIcon iconName={icon} iconColor = {ColourPalette.darkBlue} size={35}/>}
            <TextInput styles={styles.textInput} {...otherProps}/>
        </View>

    );

};

const styles = StyleSheet.create({
    container: {
        backgroundColor: ColourPalette.white,
        borderRadius: 25,
        flexDirection: "row",
        width: '100%',
        padding: 15,
        alignItems: "baseline",
        paddingTop: 5,
        overflow: 'scroll',
    },
    textInput: {
        fontSize: 25,
        fontFamily: "Roboto",
        color: ColourPalette.darkBlue,
    },

});

export default InputField;
