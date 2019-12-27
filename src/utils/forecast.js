const request = require('request')

const forecast = (coordinates,callback) => {
    const forecastURL = 'https://api.darksky.net/forecast/25fce17c6478b4338b4fd429f876a3f4/'+coordinates.latitude+','+coordinates.longitude +'?units=si'
    
    request({ url: forecastURL, json:true }, (error, response) => {
        if(error) {
            callback("Not able to connect",undefined)
        } else if(response.error) {
            callback("Input not valid",undefined)
        } else {
        callback(undefined,{
            summary: response.body.hourly.summary,
            temperature: response.body.currently.temperature,
            probability: response.body.currently.precipProbability
        })
        }
    })
}

module.exports = forecast