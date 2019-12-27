const path = require('path')
const express = require('express') //returns a function instead of object
const hbs = require('hbs')
const geocode = require('../utils/geocode')
const forecast = require('../utils/forecast')

const app = express() //now configure the object

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')


//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)



//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res) => {
    res.render('index',{
        title: 'Weather',
        name: 'Ajay'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title: 'About Me',
        name: 'Ajay'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        title: 'Help',
        name: 'Ajay'
    })
})

app.get('/weather', (req,res) => {
    if(!req.query.address){
        return res.send({
            error: 'No address parameter is given'
        })
    }
    geocode(req.query.address, (error,coordinates) =>  {
        if(error){
            return res.send({
                error
            })
        }
        forecast(coordinates,(error,data) => {
            if(error){
                return res.send({
                    error
                })
            }
            res.send({
                location: coordinates.location,
                forecast: data.summary+" It is currently "+data.temperature+" degrees out. There is a "+data.probability+"\% chance of rain."
            })
        })
    })

})



app.get('*',(req,res) => {
    res.render('404-page',{
        title: '404-page',
        name: 'Ajay'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
}) //starts server and listens on port