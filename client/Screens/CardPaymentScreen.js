import React, {useEffect} from 'react';
import {SafeAreaView, View, TextInput, StyleSheet, TouchableOpacity, Text,} from 'react-native';
import {CreditCardInput} from "react-native-payment-card";
import IconButton from '../Components/IconButton';
import ColourPalette from '../Resources/ColourPalette';
import {useNavigation} from "@react-navigation/native";



const CardPaymentScreen = (props) => {

    const navigation = useNavigation()
    const openSideMenu = () => {
        navigation.openDrawer();
    };

    return (
        <SafeAreaView style = {{paddingTop: 50}}>
            <View style={styles.sideMenuButton}>
                <IconButton iconName='bars' iconBgColor={ColourPalette.darkBlue} onPress={openSideMenu} size={50}/>
            </View>
            <CreditCardInput
                autoFocus
                requiresName
                requiresCVC
                // labelStyle={{color: ColourPalette.darkBlue}}
                // inputStyle={}
                validColor={"black"}
                invalidColor={"red"}
                placeholderColor={"darkgray"}
                // onChange={this._onChange}
            />
        </SafeAreaView>

    );
}

const styles = StyleSheet.create({
    sideMenuButton: {
        // paddingVertical: '5%',
        paddingRight: 15,
        paddingLeft: 15,
        paddingBottom: 5,
    },
});


export default CardPaymentScreen;
