/* eslint-disable prettier/prettier,no-trailing-spaces */
import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableWithoutFeedback } from 'react-native';

import Screen from "../Components/Screen";
import InputField from '../Components/InputField';
import Button from '../Components/Button';
import ColourPalette from '../Resources/ColourPalette';
import IconButton from '../Components/IconButton';

const NewListingScreen = (props) => {

    const [listingName, setListingName] = useState('');

    const catsSelected = { "food": false, "medicine": false, "bills": false, "general": false};

    const catsWithIcons = {         "food":"apple-o",
                                    "medicine":"medicinebox",
                                    "bills":"bulb1",
                                    "general":"ellipsis1"};

    const submitListing = () => {

    };


    const getCategories = () => {


        // for (let cat in catsSelected) {
        //     if (catsSelected[cat]) {
        //
        //     }
        // }

        return (
            <View style={styles.categories}>
                <View style={styles.catIcons}><IconButton iconName={ catsWithIcons.food } iconBgColor = {ColourPalette.grey} size={60} /></View>
                <View style={styles.catIcons}><IconButton iconName={ catsWithIcons.medicine } iconBgColor = {ColourPalette.grey} size={60} /></View>
                <View style={styles.catIcons}><IconButton iconName={ catsWithIcons.bills } iconBgColor = {ColourPalette.grey} size={60} /></View>
                <View style={styles.catIcons}><IconButton iconName={ catsWithIcons.general } iconBgColor = {ColourPalette.grey} size={60} /></View>
            </View>
        );
    };

    return (
        <Screen>
            <Text style={styles.title}>Add a new listing</Text>





            <Text style={styles.subtitle}> Name</Text>
            <InputField placeholder="Name"/>

            <Text style={styles.subtitle}>Category</Text>
            {getCategories()}


            <Text style={styles.subtitle}>Price</Text>
            <Text>£££: slider/button-ish £££</Text>

            <Text style={styles.subtitle}>Description</Text>
            <InputField size={150} placeholder="Description"/>


            <Text style={styles.subtitle}>Pictures</Text>
            <Text>Upload photos here</Text>


            <Text style={styles.subtitle}>Location</Text>
            <Text>Map here with your location</Text>
            <Text>Map here with your location</Text>

            <Text>Map here with your location</Text>

            <Text>Map here with your location</Text>
            <Text>Map here with your location</Text>
            <Text>Map here with your location</Text>
            <Text>Map here with your location</Text>

            <Text>Map here with your location</Text>




            <View style = {styles.bottomSection}>
                <Button title = "Create" onPress={submitListing}/>
            </View>

        </Screen>
    );
};




const styles = StyleSheet.create({
    title: {
        fontSize: 35,
        fontFamily: "Roboto",
        fontWeight: "bold",
        marginBottom: 20,
        color: ColourPalette.darkBlue,
    },
    subtitle: {
        marginTop: 10,
        marginBottom: 5,
        fontSize: 18,
        fontFamily: "Roboto",
        fontWeight: "normal",
        color: ColourPalette.darkBlue,

    },
    categories: {
        flexDirection: "row",
        flex: 4,
        width: '100%',
    },
    catIcons: {
        flex: 1,
        alignItems: 'center',
    },

    bottomSection:{
        marginTop: 20,
        alignItems: 'center',
        height: '8%',
        marginBottom: 40,

    }
});


export default NewListingScreen;
