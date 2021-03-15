import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

import Icon from 'react-native-vector-icons/AntDesign';
import ColourPalette from '../Resources/ColourPalette';
import CircleIcon from './CircleIcon';


const InputField = ({ size=50, onChange, ...otherProps}) => {

    return(
        <View style={{...styles.container, height: size}}>
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
        paddingHorizontal: 20,
        paddingVertical: 10,
        alignItems: "baseline",
        // marginTop: 15,
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
