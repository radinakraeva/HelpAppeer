import React from 'react';
import FeedScreen from '../Screens/FeedScreen';
import ProfileScreen from '../Screens/ProfileScreen';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
    return (
            <Drawer.Navigator initialRouteName="Feed">
                <Drawer.Screen name="Feed" component={FeedScreen} initialParams={{username: "as"}} />
                <Drawer.Screen name="Profile" component={ProfileScreen} initialParams={{username: "as"}} />
                {/*<Drawer.Screen name="Card Payment" component={}/>*/}
                {/*<Drawer.Screen name="Sign Out" component={}/>*/}
            </Drawer.Navigator>
    );
}

export default DrawerNavigation;
