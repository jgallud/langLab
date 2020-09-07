

var persistencia=require("./persistencia.js");
var ObjectID=require("mongodb").ObjectID;
var fs=require("fs");


function Logica(){
	this.persistencia=new persistencia.Persistencia();

	this.persistencia.conectar(function(db){
		console.log("conectado a la base de datos");
	});

}

module.exports.Logica=Logica;