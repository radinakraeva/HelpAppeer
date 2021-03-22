import client from './client'

const getListing = (listingID) => {
    return client.post("/getAListing", listingID);
};

const getUser = (listingID) => {
    console.log(listingID);
    return client.post("/getAListingUser", listingID);
};

const removeSpecificListings = (listingID) => {
    console.log(listingID);
    return client.post("/removeListing", listingID);
};

const getSpecificListings = (userN) => {
    return client.post("/getSpecificListing", userN);
};

const getListings = () => {
    return client.post("/getListings");
}

const addListing = (listingInfo) => {
    return client.post("/createListing", listingInfo);
}



export default { addListing, getListings, getListing, getSpecificListings, removeSpecificListings, getUser }


