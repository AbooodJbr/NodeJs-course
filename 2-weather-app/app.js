const request = require('request')

const geocode = require('./utils/geocode')
const forecast=require('./utils/forecast')

geocode('New York', (error, data)=>{
    console.log('error', error )
    console.log('data', data )
    
    forecast( data.longitude, data.latitude,(error, data) => {
        console.log('Error', error)
        console.log('Data', data)
      })

})

