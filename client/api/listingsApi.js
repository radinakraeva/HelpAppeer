import client from './client'

const endpoint = '/listings';

const getListing = (listingID) => {
    return client.post("/getAListing", listingID);
};


const addListing = (listingInfo) => {
    return client.post("/createListing", listingInfo);
}

export default { addListing, getListing };


