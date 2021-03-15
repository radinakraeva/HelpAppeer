/* eslint-disable prettier/prettier */
import React from 'react';
import {SafeAreaView,View,Image,StyleSheet,Dimensions,Text} from 'react-native';

import 'react-native-gesture-handler';
import ColourPalette from '../Resources/ColourPalette';

class WelcomeScreen extends React.Component {

    timer = async () => {
        return new Promise((resolve) => setTimeout(() => { resolve('result') }, 6000 ) );
    };

    async componentDidMount() {
        const time = await this.timer();
        if (time !== null) {
            this.props.navigation.navigate("LoginScreen");
        }
    };

    render() {
        return (

            <SafeAreaView style={styles.backing}>
                <View style={styles.alin}>
                    <Image style={styles.pic} source={require('../Resources/Images/LogIn.png')}/>
                    <View>
                        <Text
                            style={{fontSize: 25, paddingTop: 15, fontWeight: 'bold', color: ColourPalette.darkBlue,}}>HANDS.
                            FACE. SPACE.</Text>
                    </View>
                </View>
            </SafeAreaView>
        );
    };
}

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
