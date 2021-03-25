import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import ColourPalette from '../Resources/ColourPalette';

const InputField = ({ size=50, onChange, ...otherProps}) => {

    return(
        <View style={{...styles.container, height: size}}>
            <TextInput multiline={true} styles={styles.textInput} onChangeText={onChange} {...otherProps}/>
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
    },
    textInput: {
        fontSize: 25,
        fontFamily: "Roboto",
        color: ColourPalette.darkBlue,
        alignItems: 'center',
    },
});

export default InputField;
