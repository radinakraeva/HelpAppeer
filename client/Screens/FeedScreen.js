/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import Feed from '../Components/Feed';

import ColourPalette from '../Resources/ColourPalette';
import CircleIcon from '../Components/CircleIcon';
import Button from '../Components/Button';
import listingsApi from "../api/listingsApi";
import {useNavigation} from '@react-navigation/native';
import IconButton from '../Components/IconButton';
import PriceSelection from '../Components/PriceSelection';

export default function FeedScreen(){

    const [filterMenu, toggleFilterMenu] = useState({visible: false, sorting: 'time', prices1: true, prices2: true, prices3: true});

    const navigation = useNavigation();

    const newListing = () => {
        navigation.navigate("NewListingScreen");
    };

    const goToChat = () => {
        navigation.navigate("ChatListScreen");
    };

    const showFilterMenu = () => {
            return (
                <View style={styles.filterMenu}>
                    <Text style={styles.filterMenuTitle}>Sort by</Text>
                    <View style={styles.sortBy}>
                        <PriceSelection text={'time'} color={filterMenu.sorting === 'time' ? ColourPalette.yellow : ColourPalette.darkBlue} onPress={() => toggleFilterMenu({...filterMenu, sorting: 'time'})}/>
                        <PriceSelection text={'distance'} color={filterMenu.sorting === 'distance' ? ColourPalette.yellow : ColourPalette.darkBlue} onPress={() => toggleFilterMenu({...filterMenu, sorting: 'distance'})}/>
                    </View>
                    <Text style={styles.filterMenuTitle}>Filter</Text>
                    <View style={styles.sortBy}>
                        <PriceSelection text={'£'} color={filterMenu.prices1 ? ColourPalette.yellow : ColourPalette.darkBlue} onPress={() => changePrices1()}/>
                        <PriceSelection text={'££'} color={filterMenu.prices2 ? ColourPalette.yellow : ColourPalette.darkBlue} onPress={() =>changePrices2()}/>
                        <PriceSelection text={'£££'} color={filterMenu.prices3 ? ColourPalette.yellow : ColourPalette.darkBlue} onPress={() => changePrices3()}/>
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

    return (
        <SafeAreaView style = {styles.feedScreen} >
            <View style = {styles.topSection}>
                <View style = {styles.topLeftSection}>

                    <Text style = {styles.text}>Find a listing in</Text>
                    <Text style = {styles.locationText}>Glasgow</Text>
                </View>

            </View>

            <Feed style = {styles.feed} sort={filterMenu.sorting} filter={[filterMenu.prices1,filterMenu.prices2,filterMenu.prices3]}/>
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
        paddingVertical: 15,
        flexDirection: 'row',
        justifyContent: 'center',
    }
})
