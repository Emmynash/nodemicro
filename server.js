const express = require ('express');
const node_app = express();
const bodyparser = require('body-parser');
const request = require('request');

const apiKey = `55a4319d486242a3a8cc4cafdb9affc8`

node_app.set('view engine', 'ejs');
node_app.use(express.static('public'));
node_app.use(bodyparser.urlencoded({extended: true}));


node_app.get('/', function(req, res){
    res.render('index');
})
node_app.post('/', function(req, res){
    // res.render('index');
    // console.log(req.body.town);
    
    let town = req.body.town
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${town}&units=imperial&appid=${apiKey}`
    
    request(url, function(err, response, body){
        if(err){
            res.render('index', {weather: null, error: 'error, Please try again'});
        }
        else{
          let weather = JSON.parse(body) ;
          if(weather.main == undefined){
              res.render('index', {weather: null, error: 'error, please try again'});
          } else{
              let weatherText = 'its ${weather.main.temp} degrees in ${weather.name}!'
              res.render('index', {weather: weatherText, error: null});
          }
              
          }
        
    });
})


node_app.listen(process.env.PORT, process.env.IP)
// node_app.listen(3000, function(){
//     console.log('Listening on port 3000');
// })