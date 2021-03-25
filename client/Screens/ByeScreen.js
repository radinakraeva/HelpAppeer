import React, {useRef} from 'react';
import {Animated, Dimensions, Image, SafeAreaView, StyleSheet, View} from 'react-native';
import ColourPalette from '../Resources/ColourPalette';
import {useNavigation} from '@react-navigation/native';
import 'react-native-gesture-handler';

const ByeScreen  = () => {

    const navigation = useNavigation();
    const fadeAnim1 = useRef(new Animated.Value(0)).current;
    const fadeAnim2 = useRef(new Animated.Value(0)).current;
    const fadeAnim3 = useRef(new Animated.Value(0)).current;

    const navCheck = () => {
        navigation.navigate("LoginScreen");
    };

    const finalT = () => {
        setTimeout(fadeIn,1000);
    }

    const fadeIn = () => {
        Animated.timing(fadeAnim1, { toValue: 1, duration: 3000, useNativeDriver:true }).start();
        Animated.timing(fadeAnim2, { toValue: 1, duration: 4000, useNativeDriver:true }).start();
        Animated.timing(fadeAnim3, { toValue: 1, duration: 5000, useNativeDriver:true }).start();
        setTimeout(navCheck,5000);
    };

    return (
        <SafeAreaView style={styles.backing}>
            <View style={styles.alin}>
                <Image style={styles.pic} source={require('../Resources/Images/AppLogo.png')} onLoad={finalT}/>
                <View style={styles.animi}>
                    <Animated.Text style={[ styles.textS,{ opacity: fadeAnim1 },]} >GO</Animated.Text>
                    <Animated.Text style={[ styles.textS,{ opacity: fadeAnim2 },]} >ODB</Animated.Text>
                    <Animated.Text style={[ styles.textS,{ opacity: fadeAnim3 },]} >YE</Animated.Text>
                </View>
            </View>
        </SafeAreaView>

    );
}

const {height} = Dimensions.get("screen");
const picHeight = height*0.35;

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
        paddingTop:150,
    },
    textS: {
        fontSize: 30,
        paddingTop: 15,
        fontWeight: 'bold',
        color: ColourPalette.darkBlue,
        letterSpacing: 2,
    },
    animi: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
});

export default ByeScreen;
