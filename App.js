/* eslint-disable prettier/prettier */
import React from 'react';
import { StyleSheet, View, ScrollView,Text} from 'react-native';

import FeedScreen from './Screens/FeedScreen';
import CircleIcon from './Components/CircleIcon';
import ChatListScreen from './Screens/ChatListScreen';
import ChatScreen from './Screens/ChatScreen';

const App = () => {

    /*return (
        <View style = {{backgroundColor: '#fafdf3', padding: 20}}>
            <ChatListScreen/>
        </View>
    );*/

    /*return (
        <View style = {{backgroundColor: '#fafdf3', padding: 20}}>
            <FeedScreen/>
        </View>
    );*/

    return (
        <View style = {{backgroundColor: '#fafdf3', padding: 20}}>
            <ChatScreen listingName = "Aldi Please"/>
        </View>
    );
};

export default App;
