const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();

const apiKey = '0ea2e38e26ca69e9c79045f9402ff3a3';

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    // res.send('Hello World!');
    res.render('index', { weather: 'abc', error: '' });
});

// app.post('/', function(req, res) {
//     res.render('index');
//     console.log(req.body.city);
// });

// https://www.digitalocean.com/community/questions/blocked-by-cors-policy-the-access-control-allow-origin-mean-stack
// FIX ISSUE: Access to XMLHttpRequest at from origin has been blocked by CORS policy
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     next();
// });

app.post('/', function(req, res) {
    // 1. Setting up our URL
    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    // 2. Make our API call:
    request(url, function(err, response, body) {
        // check for an error
        console.log(body);
        if (err) {
            res.render('index', { weather: null, error: 'Error, please try again' });
        }
        // 3. Display the weather:
        else {
            let weather = JSON.parse(body);
            // this would be undefined, is if our user input a string that isn’t a city
            if (weather.main == undefined) {
                res.render('index', { weather: null, error: 'Error, please try again' });
            } else {
                let weatherText = `It's ${weather.main.temp} °C in ${weather.name}!`;
                res.render('index', { weather: weatherText, error: null });
            }
        }
    });
});

app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});
