let request = require('request');

let apiKey = '0ea2e38e26ca69e9c79045f9402ff3a3'; // hide your API key using environment variables
let city = 'portland';
let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

request(url, function(err, response, body) {
    if (err) {
        console.log('error:', error);
    } else {
        console.log('body:', body);
        let weather = JSON.parse(body);
        console.log(weather);
        console.log(`It's ${weather.main.temp} degrees in ${weather.name}!`);
    }
});
