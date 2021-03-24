import React, {useEffect} from 'react';
import {SafeAreaView, View, TextInput, StyleSheet, TouchableOpacity, Text,} from 'react-native';
import {CreditCardInput} from "react-native-payment-card";



const CardPaymentScreen = (props) => {



    return (
        <SafeAreaView style = {{paddingTop: 60}}>

            <CreditCardInput
                autoFocus
                requiresName
                requiresCVC
                // labelStyle={}
                // inputStyle={}
                validColor={"black"}
                invalidColor={"red"}
                placeholderColor={"darkgray"}
                // onChange={this._onChange}
            />
        </SafeAreaView>

    );
}


export default CardPaymentScreen;
