const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const PORT = process.env.PORT || 3000
const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Randy Lahey'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Randy Lahey'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Randy Lahey',
        message: 'I am turning into a martian'
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.address
    if(!address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode(address, (error, { latitude, longitude, location } = {}) => {
        if(error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData)  => {
            if(error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Randy Lahey',
        errorMsg: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Randy Lahey',
        errorMsg: 'Page not found'
    })
})

app.listen(PORT, () => {
    console.log('Server is up on port ' + PORT)
})