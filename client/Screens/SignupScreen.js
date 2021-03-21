import React from 'react';
import {SafeAreaView, View, TextInput, StyleSheet, Text, TouchableOpacity, ScrollView} from 'react-native';

import 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ColourPalette from "../Resources/ColourPalette";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import usersApi from "../api/usersApi";
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ImageChooser from '../Components/ImageChooser';
import ImagePreview from '../Components/ImagePreview';
import * as ImagePicker from 'expo-image-picker';
import listingsApi from '../api/listingsApi';

const SignupScreen  = () => {

    // eslint-disable-next-line no-undef
    const navigation = useNavigation();

    const [data, setData] = React.useState({
        name:  '',
        username: '',
        address: '',
        city: '',
        mobile: '',
        email: '',
        password: '',
        passwordConfirm: '',
        pic: {},
        token: 't',
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

    const addressChange = (input) => {
        setData({
            ...data,
            address: input,
        });
    };

    const cityChange = (input) => {
        setData({
            ...data,
            city: input,
        });
    };

    const mobileChange = (input) => {
        setData({
            ...data,
            mobile: input,
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

    const pictureChange = (input) => {
        setData({
            ...data,
            pic: input,
        });
    };

    const update = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry,
        });
    };

    const SignUpCheck = () => {
        if (data.name === '' || data.username === '' || data.email === '' || data.address === '' || data.city === '' ||
            data.mobile === '' || data.password === '' || data.passwordConfirm === '') {
            alert('Sorry All Fields Need To Be Filled. You Do Not Need To Assign A Profile Picture. Please Try Again');
        } else if (data.password !== data.passwordConfirm) {
            alert('Sorry Passwords Do Not Match. Please Try Again');
        } else {
            let submission = {
                name: data.name,
                username: data.username,
                address: data.address,
                city: data.city,
                mobile: data.mobile,
                email: data.email,
                password: data.password,
                token: data.token,
                picture: JSON.stringify(data),
            }
            console.log(submission);
            usersApi.verify(data).then(r => {
                console.log("here " + r.data);
                if (r.data === 'NO USER') {
                    usersApi.addUser(submission).then(() => alert('Added new user'));
                    navigation.navigate("FeedScreen");
                } else {
                    alert('User with this username already exists, please try another username');
                }
            });
        }
    }

    const back = () => {
        navigation.navigate("LoginScreen");
    }

    let imgChooser = {
        upload: {
            description: "Profile Picture - Gallery",
            icon: "picture",
            hand: () => getFromLibrary()
        },
    };

    const getPhotos = () => {
        return (
            <View style={styles.uploadedImages}>
                {!isEmpty(data.pic) ? <ImagePreview filePath={data.pic}/> : null}
            </View>

        );
    };

    const isEmpty = (obj) => {
        return Object.keys(obj).length === 0;
    };

    const getFromLibrary = async () => {
        let options = {
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            quality: 0.5,
            base64: true,

        };
        let result = await ImagePicker.launchImageLibraryAsync(options);

        console.log(result);

        if (!result.cancelled) {
            const b64 = 'data:image/png;base64,'+result.base64;
            addFilePath(b64);
        }
    };

    const addFilePath = (u) => {
        if (isEmpty(data.pic)) {
            pictureChange({uri: u});
        } else {
            alert("You Can Only Have 1 Profile Picture");
        }
    };


    return (
        <ScrollView showsVerticalScrollIndicator={false}>
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
                <TextInput style={styles.textInput} placeholder="Address" onChangeText={(input)=> addressChange(input)}/>
                <Ionicons name='location-sharp' size={30} style={styles.icon}/>
            </View>

            <View style={styles.input} >
                <TextInput style={styles.textInput} placeholder="City" onChangeText={(input)=> cityChange(input)}/>
                <MaterialIcons name='location-city' size={30} style={styles.icon}/>
            </View>

            <View style={styles.input} >
                <TextInput style={styles.textInput} placeholder="Mobile" onChangeText={(input)=> mobileChange(input)}/>
                <MaterialCommunityIcons name='cellphone-basic' size={30} style={styles.icon}/>
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

                <View style={styles.camera}>
                    <ImageChooser title={imgChooser.upload.description} icon={imgChooser.upload.icon} action={imgChooser.upload.hand} />
                </View>
            {getPhotos()}

            <View style={styles.button}>
                <TouchableOpacity style={styles.alin} onPress={SignUpCheck}>
                    <Text style={{fontSize: 30, paddingTop:15, fontWeight:'bold', color:'white'}}>Register</Text>
                </TouchableOpacity>
            </View>

            <View>
                <TouchableOpacity onPress={back}>
                    <Text style={{fontSize: 25, paddingTop:5, paddingBottom:35, color:'gray' }}>Back</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
        </ScrollView>

    );

};

const styles = StyleSheet.create({
    backing: {
        paddingTop:40,
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
    uploadedImages: {
        flexDirection: "row",
        backgroundColor: ColourPalette.white,
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
        padding: 10,
        justifyContent: 'center',

    },
    camera: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 2, flexDirection: "row",
        backgroundColor: ColourPalette.white,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        paddingTop: 12,
        paddingLeft: 28,
        paddingRight: 28,
    },

});
    export default SignupScreen;
