const request = require('request')

const geocode = (address,callback) => {
    const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYWpheTE5OTkiLCJhIjoiY2s0bDJ2NzZ3MjN1MzNubzkxNHYxeWJ3YyJ9.8Ag92ldlXIqIKjy-C7NjPQ&limit=1'

    request({url:geocodeURL, json:true}, (error, response) => {
        if (error) {
            callback("Unable to connect",undefined)
        }else if(response.body.features.length === 0){
            callback(" Wrong entry. Try another search",undefined)
        }else {
            callback(undefined,{
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name

            })
        }
    })
}

module.exports = geocode