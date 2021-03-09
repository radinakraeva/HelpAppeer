/* eslint-disable prettier/prettier,no-trailing-spaces */
import React, { useState } from 'react';
import {StyleSheet, View, Text, TextInput, TouchableWithoutFeedback, PermissionsAndroid, Alert} from 'react-native';

import Screen from "../Components/Screen";
import InputField from '../Components/InputField';
import Button from '../Components/Button';
import ColourPalette from '../Resources/ColourPalette';
import IconButton from '../Components/IconButton';
import ImageChooser from '../Components/ImageChooser';
import ImagePreview from '../Components/ImagePreview';
import PriceSelection from '../Components/PriceSelection';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';



const NewListingScreen = (props) => {


    let categories = {
        food: {
            icon: "apple-o",
            selected: false,
        },
        medicine: {
            icon: "medicinebox",
            selected: false,

        },
        bills: {
            icon: "bulb1",
            selected: false,

        },
        general: {
            icon: "ellipsis1",
            selected: false,

        },
    };

    const [cats, updateCats] = useState({
        food: {
            icon: "apple-o",
            selected: false,
        },
        medicine: {
            icon: "medicinebox",
            selected: false,

        },
        bills: {
            icon: "bulb1",
            selected: false,

        },
        general: {
            icon: "ellipsis1",
            selected: false,

        },
    });

    const [photo1, setPhoto1] = useState({});
    const [photo2, setPhoto2] = useState({});
    const [photo3, setPhoto3] = useState({});

    const [price, setPrice] = useState({chosen: -1});

    let imgChooser = {
      upload: {
          description: "Gallery",
          icon: "picture",
          hand: () => getFromLibrary('photo')
      },
      capture: {
          description: "Camera",
          icon: "camerao",
          hand: () => captureImage('photo')
      }
    };


    const submitListing = () => {

    };

    const goBack = () => {
        const msg = "Are you sure you want to go back?\nAll your progress will be lost.";
        Alert.alert("Exit", msg,
            [{  text: 'Cancel',
                onPress: () => console.log('shantay, you stay'),
                style: 'cancel',
            }, {
                text: 'OK',
                onPress: () => console.log('sashay, away'),
            }],
            { cancelable : true}
        );

    };

    const updatePrice = (index) => {
        setPrice({chosen: index});
    };

    const requestCameraPermission = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.CAMERA,
                    {
                        title: 'Camera Permission',
                        message: 'App needs camera permission',
                    },
                );
                // If CAMERA Permission is granted
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            } catch (err) {
                console.warn(err);
                return false;
            }
        } else return true;
    };

    const requestExternalWritePermission = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        title: 'External Storage Write Permission',
                        message: 'App needs write permission',
                    },
                );
                // If WRITE_EXTERNAL_STORAGE Permission is granted
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            } catch (err) {
                console.warn(err);
                alert('Write permission err', err);
            }
            return false;
        } else return true;
    }

    const getFromLibrary = () => {
        let options = {
            mediaType: 'photo',
            maxWidth: 300,
            maxHeight: 550,
            quality: 1,
        };
        launchImageLibrary(options, (response) => {

            if (response.didCancel) {
                alert('User cancelled camera picker');
                return;
            } else if (response.error !== undefined) {
                alert('Something went wrong :)')
                return;
            }
            //
            // console.log('base64 -> ', response.data);
            // console.log('uri -> ', response.uri);
            // console.log('width -> ', response.width);
            // console.log('height -> ', response.height);
            // console.log('fileSize -> ', response.fileSize);
            // console.log('type -> ', response.type);
            // console.log('fileName -> ', response.fileName);
            //
            // const source = {uri: response.uri}
            // setPhoto1(source);
            addFilePath(response.uri);

            // setPhoto1({uri: response.uri});

        });
    };

    const captureImage = async () => {
        let options = {
            mediaType: "photo",
            maxWidth: 300,
            maxHeight: 550,
            quality: 1,
            saveToPhotos: true,
            storageOptions: {
                privateDirectory: true,
            }
        };


        let isCameraPermitted = await requestCameraPermission();
        let isStoragePermitted = await requestExternalWritePermission();
        if (isCameraPermitted && isStoragePermitted) {
            launchCamera(options, (response) => {

                if (response.didCancel) {
                    alert('User cancelled camera picker');
                    return;
                } else if (response.error !== undefined) {
                    alert('Something went wrong :)')
                    return;
                }
                // console.log('base64  -> ', response.data);
                // console.log('uri -> ', response.uri);
                // console.log('width -> ', response.width);
                // console.log('height -> ', response.height);
                // console.log('fileSize -> ', response.fileSize);
                // console.log('type -> ', response.type);
                // console.log('fileName -> ', response.fileName);

                // setPhoto1({uri: response.uri});
                addFilePath(response.uri);
            });
        }
    };

    const addFilePath = (u) => {
        if (isEmpty(photo1)) {
            setPhoto1({uri: u});
        } else if (isEmpty(photo2)) {
            setPhoto2({uri: u});
        } else if (isEmpty(photo3)) {
            setPhoto3({uri: u});
        } else {
            alert("You can only upload up to 3 pictures");
        }
    };

    const getPhotos = () => {
        return (
            <View style={styles.uploadedImages}>
                {!isEmpty(photo1) ? <ImagePreview filePath={photo1}/> : null}
                {!isEmpty(photo2) ? <ImagePreview filePath={photo2}/> : null}
                {!isEmpty(photo3) ? <ImagePreview filePath={photo3}/> : null}
            </View>

        );
    };

    const isEmpty = (obj) => {
        return Object.keys(obj).length === 0;
    };


    const chooseCategory = (cat) => {
        for (let c in categories) {
            categories[c].selected = false;
        }
        categories[cat].selected = true;
        updateCats(categories);
        console.log(cats);
    };

    const getCategories = () => {

        return (
            <View style={styles.categories}>
                <View style={styles.catIcons}>
                    <IconButton
                        iconName={ cats.food.icon }
                        onPress={ () => chooseCategory("food") }
                        iconBgColor = { getBgColor("food")}
                        size={60} />
                    <Text style={styles.catText}>groceries</Text>
                </View>
                <View style={styles.catIcons}>
                    <IconButton
                        iconName={ cats.medicine.icon }
                        onPress={ () => chooseCategory("medicine") }
                        iconBgColor = { getBgColor("medicine")}
                        size={60} />
                    <Text style={styles.catText}>medicine</Text>

                </View>
                <View style={styles.catIcons}>
                    <IconButton
                        iconName={ cats.bills.icon }
                        onPress={ () => chooseCategory("bills") }
                        iconBgColor = { getBgColor("bills")}
                        size={60} />
                    <Text style={styles.catText}>bills</Text>

                </View>
                <View style={styles.catIcons}>
                    <IconButton
                        iconName={ cats.general.icon }
                        onPress={ () => chooseCategory("general") }
                        iconBgColor = { getBgColor("general")}
                        size={60} />
                    <Text style={styles.catText}>general</Text>

                </View>
            </View>
        );
    };

    const getBgColor = (cat) => {
        return cats[cat].selected ? ColourPalette.yellow : ColourPalette.grey;
    };

    return (
        <Screen>
            <View style={styles.top}>
                <Text style={styles.title}>Add a new listing</Text>
                <View style={styles.backButton}>
                <IconButton iconName={'close'} onPress={goBack} iconBgColor={ColourPalette.grey} size={35}/>
                </View>
            </View>
            <Text style={styles.subtitle}> Name</Text>
            <InputField placeholder="Name"/>

            <Text style={styles.subtitle}>Category</Text>
            {getCategories()}

            <Text style={styles.subtitle}>Description</Text>
            <InputField size={150} placeholder="Description"/>

            <Text style={styles.subtitle}>Price</Text>
            <View style={styles.pounds}>
                <PriceSelection text={'£'} color={price.chosen == 1 ? ColourPalette.yellow : ColourPalette.grey} onPress={() => updatePrice("1")}/>
                <PriceSelection text={'££'} color={price.chosen == 2 ? ColourPalette.yellow : ColourPalette.grey} onPress={() => updatePrice("2")}/>
                <PriceSelection text={'£££'} color={price.chosen == 3 ? ColourPalette.yellow : ColourPalette.grey} onPress={() => updatePrice("3")}/>
            </View>


            <Text style={styles.subtitle}>Pictures</Text>
            <View style={styles.camera}>
                <ImageChooser title={imgChooser.capture.description} icon={imgChooser.capture.icon} action={imgChooser.capture.hand}/>
                <ImageChooser title={imgChooser.upload.description} icon={imgChooser.upload.icon} action={imgChooser.upload.hand} />
            </View>
            {getPhotos()}


            <Text style={styles.subtitle}>Location</Text>
            <Text>Map here with your location</Text>
            <Text>Map here with your location</Text>

            <Text>Map here with your location</Text>

            <Text>Map here with your location</Text>
            <Text>Map here with your location</Text>
            <Text>Map here with your location</Text>
            <Text>Map here with your location</Text>

            <Text>Map here with your location</Text>
            <InputField placeholder="Additional information (e.g. apt number)"/>





            <View style={styles.bottomSection}>
                <Button title="Create" onPress={submitListing}/>
            </View>

        </Screen>
    );
};




