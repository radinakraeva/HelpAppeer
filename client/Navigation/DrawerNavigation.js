import React from 'react';
import FeedScreen from '../Screens/FeedScreen';
import ProfileScreen from '../Screens/ProfileScreen';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import ColourPalette from '../Resources/ColourPalette';
import LoginScreen from '../Screens/LoginScreen';
import CardPaymentScreen from '../Screens/CardPaymentScreen';
import ByeScreen from '../Screens/ByeScreen';

const Drawer = createDrawerNavigator();


const DrawerNavigation = () => {
    return (
            <Drawer.Navigator initialRouteName="Feed" drawerType='back'
                              drawerStyle={{width: '55%',
                                            backgroundColor: ColourPalette.darkBlue,
                                            paddingTop: '10%',

                              }}
                              drawerContentOptions={{
                                  activeTintColor: ColourPalette.darkBlue,
                                  activeBackgroundColor: ColourPalette.yellow,
                                  inactiveTintColor: ColourPalette.white,
                                  itemStyle: {
                                  },
                                  labelStyle:{
                                      marginLeft:5,
                                      padding: 2.5,
                                      fontSize: 17.5,
                                  }}}

            >
                <Drawer.Screen name="Feed" component={FeedScreen} initialParams={{username: "as"}} />
                <Drawer.Screen name="Profile" component={ProfileScreen} initialParams={{username: "as"}} />
                <Drawer.Screen name="Card Payment" component={CardPaymentScreen}/>
                <Drawer.Screen name="Sign Out" component={ByeScreen}/>
            </Drawer.Navigator>
    );
}



export default DrawerNavigation;
