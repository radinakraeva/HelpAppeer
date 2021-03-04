/* eslint-disable prettier/prettier */
import React from 'react';
import {ScrollView} from 'react-native';
import ChatSelector from './ChatSelector';

export default function ChatList(){
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <ChatSelector listingName={"Aldi please"} profilePicture = {require('../Resources/Images/Radina.jpg')} timeSinceMRM = {10} mostRecentMessage = {"Semi skimmed milk is good"} unread={true}/>
            <ChatSelector listingName={"Aldi please"} profilePicture = {require('../Resources/Images/Michael.jpg')} timeSinceMRM = {15} mostRecentMessage = {"I'm on my way now"} unread={false}/>
            <ChatSelector listingName={"Fooooooood"} profilePicture = {require('../Resources/Images/Ludwig.jpg')} timeSinceMRM = {17} mostRecentMessage = {"Choose what ever you think is best"} unread={false}/>
            <ChatSelector listingName={"Fooooooood"} profilePicture = {require('../Resources/Images/Slavka.jpg')} timeSinceMRM = {10} mostRecentMessage = {"Cool! Thanks"} unread={true}/>
            <ChatSelector listingName={"Medicine needed asapp"} profilePicture = {require('../Resources/Images/Alina.jpg')} timeSinceMRM = {10} mostRecentMessage = {"Yep, thats the one"} unread={false}/>
        </ScrollView>
    );
}
