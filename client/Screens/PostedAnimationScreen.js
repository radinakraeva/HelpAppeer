import React, { useRef } from 'react';
import {Animated, View, StyleSheet, Button, Image, SafeAreaView, Dimensions} from 'react-native';
import ColourPalette from '../Resources/ColourPalette';

import {useNavigation} from '@react-navigation/native';
import 'react-native-gesture-handler';


const PostedAnimationScreen  = (props) => {

    const navigation = useNavigation();

    const navCheck = () => {
        navigation.navigate("FeedScreen2", {username: props.route.params.username});
    };

    const finalT = () => {
        setTimeout(fadeIn,1000);
    }

    const fadeIn = () => {
        setTimeout(navCheck,3000);
    };

    return (
        <SafeAreaView style={styles.backing}>
            <View style={styles.alin} >
                <Image style={styles.pic2} source={{
                    uri: 'https://media.giphy.com/media/RIYgiYTCmostbz0wNx/giphy.gif'
                }} onLoad={finalT}/>
                <Image style={styles.pic1} source={{
                    uri: 'https://media.giphy.com/media/kUTME7ABmhYg5J3psM/giphy.gif'
                }} onLoad={finalT}/>
            </View>
        </SafeAreaView>

    );
}

const {height} = Dimensions.get("screen");
const picHeight = height*0.45;

const styles = StyleSheet.create({
    backing: {
        backgroundColor: 'white',
        flex: 1,
    },
    pic1: {
        width: 100,
        height: 100,
    },
    pic2: {
        width: picHeight,
        height: picHeight,
    },
    alin: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop:50,
    },
    photo: {
        height: picHeight,
        width: picHeight
    },
});

export default PostedAnimationScreen;
