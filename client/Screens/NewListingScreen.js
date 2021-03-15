/* eslint-disable prettier/prettier,no-trailing-spaces */
import React, { useState, useEffect } from 'react';
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
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';

import  MapView, { Marker } from 'react-native-maps';



const NewListingScreen = (props) => {


    const [displayLoc, setDisplayLoc] = useState(false);
    const [location, setLocation] = useState({});

    const getLocation = async () => {

        const {granted} = await Location.requestPermissionsAsync();
        if (!granted) return;
        const {coords: {latitude, longitude}} = await Location.getLastKnownPositionAsync();
        setLocation({lat1: latitude, lon1: longitude});
    };

    useEffect(() => {
        getLocation();
    },[]);

    const setUpLocation = () => {
        if (!isEmpty(location)) {
            setDisplayLoc(true);
        } else {
            getLocation();
        }

    };

    const glasgow = {latitude: 55.860916, longitude: -4.251433};

    const renderMap = () => {
        return (
            <View>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        // latitude: location.lat1,
                        // longitude: location.lon1,
                        latitude: location.lat1,
                        longitude: location.lon1,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    provider={'google'}

                />
                <Marker coordinate={{ latitude :  location.lat1 , longitude : location.lon1 }}/>
            </View>
        );
    };

    let categories = {
        food: {
            icon: "shoppingcart",
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

    const [name, updateName] = useState("");
    const [desc, updateDesc] = useState("");
    const [addInfo, updateAddInfo] = useState("");

    const [cats, updateCats] = useState({
        food: {
            icon: "shoppingcart",
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
            hand: () => getFromLibrary()
        },
        capture: {
            description: "Camera",
            icon: "camerao",
            hand: () => captureImage()
        }
    };




    const submitListing = () => {
        //get all data submitted into database
        console.log("Name: " + name);
        console.log("Categories: " + categories);
        console.log("Description: " + desc);
        console.log("Price: " + price);
        console.log("Photos:");
        console.log("Location:");
        console.log("Additional info: " + addInfo);

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


    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);

    const getFromLibrary = async () => {
        let options = {
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            quality: 1,
        };
        let result = await ImagePicker.launchImageLibraryAsync(options);

        console.log(result);

        if (!result.cancelled) {
            addFilePath(result.uri);
        }
    };



    const captureImage = async () => {
        let options = {
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
            saveToPhotos: true,
            storageOptions: {
                privateDirectory: true,
            }
        };

        let result = await ImagePicker.launchCameraAsync(options);

        console.log(result);

        if (!result.cancelled) {
            addFilePath(result.uri);
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
                    <Text style={ cats.food.selected === true ? styles.catTextSelected : styles.catText}>Groceries</Text>
                </View>
                <View style={styles.catIcons}>
                    <IconButton
                        iconName={ cats.medicine.icon }
                        onPress={ () => chooseCategory("medicine") }
                        iconBgColor = { getBgColor("medicine")}
                        size={60} />
                    <Text style={ cats.medicine.selected === true ? styles.catTextSelected : styles.catText}>Medicine</Text>

                </View>
                <View style={styles.catIcons}>
                    <IconButton
                        iconName={ cats.bills.icon }
                        onPress={ () => chooseCategory("bills") }
                        iconBgColor = { getBgColor("bills")}
                        size={60} />
                    <Text style={ cats.bills.selected === true ? styles.catTextSelected : styles.catText}>Bills</Text>

                </View>
                <View style={styles.catIcons}>
                    <IconButton
                        iconName={ cats.general.icon }
                        onPress={ () => chooseCategory("general") }
                        iconBgColor = { getBgColor("general")}
                        size={60} />
                    <Text style={ cats.general.selected === true ? styles.catTextSelected : styles.catText}>General</Text>

                </View>
            </View>
        );
    };

    const getBgColor = (cat) => {
        return cats[cat].selected ? ColourPalette.yellow : ColourPalette.darkBlue;
    };

    return (
        <Screen>
            <View style={styles.top}>
                <Text style={styles.title}>Add a new listing</Text>
                <View style={styles.backButton}>
                    <IconButton iconName={'close'} onPress={goBack} iconBgColor={ColourPalette.darkBlue} size={35}/>
                </View>
            </View>
            <Text style={styles.subtitle}> Name</Text>
            <InputField placeholder="Name" onChange={text => updateName(text)}/>

            <Text style={styles.subtitle}>Category</Text>
            {getCategories()}

            <Text style={styles.subtitle}>Description</Text>
            <InputField size={150} placeholder="Description" onChange={text => updateDesc(text)}/>

            <Text style={styles.subtitle}>Price</Text>
            <View style={styles.pounds}>
                <PriceSelection text={'£'} color={price.chosen == 1 ? ColourPalette.yellow : ColourPalette.darkBlue} onPress={() => updatePrice("1")}/>
                <PriceSelection text={'££'} color={price.chosen == 2 ? ColourPalette.yellow : ColourPalette.darkBlue} onPress={() => updatePrice("2")}/>
                <PriceSelection text={'£££'} color={price.chosen == 3 ? ColourPalette.yellow : ColourPalette.darkBlue} onPress={() => updatePrice("3")}/>
            </View>



            <Text style={styles.subtitle}>Pictures</Text>
            <View style={styles.camera}>
                <ImageChooser title={imgChooser.capture.description} icon={imgChooser.capture.icon} action={imgChooser.capture.hand}/>
                <ImageChooser title={imgChooser.upload.description} icon={imgChooser.upload.icon} action={imgChooser.upload.hand} />
            </View>
            {getPhotos()}


            <Text style={styles.subtitle}>Location</Text>

            {displayLoc ?
                renderMap() :
                <View style={styles.locButtonView}>
                    <ImageChooser title={"Use my location"} icon={'home'} action={() => setUpLocation()} />
                </View>}

            <Text>{location.lat1}</Text>
            <Text>{location.lon1}</Text>

            <InputField placeholder="Additional information (e.g. apt number)" onChange={text => updateAddInfo(text)}/>


            <View style={styles.bottomSection}>
                <Button title="Create" onPress={submitListing} />
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
        fontSize: 13,
    },
    catTextSelected:{
        color: ColourPalette.darkBlue,
        fontSize: 13,
        fontWeight: 'bold',
    },
    pounds: {
        flexDirection: 'row',
        justifyContent: 'center',
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
    locButtonView: {
        flex: 1,
        alignItems:'center',
        paddingHorizontal: '17.5%',
    },

    map:{
        height: 150,
        width:'100%',
    },

    bottomSection:{
        marginTop: 20,
        alignItems: 'center',
        height: '8%',
        marginBottom: 40,

    }
});


export default NewListingScreen;
