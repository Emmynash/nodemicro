const express = require('express');
const router = express.Router();
const node_app = express();
const request = require('request');
const User = require('./models/user');

const apiKey = `55a4319d486242a3a8cc4cafdb9affc8`;

// router.get('/', function(req, res, next){
//   return res.sendFile(path.join(__dirname + 'login'));
// });

node_app.set('view engine', 'ejs');
node_app.use(express.static(__dirname +'public'));

router.get('/', function(req, res) {
    res.render('login');
})
router.get('/signup', function(req, res){
    res.render('signup');
})

router.post('/signup', function(req, res, next) {
    // post route for the form
    if(req.body.password !== req.body.passwordconf){
      const  error = new Error ("Password don't match");
      error.status = 400;
      return next (error);
    }
        if (req.body.firstName && 
            req.body.lastName && 
            req.body.email && 
            req.boy.password && 
            req.body.passwordconf){
            const userData = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: req.body.password,
                passwordconf: req.body.passwordconf
            }
             User.create(userData, function(error, result){
            if(error){
                return next (error);
            }else{
                req.session.userId = user_.id;
                return res.redirect ('/index');
            }
        });
    }else if(req.body.logEmail && req.body.logPassword){
        User.authenticate (req.body.logEmail, req.body.logPassword, function(err, user){
            if(err || !user){
                const error = new Error("Incorrect login credential, please try again");
                error.status = 401;
                return error;
            
        }else{
            req.session.userId = user_.id;
            return res.redirect('/index');
        }
    });
       
}else{
    const error = new Error("All fields required");
    error.status = 400;
    return error;
}
})
router.post('/', function(req, res){
    // res.render('index');
    // console.log(req.body.town);
    
    let town = req.body.town;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${town}&units=imperial&appid=${apiKey}`;
    
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
});


module.exports = router;

