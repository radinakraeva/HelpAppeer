/* eslint-disable prettier/prettier */

import React from 'react';
import {SafeAreaView,View,Image,TextInput,StyleSheet,Dimensions,Text,TouchableOpacity} from 'react-native';

import 'react-native-gesture-handler';

import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ColourPalette from '../Resources/ColourPalette';
import FeedScreen from './FeedScreen';

const WelcomeScreen = () => {

    return (

        <SafeAreaView style={styles.backing}>
            <View style={styles.alin}>
                <Image style={styles.pic} source={require('../Resources/Images/LogIn.png')}/>
                <View>
                        <Text style={{fontSize: 25, paddingTop:15, fontWeight:'bold', color: ColourPalette.darkBlue,}}>HANDS. FACE. SPACE.</Text>
                </View>
            </View>
        </SafeAreaView>
    );
};

const {height} = Dimensions.get("screen");
const picHeight = height*0.45;

const styles = StyleSheet.create({
    backing: {
        backgroundColor: 'white',
        flex: 1,
    },
    pic: {
        width: picHeight,
        height: picHeight,
    },
    alin: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop:100,
    },
});

export default WelcomeScreen;
