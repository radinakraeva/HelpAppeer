import React from 'react';
import {Dimensions, Image, SafeAreaView, StyleSheet, View} from 'react-native';
import ColourPalette from '../Resources/ColourPalette';
import {useNavigation} from '@react-navigation/native';
import 'react-native-gesture-handler';

const PostedAnimationScreen  = () => {

    const navigation = useNavigation();

    const navCheck = () => {
        navigation.navigate("DrawerNavigation", {screen: "Feed", params: {username: global.username}} );
    };

    const finalT = () => {
        setTimeout(fadeIn,300);
    }

    const fadeIn = () => {
        setTimeout(navCheck,700);
    };

    return (
        <SafeAreaView style={styles.backing}>
            <View style={styles.alin} >
                <Image style={styles.pic1} source={{
                    uri: 'https://media.giphy.com/media/O6Yaj4lrSE9jSTkyl5/giphy.gif'
                }} onLoad={finalT}/>
            </View>
        </SafeAreaView>
    );
}

const {height} = Dimensions.get("screen");
const picHeight = height*0.45;

const styles = StyleSheet.create({
    backing: {
        backgroundColor: ColourPalette.darkBlue,
        flex: 1,
    },
    pic1: {
        paddingTop:250,
        width: 250,
        height: 250,
    },
    pic2: {
        width: picHeight,
        height: picHeight,
    },
    alin: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop:250,
    },
    photo: {
        height: picHeight,
        width: picHeight
    },
});

export default PostedAnimationScreen;
