/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {View, Text, SafeAreaView, StyleSheet, BackHandler} from 'react-native';
import Feed from '../Components/Feed';

import ColourPalette from '../Resources/ColourPalette';
import CircleIcon from '../Components/CircleIcon';
import Button from '../Components/Button';
import listingsApi from "../api/listingsApi";
import {useNavigation} from '@react-navigation/native';
import IconButton from '../Components/IconButton';
import PriceSelection from '../Components/PriceSelection';


export default function FeedScreen(props){

    console.log('FROM GLOBAL' + global.username);

    console.disableYellowBox = true;

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', () => true);
    }, []);


    // console.log('USERNAME' + props.route.params.username);

    // const [filterMenu, toggleFilterMenu] = useState({visible: false, sorting: 'time', prices1: true, prices2: true, prices3: true});
    //categories:["food","medicine","bills","general"],
    const [filterMenu, toggleFilterMenu] = useState({visible: false,
        food: true, medicine: true, bills: true, general: true,
        prices1: true, prices2: true, prices3: true});

    const navigation = useNavigation();

    const newListing = () => {
        navigation.navigate("NewListingScreen", {username: global.username});
    };

    const goToChat = () => {
        navigation.navigate("ChatListScreen", {username: global.username});
    };

    const openSideMenu = () => {
        // navigation.navigate("DrawerNavigation", {screen: "Profile", params: {username: props.route.params.username}} );
        navigation.openDrawer();
    };

    const showFilterMenu = () => {

        return (
            <View style={styles.filterMenu}>
                {/*<Text style={styles.filterMenuTitle}>Sort by</Text>*/}
                {/*<View style={styles.sortBy}>*/}
                {/*    <PriceSelection text={'time'} color={filterMenu.sorting === 'time' ? ColourPalette.yellow : ColourPalette.darkBlue} onPress={() => toggleFilterMenu({...filterMenu, sorting: 'time'})}/>*/}
                {/*    <PriceSelection text={'distance'} color={filterMenu.sorting === 'distance' ? ColourPalette.yellow : ColourPalette.darkBlue} onPress={() => toggleFilterMenu({...filterMenu, sorting: 'distance'})}/>*/}
                {/*</View>*/}
                <Text style={styles.filterMenuTitle}>Filter</Text>
                <View style={styles.sortBy}>
                    <PriceSelection text={'£'} color={filterMenu.prices1 ? ColourPalette.yellow : ColourPalette.darkBlue} onPress={() => changePrices1()}/>
                    <PriceSelection text={'££'} color={filterMenu.prices2 ? ColourPalette.yellow : ColourPalette.darkBlue} onPress={() =>changePrices2()}/>
                    <PriceSelection text={'£££'} color={filterMenu.prices3 ? ColourPalette.yellow : ColourPalette.darkBlue} onPress={() => changePrices3()}/>
                </View>
                <View style={styles.sortBy}>
                    <PriceSelection text={'food'} color={filterMenu.food ? ColourPalette.yellow : ColourPalette.darkBlue} onPress={() => changeFood()}/>
                    <PriceSelection text={'medicine'} color={filterMenu.medicine ? ColourPalette.yellow : ColourPalette.darkBlue} onPress={() => changeMedicine()}/>
                </View>
                <View style={styles.sortBy}>
                    <PriceSelection text={'bills'} color={filterMenu.bills ? ColourPalette.yellow : ColourPalette.darkBlue} onPress={() => changeBills()}/>
                    <PriceSelection text={'general'} color={filterMenu.general ? ColourPalette.yellow : ColourPalette.darkBlue} onPress={() => changeGeneral()}/>
                </View>

            </View>
        );
    };


    const changeMenu = () => {
        filterMenu.visible ? toggleFilterMenu({...filterMenu, visible: false}) : toggleFilterMenu({...filterMenu, visible: true});

    };

    const changePrices1 = () => {
        filterMenu.prices1 ? toggleFilterMenu({...filterMenu, prices1: false}) : toggleFilterMenu({...filterMenu, prices1: true});
    };

    const changePrices2 = () => {
        filterMenu.prices2 ? toggleFilterMenu({...filterMenu, prices2: false}) : toggleFilterMenu({...filterMenu, prices2: true});
    };

    const changePrices3 = () => {
        filterMenu.prices3 ? toggleFilterMenu({...filterMenu, prices3: false}) : toggleFilterMenu({...filterMenu, prices3: true});
    };

    const changeFood = () => {
        filterMenu.food ? toggleFilterMenu({...filterMenu, food: false}) : toggleFilterMenu({...filterMenu, food: true});
    };

    const changeMedicine = () => {
        filterMenu.medicine ? toggleFilterMenu({...filterMenu, medicine: false}) : toggleFilterMenu({...filterMenu, medicine: true});
    };

    const changeGeneral = () => {
        filterMenu.general ? toggleFilterMenu({...filterMenu, general: false}) : toggleFilterMenu({...filterMenu, general: true});
    };

    const changeBills = () => {
        filterMenu.bills ? toggleFilterMenu({...filterMenu, bills: false}) : toggleFilterMenu({...filterMenu, bills: true});
    };

//hello

    return (
        <SafeAreaView style = {styles.feedScreen} >
            <View style = {styles.topSection}>
                <View style={styles.sideMenuButton}>
                    <IconButton iconName='bars' iconBgColor={ColourPalette.darkBlue} onPress={openSideMenu} size={50}/>
                </View>
                <View style = {styles.topLeftSection}>

                    <Text style = {styles.text}>Find a listing in</Text>
                    <Text style = {styles.locationText}>Glasgow</Text>
                </View>

            </View>

            <Feed style = {styles.feed} filterCats={{food: filterMenu.food, medicine: filterMenu.medicine, bills: filterMenu.bills, general: filterMenu.general}} filter={[filterMenu.prices1,filterMenu.prices2,filterMenu.prices3]} username ={global.username}/>
            {filterMenu.visible ? showFilterMenu() : null}

            <View style = {styles.bottomSection}>
                <View style={{marginHorizontal: 70}}>
                    <IconButton iconName='filter' iconBgColor = {filterMenu.visible ? ColourPalette.yellow : ColourPalette.darkBlue} size ={45} onPress={()=>changeMenu()} />
                </View>
                <Button title = "Add" onPress={newListing} />
                <View style={{marginHorizontal: 70}}>
                    <IconButton iconName='message1' iconBgColor = {ColourPalette.darkBlue} size ={45} onPress={()=>goToChat()}/>
                </View>
            </View>
        </SafeAreaView>

    );


}

const styles = StyleSheet.create({
    feed: {
        position: 'absolute',
        zIndex: 0,
    },
    feedScreen: {
        padding: 12,
        paddingTop: 15,
        height: '100%',
        width: '100%',

    },
    topSection: {
        height: '15%',
        flexDirection: 'row',
    },
    sideMenuButton: {
        paddingVertical: '5%',
        paddingRight: 15,
    },
    topLeftSection:{
        flex:1,
        justifyContent: 'center',
    },

    locationText:{
        fontSize: 24,
        color: ColourPalette.yellow,
    },
    text:{
        fontSize: 15,
    },
    bottomSection:{
        paddingTop: 10,
        alignItems: 'center',
        height: '8%',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    filterMenu: {
        backgroundColor: ColourPalette.darkBlue,
        height: '40%',
        zIndex:1,
        borderRadius: 20,
        marginTop: 10,
    },
    filterMenuTitle: {
        fontSize: 25,
        color: ColourPalette.white,
        marginLeft: 20,
        marginTop: 15,
        fontWeight: 'normal'
    },
    sortBy: {
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'center',
    }
})
