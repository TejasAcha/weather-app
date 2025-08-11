const path = require('path')
const express = require('express');
const forecast = require('../../weather_app/utils/forecast');
const geocode = require('../../weather_app/utils/geocode');
const { title } = require('process');
const hbs = require('hbs');
const { error } = require('console');

const app = express()
const viewsPath = path.join(__dirname, "../templates/views");
const publicDirectoryPath = path.join(__dirname, '../public');
const partialsPath = path.join(__dirname, "../templates/partials");

app.set('view engine', 'hbs')
app.set('views', viewsPath);
hbs.registerPartials(partialsPath)
app.use(express.static(publicDirectoryPath))


app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: "Tejas"
    })
})


app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: "Acha"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'I am here to help you. let me know what you want. I will be helping you a lot.',
        name: "Sai"
    })
})


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
        error: 'Provide an actual address'
    })
    }
    else{

        geocode(req.query.address, (error, {latitude,longitude, place} = {}) =>  {
            //locat = latitude + ',' + longitude;
            if (error) {
                return res.send({
                    error : error
                })
            } 
            
            forecast(latitude,longitude, (error, data) => {
                if (error) {
                    return res.send({
                        error : error
                    }) 
                }
                
                res.send({
                    forecast: data,
                    location: place,
                    address: req.query.address,
                })
                console.log(req.query.address);
                
            })
            
        })

        

    }

    
    
})

app.get('/help/{*any}', (req, res) => {
    res.render('notFound', {
        message: 'help article not found'
    })
  });

app.get('/{*any}', (req, res) => {
    res.render('notFound', {
        message: '404 not found'
    })
  });



app.listen(3000, () => {
    console.log("Server is up and running")
})