import React, {useEffect} from 'react';
import {SafeAreaView,View,TextInput,StyleSheet,Text,TouchableOpacity} from 'react-native';


import 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ColourPalette from "../Resources/ColourPalette";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import usersApi from "../api/usersApi";
// import AuthNavigator from "../Navigation/AuthNavigator";
import {useNavigation} from '@react-navigation/native';

import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';

const SignupScreen  = () => {

    // eslint-disable-next-line no-undef
    const navigation = useNavigation();

    const [data, setData] = React.useState({
        name: '',
        username: '',
        email: '',
        password: '',
        passwordConfirm: '',
        secureTextEntry: true,
        expoPushToken: ''
    });

    useEffect(() => {
        registerForPushNotificationsAsync().then(token => tokenChange(token));},
        [])


    const registerForPushNotificationsAsync = async () => {
        let token;
        if (Constants.isDevice) {
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                alert('Failed to get push token for push notification!');
                return;
            }
            token = (await Notifications.getExpoPushTokenAsync()).data;
            console.log(token);
        } else {
            alert('Must use physical device for Push Notifications');
        }

        if (Platform.OS === 'android') {
            await Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }

        return token;
    };

    const nameChange = (input) => {
        setData({
            ...data,
            name: input,
        });
    };

    const usernameChange = (input) => {
        setData({
            ...data,
            username: input,
        });
    };

    const emailChange = (input) => {
        setData({
            ...data,
            email: input,
        });
    };

    const passwordChange = (input) => {
        setData({
            ...data,
            password: input,
        });
    };

    const passwordConfirmChange = (input) => {
        setData({
            ...data,
            passwordConfirm: input,
        });
    };

    const tokenChange = (input) => {
        setData({
            ...data,
            expoPushToken: input,
        })
    };

    const update = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry,
        });
    };

    const SignUpCheck = () => {
        if (data.name === '' || data.username === '' || data.email === '' || data.password === '' || data.passwordConfirm === '') {
            alert('Sorry All Fields Need To Be Filled. Please Try Again');
        } else if(data.password !== data.passwordConfirm) {
             alert('Sorry Passwords Do Not Match. Please Try Again');
        } else {
            usersApi.addUser(data).then(() => alert('Added new user'));
            navigation.navigate("FeedScreen");
        }


    };

    const back = () => {
        navigation.navigate("LoginScreen");
    };


    return (
        <SafeAreaView style={styles.backing}>
            <View style={styles.input} >
                <TextInput style={styles.textInput} placeholder="Your Name" onChangeText={(input)=> nameChange(input)}/>
                <FontAwesome5 style={styles.icon} name="user" size={30}/>
            </View>
            <View style={styles.input} >
                <TextInput style={styles.textInput} placeholder="Username" onChangeText={(input)=> usernameChange(input)}/>
                <FontAwesome5 style={styles.icon} name="user-circle" size={30}/>
            </View>
            <View style={styles.input} >
                <TextInput style={styles.textInput} placeholder="Email" onChangeText={(input)=> emailChange(input)}/>
                <MaterialCommunityIcons style={styles.icon} name="email" size={30}/>
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
            <View style={styles.input} >
                <TextInput style={styles.textInput} placeholder="Confirm Password" secureTextEntry={data.secureTextEntry} onChangeText={(input)=> passwordConfirmChange(input)}/>
                <TouchableOpacity onPress={update}>
                    {data.secureTextEntry ?
                        <Feather style={styles.icon2} name="eye-off" size={30}/>
                        :
                        <Feather style={styles.icon} name="eye" size={30}/>
                    }
                </TouchableOpacity>
            </View>
            <View style={styles.button}>
                <TouchableOpacity style={styles.alin} onPress={SignUpCheck}>
                    <Text style={{fontSize: 30, paddingTop:15, fontWeight:'bold', color:'white'}}>Register</Text>
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity onPress={back}>
                    <Text style={{fontSize: 25, paddingTop:5, color:'gray' }}>Back</Text>
                </TouchableOpacity>
            </View>


        </SafeAreaView>

    );

};

const styles = StyleSheet.create({
    backing: {
        backgroundColor: 'white',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 350,
        height: 70,
        borderRadius: 20,
        paddingLeft: 10,
        marginTop: 10,
        borderWidth: 3,
        fontSize: 15,
        borderColor: ColourPalette.yellow,
    },
    textInput: {
        fontSize: 15,
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
    alin: {
        justifyContent: 'center',
        alignItems: 'center',
    },

});

export default SignupScreen;
