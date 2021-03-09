/* eslint-disable prettier/prettier */
import React from 'react';
import {ScrollView} from 'react-native';
import ProfileListing from './ProfileListing';


export default function ProfileFeed(){
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <ProfileListing title={"Essential Food Please"} category={"Food"} image = {require('../Resources/Images/Food.png')} profilePicture = {require('../Resources/Images/Mark.png')} priceCategory = {"££"}/>
            <ProfileListing title={"Some Aspirin Would Be Lovely "} category={"Medicine"} image = {require('../Resources/Images/Medicine.jpg')} profilePicture = {require('../Resources/Images/Mark.png')}  priceCategory = {"£££"}/>
        </ScrollView>
    );
}
