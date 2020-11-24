const request = require('request')


const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=15f05027b8c864c162975a41af723b2d&query=' + latitude + ',' + longitude

    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to weather services.')
        } else if (body.error) {
            callback('Unable to find location. Try another search.')
        } else {
            callback(undefined, body.current.weather_descriptions[0] +
                '. Temperature: ' + body.current.temperature + ' °C' + 
                ', feels like: ' + body.current.feelslike + ' °C' +
                ', wind speed: ' + body.current.wind_speed + ' km/h')
        }
    })
}

module.exports = forecast