const styles = StyleSheet.create({
    title: {
        fontSize: 35,
        fontFamily: "Roboto",
        fontWeight: "bold",
        marginBottom: 20,
        color: ColourPalette.darkBlue,
        flex:15,
    },
    subtitle: {
        marginTop: 10,
        marginBottom: 10,
        fontSize: 18,
        fontFamily: "Roboto",
        fontWeight: "normal",
        color: ColourPalette.darkBlue,

    },

    top:{
        flexDirection: 'row',
        flex:17,
    },
    backButton: {
        flex:2,
        marginTop:6,
    },
    categories: {
        flexDirection: "row",
        flex: 4,
        width: '100%',
    },
    catIcons: {
        flex: 1,
        alignItems: 'center',
    },
    catText:{
        color: ColourPalette.darkBlue,
        fontSize: 12,
    },
    pounds: {
        flexDirection: 'row',
        // backgroundColor: ColourPalette.white,
        // borderRadius: 25,
        // paddingHorizontal: 15,
        // paddingVertical: 5,
        justifyContent: 'center',
        // width: '22.5%',
    },

    camera: {
      flex: 2, flexDirection: "row",
        backgroundColor: ColourPalette.white,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        padding: 2,
    },

    uploadedImages: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: ColourPalette.white,
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
        padding: 10,
        justifyContent: 'center',

    },

    bottomSection:{
        marginTop: 20,
        alignItems: 'center',
        height: '8%',
        marginBottom: 40,

    }
});


export default NewListingScreen;
