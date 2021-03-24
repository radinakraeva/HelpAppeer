import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

function ProfileScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button
                onPress={() => navigation.navigate('ProfileScreen')}
                title="Go to profile"
            />
        </View>
    );
}

function CardPaymentScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button
                onPress={() => navigation.navigate('CardPaymentScreen')}
                title="Go to payment"
            />
        </View>
    );
}

const Drawer = createDrawerNavigator();

export default function SideMenu() {
    return (
        <NavigationContainer>
            <Drawer.Navigator initialRouteName="Feed">
                <Drawer.Screen name="Profile" component={ProfileScreen} />
                <Drawer.Screen name="Payment" component={CardPaymentScreen} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}
