var mongo = require("mongodb").MongoClient;
var ObjectID = require("mongodb").ObjectID;


function Persistencia() {
    this.alumnosCol = undefined;

    this.encontrarAlumno = function (nick, callback) {
        encontrar(this.alumnosCol, { nick: nick }, callback);
    };
    this.encontrarAlumnoCriterio = function (criterio, callback) {
        encontrar(this.alumnosCol, criterio, callback);
    };
    this.encontrarTodosAlumnos = function (callback) {
        encontrarTodos(this.alumnosCol, callback);
    }

    function encontrar(coleccion, criterio, callback) {
        coleccion.find(criterio).toArray(function (error, usr) {
            if (usr.length == 0) {
                console.log('Elemento no encontrado')
                callback(undefined);
            }
            else {
                callback(usr[0]);
                console.log("Elemento encontrado: "+usr[0]._id)
                
            }
        });
    };

    function encontrarTodos(coleccion, callback) {
        coleccion.find().toArray(function (error, usr) {
            callback(usr);
        });
    };
    function encontrarTodosCriterio(coleccion,criterio, callback) {
        coleccion.find(criterio).toArray(function (error, usr) {
             if (usr.length == 0) {
                console.log('Elemento no encontrado')
                callback(undefined);
            }
            else {
                callback(usr);
                console.log("Elemento encontrado: ")
            }
        });
    };

    this.modificarColeccionAlumnos = function (usr, callback) {
        modificarColeccion(this.alumnosCol, usr, callback);
    }

    function modificarColeccion(coleccion, usr, callback) {
        coleccion.findAndModify({ _id: ObjectID(usr._id) }, {}, usr, {}, function (err, result) {
            if (err) {
                console.log("No se pudo actualizar");
            }
            else {
                console.log("actualizado");
            }
            callback(result);
        });
    }

    this.insertarAlumno = function (usu, callback) {
        insertar(this.alumnosCol, usu, callback);
    }

    function insertar(coleccion, usu, callback) {
        coleccion.insert(usu, function (err, result) {
            if (err) {
                console.log("error");
            }
            else {
                console.log("Nuevo elemento creado: "+usu);
                callback(usu);
            }
        });
    }

    this.eliminarAlumno = function (uid, callback) {
        eliminar(this.alumnosCol, { _id: ObjectID(uid) }, callback);
    }

    function eliminar(coleccion, criterio, callback) {
        
        coleccion.remove(criterio, function (err, result) {
            if (!err) {
                callback(result);
            }
        });
    }

    function obtenerCriterio(coleccion, criterio, callback) {
        coleccion.find(criterio).toArray(function (error, col) {
            callback(col);
        })
    }

    this.conectar = function (callback) {
        var pers = this;
        mongo.connect("xxxxxxxxx", function (err, db) {
           if (err) {
                console.log("No pudo conectar a la base de datos")
            }

            else {
                console.log("conectado a Mongo: colección de alumnos");
                
                dbo=db.db("langDB");
                col=dbo.collection("alumnos");//, function (err, col) {
                if (!col) {
                    console.log("No pude obtener la coleccion alumnos")
                }
                else {
                    console.log("tenemos la colección alumnos");
                    pers.alumnosCol = col;
                }
                //});
                callback(db);
            }

        });
    }
}

module.exports.Persistencia = Persistencia;