/* eslint-disable prettier/prettier,no-trailing-spaces */
import React, { useEffect } from 'react';
import {StyleSheet, View, Text, Alert} from 'react-native';

import Screen from "../Components/Screen";
import InputField from '../Components/InputField';
import Button from '../Components/Button';
import ColourPalette from '../Resources/ColourPalette';
import IconButton from '../Components/IconButton';
import ImageChooser from '../Components/ImageChooser';
import ImagePreview from '../Components/ImagePreview';
import PriceSelection from '../Components/PriceSelection';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import MapView, { Marker } from 'react-native-maps';

import listingsApi from '../api/listingsApi';


const NewListingScreen = (props) => {


    const [data, setData] = React.useState({
        title: '',
        category: '',
        description: '',
        price: -1,
        photo1: {},
        photo2: {},
        photo3: {},
        location: {},
        addInfo: ''
    });

    const titleChange = (input) => {
        setData({
            ...data,
            title: input,
        });
    };

    const categoryChange = (input) => {
        setData({
            ...data,
            category: input,
        });
    };

    const descChange = (input) => {
        setData({
            ...data,
            description: input,
        });
    };

    const priceChange = (input) => {
        setData({
            ...data,
            price: input,
        });
    };

    const addInfoChange = (input) => {
        setData({
            ...data,
            addInfo: input,
        });
    };

    const photo1Change = (input) => {
        setData({
            ...data,
            photo1: input,
        });
    };

    const photo2Change = (input) => {
        setData({
            ...data,
            photo2: input,
        });
    };

    const photo3Change = (input) => {
        setData({
            ...data,
            photo3: input,
        });
    };

    const locationChange = (input) => {
        setData({
            ...data,
            location: input,
        });
    };

    const [displayLoc, setDisplayLoc] = React.useState(false);

    const getLocation = async () => {

        const {granted} = await Location.requestPermissionsAsync();
        if (!granted) return;
        const {coords: {latitude, longitude}} = await Location.getLastKnownPositionAsync();
        locationChange({lat1: latitude, lon1: longitude});
    };

    useEffect(() => {
        getLocation();
    },[]);

    const setUpLocation = () => {
        if (!isEmpty(data.location)) {
            setDisplayLoc(true);
        } else {
            getLocation();
        }

    };

    const renderMap = () => {
        return (
            <View>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: data.location.lat1,
                        longitude: data.location.lon1,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    provider={'google'}
                >
                <Marker
                    coordinate={{ latitude :  data.location.lat1,
                            longitude : data.location.lon1 }}
                    pinColor={ColourPalette.darkBlue}
                />
            </MapView>
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


    const [cats, updateCats] = React.useState({
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


    const submitListing = () => {

        //check if any required info is missing
        if (data.title === '' || data.category === '' || data.price === -1 || isEmpty(data.location) || data.description === '') {
            alert('Sorry all required fields need to be filled. ');

        } else { //if not, submit

            const msg = "Are you sure you want to submit? Listing cannot be edited afterwards."
            Alert.alert("Submit", msg,
                [{
                    text: 'Edit',
                    onPress: () => console.log('returning to editing'),
                    style: 'cancel',
                }, {
                    text: 'Post',
                    onPress: () => {
                        console.log('creating a new listing!');
                        databaseSubmission();
                    },
                }],
                {cancelable: true}
            );
        }

    };

    const databaseSubmission = () => {

        let date = new Date();

        let submission = {
            user: "username???",
            time: date,
            listing: JSON.stringify(data)
        };

        console.log(JSON.stringify(submission));
        listingsApi.addListing(submission).then(() => alert('Your listing has been created!'));


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
            base64: true,
        };
        let result = await ImagePicker.launchImageLibraryAsync(options);

        // console.log(result);

        if (!result.cancelled) {
            const b64 = 'data:image/png;base64,'+result.base64;
            addFilePath(b64);
        }
    };

    const captureImage = async () => {
        let options = {
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
            saveToPhotos: true,
            storageOptions: {
                privateDirectory: true,
            },
            base64: true,
        };

        let result = await ImagePicker.launchCameraAsync(options);

        // console.log(result);

        if (!result.cancelled) {
            const b64 = 'data:image/png;base64,'+result.base64;
            addFilePath(b64);
        }
    };


    const addFilePath = (u) => {
        if (isEmpty(data.photo1)) {
            photo1Change({uri: u});
        } else if (isEmpty(data.photo2)) {
            photo2Change({uri: u});
        } else if (isEmpty(data.photo3)) {
            photo3Change({uri: u});
        } else {
            alert("You can only upload up to 3 pictures");
        }
    };

    const getPhotos = () => {
        return (
            <View style={styles.uploadedImages}>
                {!isEmpty(data.photo1) ? <ImagePreview filePath={data.photo1}/> : null}
                {!isEmpty(data.photo2) ? <ImagePreview filePath={data.photo2}/> : null}
                {!isEmpty(data.photo3) ? <ImagePreview filePath={data.photo3}/> : null}
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
        categoryChange(cat);
        updateCats(categories);
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
            <Text style={styles.subtitle}> Title</Text>
            <InputField placeholder="Listing's title" onChangeText={text => titleChange(text)}/>

            <Text style={styles.subtitle}>Category</Text>
            {getCategories()}

            <Text style={styles.subtitle}>Description</Text>
            <InputField size={150} placeholder="Description" onChangeText={text => descChange(text)}/>

            <Text style={styles.subtitle}>Price</Text>
            <View style={styles.pounds}>
                <PriceSelection text={'£'} color={data.price == 1 ? ColourPalette.yellow : ColourPalette.darkBlue} onPress={() => priceChange("1")}/>
                <PriceSelection text={'££'} color={data.price == 2 ? ColourPalette.yellow : ColourPalette.darkBlue} onPress={() => priceChange("2")}/>
                <PriceSelection text={'£££'} color={data.price == 3 ? ColourPalette.yellow : ColourPalette.darkBlue} onPress={() => priceChange("3")}/>
            </View>



            <Text style={styles.subtitle}>Pictures</Text>
            <View style={styles.camera}>
                <ImageChooser title={imgChooser.capture.description} icon={imgChooser.capture.icon} action={imgChooser.capture.hand}/>
                <ImageChooser title={imgChooser.upload.description} icon={imgChooser.upload.icon} action={imgChooser.upload.hand} />
            </View>
            {getPhotos()}


            <Text style={styles.subtitle}>Location</Text>

            <View style={styles.mapSection}>
            {displayLoc ?
                renderMap() :
                <View style={styles.locButtonView}>
                    <ImageChooser title={"Use my location"} icon={'home'} action={() => setUpLocation()} />
                </View>}
            </View>

            <InputField placeholder="Additional information (e.g. apt number)" onChangeText={text => addInfoChange(text)}/>


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
    mapSection:{
        marginBottom:15,
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
