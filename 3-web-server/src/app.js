const express = require('express')
const path = require('path') 
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const app = express()


const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs') 
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// 3-setup static directory to serve
//routes : mapping between a string and file/function
app.get('', (req, res) => { // we do route so they can start working
    res.render('index',{
        title : 'Home Page',
        footer : 'home footer'
    })
})
app.get('/about', (req, res) => {
    res.render('about', { //this is how we make it dynamic, by sendeing an object
        title: 'About page...',
        name: 'abood in about',
        footer : 'About footer'
    })
})

app.get('/products', (req, res)=>{
    if(!req.query.search){
        res.send('error : you must provide a search terms')
    }
    res.send({
        products : []
    })
})


app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        name: 'abood wants help',
        footer : 'Help footer'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        res.send('error occured, please provide a fucking location u idiot')
    }

    geocode(req.query.address, (error, data) => {
        if (error) {
            return red.send({error}) //so it comes out as json 
            //return res.send('error occured, please provide a location name')
        }

        const loc = data.location
        const len = data.len

        forecast(data.longitude, data.latitude, (error, data) => {
            if (error) {
                return res.send('error occured, we cant find anything');
            }
            res.send({
                forecast: data,
                location: loc,
                len 
            });
        });
    });
});




app.get('/help/*', (req,res)=>{

    res.send('theres no articles here')

})
app.get('*', (req,res)=>{
    res.send('404 ERROR')
})



const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath)) //by default it takes the index.html

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})
