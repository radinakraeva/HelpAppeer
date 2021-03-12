import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

import ColourPalette from '../Resources/ColourPalette';
import CircleIcon from './CircleIcon';


const InputField = ({icon, size=60, onChange, ...otherProps}) => {

    return(
        <View style={{...styles.container, height: size}}>
            {icon && <CircleIcon iconName={icon} iconColor = {ColourPalette.darkBlue} size={20}/>}
            <TextInput multiline={true} styles={styles.textInput} onChange={onChange} {...otherProps}/>
        </View>

    );

};

const styles = StyleSheet.create({
    container: {
        backgroundColor: ColourPalette.white,
        borderRadius: 25,
        flexDirection: "row",
        width: '100%',
        paddingHorizontal: 15,
        paddingVertical: 5,
        alignItems: "baseline",
        // paddingTop: 5,
        // overflow: 'scroll',
    },
    textInput: {
        fontSize: 25,
        fontFamily: "Roboto",
        color: ColourPalette.darkBlue,
        alignItems: 'center',
    },

});

export default InputField;
