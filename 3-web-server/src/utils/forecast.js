const request = require('request')

const forecast = (longitude, latitude, callback )=> {
    const url = "http://api.weatherstack.com/current?access_key=2deb5f7be12797b32a95ff5225361aa4&query=" + longitude + "," + latitude
    request({ url, json: true }, (error, response) => {
        if (error) {
            callback('unable to connect to weather service', undefined)
        } else {
            const res = "the temperature is " + response.body.current.temperature +" but it feels like "  + response.body.current.feelslike
            callback(undefined,res)
        }
    })
}

module.exports = forecast