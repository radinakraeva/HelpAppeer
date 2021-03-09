/* eslint-disable prettier/prettier */

import React from 'react';
import {SafeAreaView,View,Image,TextInput,StyleSheet,Dimensions,Text,TouchableOpacity,Button} from 'react-native';

import 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ColourPalette from '../Resources/ColourPalette';
import FeedScreen from './FeedScreen';

const LoginScreen  = () => {

    // eslint-disable-next-line no-undef
    const navigation = useNavigation();

    const [data, setData] = React.useState({
        password: '',
        username: '',
        check_text: false,
        secureTextEntry: true,
    });

    const passwordChange = (input) => {
            setData({
               ...data,
               password: input,
               check_text:true,
            });
        };

    const usernameChange = (input) => {
        setData({
            ...data,
            username: input,
        });
    };

    const update = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry,
        });
    };

    const forgot = () => {
        alert('For Testing Username: MarkD , Password: LovesThisApp');
    };

    const signCheck = () => {
        alert('Do Not Worry MarkD You Are Already Signed Up');
    };

    const loginCheck = () => {
        if(data.username === 'MarkD' && data.password === 'LovesThisApp') {
            navigation.navigate("feedScreen");
        } else {
            alert('Sorry That Is Incorrect. Please Try Again');
        }
    };


    return (

        <SafeAreaView style={styles.backing}>
                <Image style={styles.pic} source={require('../Resources/Images/SignIn.png')}/>
                <View style={styles.input} >
                    <TextInput style={styles.textInput} placeholder="Username" onChangeText={(input)=> usernameChange(input)}/>
                    <FontAwesome5 style={styles.icon} name="user-circle" size={30}/>
                </View>

                <View style={styles.input} >
                    <TextInput style={styles.textInput} placeholder="Password" secureTextEntry={data.secureTextEntry} onChangeText={(input)=> passwordChange(input)}/>
                    <TouchableOpacity onPress={update}>
                        {data.secureTextEntry ?
                            <Feather style={styles.icon2} name="eye-off" size={30}/>
                            :
                            <Feather style={styles.icon} name="eye" size={30}/>
                        }
                    </TouchableOpacity>
                </View>

                <View>
                    <TouchableOpacity onPress={forgot}>
                        <Text style={{fontSize: 15, paddingTop:5, color:'gray' }}>Forgotten Password?</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.button}>
                    <TouchableOpacity style={styles.alin} onPress={loginCheck}>
                        <Text style={{fontSize: 30, paddingTop:15, fontWeight:'bold', color:'white'}}>Login</Text>
                    </TouchableOpacity>
                </View>

                <View>
                    <TouchableOpacity onPress={signCheck}>
                        <Text style={{fontSize: 20, paddingTop:15, fontWeight:'bold', color: ColourPalette.yellow}}>New User? Sign Up</Text>
                    </TouchableOpacity>
                </View>
        </SafeAreaView>
    );
};

const {height} = Dimensions.get('screen');
const picHeight = height * 0.33;

const styles = StyleSheet.create({
    backing: {
        backgroundColor: 'white',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    pic: {
        width: picHeight,
        height: picHeight,
    },
    alin: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        paddingRight: 15,
        paddingTop: 20,
        color: ColourPalette.yellow,
    },
    icon2: {
        paddingRight: 15,
        paddingTop: 20,
        color: ColourPalette.yellow,
    },
    input: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 350,
        height: 80,
        borderRadius: 20,
        paddingLeft: 10,
        marginTop: 20,
        borderWidth: 3,
        fontSize: 15,
        borderColor: ColourPalette.yellow,
    },
    textInput: {
        fontSize: 15,
    },
    button: {
        marginTop: 25,
        marginBottom: 25,
        borderRadius: 20,
        borderWidth: 3,
        width: 150,
        height: 80,
        borderColor: ColourPalette.yellow,
        backgroundColor: ColourPalette.yellow,
    },

});

export default LoginScreen;
