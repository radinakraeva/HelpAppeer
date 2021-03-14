import React from 'react';
import {ScrollView} from 'react-native';
import Listing from './Listing';

export default function Feed(){
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <Listing title={"Aldi please"} category={"Food"} image = {require('../Resources/Images/Food.png')} profilePicture = {require('../Resources/Images/Radina.jpg')} timeSincePosting = {10} priceCategory = {"££"} distance = {2}/>
            <Listing title={"Aldi please"} category={"Food"} image = {require('../Resources/Images/Food.png')} profilePicture = {require('../Resources/Images/Michael.jpg')} timeSincePosting = {15} priceCategory = {"££"} distance = {3}/>
            <Listing title={"Fooooooood"} category={"Food"} image = {require('../Resources/Images/Food.png')} profilePicture = {require('../Resources/Images/Ludwig.jpg')} timeSincePosting = {17} priceCategory = {"££££"} distance = {5}/>
            <Listing title={"Fooooooood"} category={"Food"} image = {require('../Resources/Images/Food.png')} profilePicture = {require('../Resources/Images/Slavka.jpg')} timeSincePosting = {10} priceCategory = {"£"} distance = {10}/>
            <Listing title={"Medicine needed asapp"} category={"Medicine"} image = {require('../Resources/Images/Medicine.jpg')} profilePicture = {require('../Resources/Images/Alina.jpg')} timeSincePosting = {10} priceCategory = {"£££"} distance = {4}/>
        </ScrollView>
    );
}