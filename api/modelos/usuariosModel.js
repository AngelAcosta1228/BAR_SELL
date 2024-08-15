var usuariosModel = {}
const mongoose = require("mongoose")
const Schema = mongoose.Schema

let usuariosSchema = new Schema({
    email: String,
    password: String,
    nombre: String,
    estado: Number,
    direccion: String,
    telefono: String,
    rol : Number,
    codigoact : String,
    ciudad : String

})

const myModel = mongoose.model("usuarios", usuariosSchema)

usuariosModel.buscaremail = function(post, callback){
    myModel.find({ email: post.email}, {nombre:1, email: 1, estado: 1}).then((respuesta) => {
        console.log(respuesta)
        if(respuesta.length == 0) {
            return callback({ posicion: -1})
        } else {
            return callback({ posicion: respuesta.length})
        }
    }).catch((error) => {
        console.log(error)
        return callback({ posicion: 0, state: false, mensaje: error})
    })
}
usuariosModel.crear = function(post,callback) {

    const instancia = new myModel 
    instancia.email = post.email
    instancia.password = post.password
    instancia.direccion = post.direccion
    instancia.telefono = post.telefono
    instancia.nombre = post.nombre
    instancia.estado = 0
    instancia.rol = 2 // 1 Admin 2 cliente
    instancia.codigoact = post.azar

    instancia.save().then((respuesta) => {
        return callback({ state:true })
    }).catch((error) => {
        return callback({ state:false, mensaje:error })
    })




    // usuarios.push({ email: post.email, nombre: post.nombre, estado: post.estado})
    // return callback ({ state: true })
}
usuariosModel.listar = function (post, callback) { 
    myModel.find({}, {password:0}).then((respuesta) => {
        return callback({state: true, data: respuesta})
    })
}
usuariosModel.listarid = function (post, callback) { 
    myModel.find({_id:post._id}, {password:0}).then((respuesta) => {
        return callback({state: true, data: respuesta})
    })
}
usuariosModel.update = function(post, callback) {
    myModel.updateOne({_id:post._id},{
        nombre:post.nombre,
        estado:post.estado,
        telefono:post.telefono, 
        direccion:post.direccion,
        ciudad:post.ciudad,
        rol:post.rol,
        }

    ).then((respuesta) => {
        console.log(respuesta)
        return callback({state:true})
    }).catch((error) => {
        console.log(error)
        return callback({state: false, mensaje: error})
    })
}
usuariosModel.activar = function(post, callback) {
    myModel.updateOne({email:post.email, codigoact:post.codigoact},{estado: 1}).then((respuesta) => {
        console.log(respuesta)
        return callback({state: true, respuesta:respuesta})
    }).catch((error) => {
        console.log(error)
        return callback({state: false, mensaje: error})
    })
}
usuariosModel.actualizardatos = function(post, callback) {

    myModel.updateOne({_id:post._id},{
        nombre:post.nombre,
        telefono:post.telefono, 
        direccion:post.direccion,
        ciudad:post.ciudad,
        

    }).then((respuesta) => {
        console.log(respuesta)
        return callback({state:true})
    }).catch((error) => {
        console.log(error)
        return callback({state: false, mensaje: error})
    })
}
usuariosModel.delete = function(post, callback) {
    myModel.deleteOne({_id:post._id}).then((respuesta) => {
        console.log(respuesta)
        return callback({state:true})
    }).catch((error) => {
        console.log(error)
        return callback({state: false, mensaje: error})
    })
}
usuariosModel.login = function (post, callback) { 


    myModel.find({
        email: post.email, 
        password: post.password,
    }
    , {nombre: 1, estado: 1, rol:1 }).then((respuesta) => {
        
        return callback({state: true, data: respuesta})
    }) 
    .catch((error) => {
        console.log(error)
        return callback({ state: false, mensaje: error})
    })
}

module.exports.usuariosModel = usuariosModel

