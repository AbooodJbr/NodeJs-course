const request = require('request')

const geocode = (address, callback )=> {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoib21hcmFua2giLCJhIjoiY2xsNHd0N3owMGJraDNrbGFxaWJoM2wzZCJ9.by_2A7C0maKUnMuMu-TMBQ&limit=1'
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('unable to connect to weather service', undefined)
        } else if (response.body.features.length === 0) {
            callback('unable to find location, try again please', undefined)
        } else {
            callback(undefined, {
                latitude : response.body.features[0].center[0],
                longitude : response.body.features[0].center[1],
                location : response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode