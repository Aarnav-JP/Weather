const express = require('express');
const bodyparser = require('body-parser');
const https = require('https');

const app = express();
app.use(bodyparser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
})
app.post('/', function (req, res) {
    // res.send('server is running');
    req.body.city;
    var city = req.body.city;
    var url = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=ca355c0de8b2de2aaff18f0630150329&units=metric';
    https.get(url, function (response) {
        // response is the callback we get from the api when the get request is successfully performed
        // console.log(response);
        response.on('data', function (data) {
            // console.log(typeof data);
            // below result is hexadecimal we convert it using json
            // console.log(data);
            // console.log(JSON.parse(data));
            // below contains all the data meaningful data sent by api server
            var weatherreport = JSON.parse(data);
            var tmp = weatherreport.main.temp;
            // console.log(tmp);
            var desc = weatherreport.weather[0].description;
            // console.log(desc);
            // res.send('<h1>The temprature in Kushinagar is : ' + tmp + ' degrees celcius and currently it is ' + desc + '</h1>');
            // since we can only send only one res.sned() but we need to multiple lines so we use
            res.write('<h1>The temprature in ' + city + ' is : ' + tmp + ' degrees celcius</h1>');
            res.write('<p>it is currently ' + desc + '</p>');
            var icon = weatherreport.weather[0].icon;
            var iurl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
            res.write('<img src = ' + iurl + '>');


            // now if want to display an image which suitably describes the weather 
        })
    })
})

app.listen(3000, function () {
    console.log('Server is running on port 3000.');
});