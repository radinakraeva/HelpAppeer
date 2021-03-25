import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {CreditCardInput} from "react-native-payment-card";
import IconButton from '../Components/IconButton';
import ColourPalette from '../Resources/ColourPalette';
import {useNavigation} from "@react-navigation/native";

const CardPaymentScreen = () => {

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
                validColor={"black"}
                invalidColor={"red"}
                placeholderColor={"darkgray"}
            />
        </SafeAreaView>

    );
}

const styles = StyleSheet.create({
    sideMenuButton: {
        paddingRight: 15,
        paddingLeft: 15,
        paddingBottom: 5,
    },
});

export default CardPaymentScreen;
