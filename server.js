const express = require ('express');
const node_app = express();
const bodyparser = require('body-parser');



node_app.set('view engine', 'ejs');
node_app.use(express.static(__dirname +'public'));
node_app.use(bodyparser.urlencoded({extended: true}));

const routes = require('./router/route');
node_app.use('/', routes);


node_app.listen(process.env.PORT, process.env.IP);
// node_app.listen(3000, function(){
//     console.log('Listening on port 3000');
// })