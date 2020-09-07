var fs = require("fs");
var express = require('express');
var app = express();
//var server = require('http').Server(app);
var bodyParser = require("body-parser");

var modelo = require('./server/modelo.js');

var logica=new modelo.Logica();


app.set('port', process.env.PORT || 5000);

app.use(express.static(__dirname + '/'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/', function (request, response) {
    var contenido = fs.readFileSync(__dirname + "/cliente/index.html"); 
    
    response.setHeader("Content-type", "text/html");
    response.send(contenido);
    
});

app.get('/getAllStudents',function(request,response){
    //delega en modelo
    //modelo le pide a persistencia
    var lista=[];

    response.send(lista);
})

// server.listen(app.get('port'), function () {
//     console.log('Node app is running on port', app.get('port'));
// });

app.listen(app.get('port'), function () {
     console.log('Node app is running on port', app.get('port'));
});
