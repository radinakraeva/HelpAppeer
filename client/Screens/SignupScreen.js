import React from 'react';
import {SafeAreaView,View,TextInput,StyleSheet,Text,TouchableOpacity} from 'react-native';

import 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ColourPalette from "../Resources/ColourPalette";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import usersApi from "../api/usersApi";
// import AuthNavigator from "../Navigation/AuthNavigator";
import {useNavigation} from '@react-navigation/native';


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
    });

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
            // navigation.navigate("FeedScreen");
        }
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
