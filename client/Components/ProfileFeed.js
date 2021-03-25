import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import ProfileListing from './ProfileListing';
import listingsApi from "../api/listingsApi";
import * as Location from "expo-location";

export default function ProfileFeed({sort, filter}){

    const [listings, setListings] = useState([]);

    const [location, setLocation] = React.useState({
        location: {},
    });

    const[refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        loadListings();
        getLocation();
    }, []);

    const loadListings = async() => {
        await listingsApi.getSpecificListings({userN: global.username}).then( r => {
            setListings(r.data);
        });
    }

    const getLocation = async () => {
        const {granted} = await Location.requestPermissionsAsync();
        if (!granted) return;
        const {coords: {latitude, longitude}} = await Location.getLastKnownPositionAsync();
        locationChange({lat1: latitude, lon1: longitude});
    };

    const locationChange = (input) => {
        setLocation({
            location: input,
        });
    };

    function getImage(category){
        if(category == 'food') return require('../Resources/Images/food.png')
        if(category == 'medicine') return require('../Resources/Images/medicine.png')
        if(category == 'bills') return require('../Resources/Images/bills.png')
        if(category == 'general') return require('../Resources/Images/general.png')
    }

    const listingRender = ({ item }) => (
        <ProfileListing
            listing_id = {item.listing_id}
            title={item.title}
            category={item.category}
            image = {getImage(item.category)}
            profilePicture={item.profilePic == null ? require('../Resources/Images/defaultProfile.jpg') : item.profilePic}
            priceCategory={item.priceCategory}
            user = {global.username}
            creator={global.username}
            refreshFunc ={loadListings}
        />
    );

    return (
        <FlatList style = {{flex: 1}} showsVerticalScrollIndicator={false}
                  data = {listings}
                  keyExtractor = {item => item.listing_id.toString()}
                  renderItem={listingRender}
                  refreshing = {refreshing}
                  onRefresh={() => loadListings()}
        />
    );
}
