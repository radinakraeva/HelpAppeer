import client from './client'

const endpoint = '/listings';

const getListing = () => client.get(endpoint);

const addListing = (listingInfo) => {
    return client.post("/createListing", listingInfo);
}

export default { addListing }


