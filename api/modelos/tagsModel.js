var tagsModel = {}
const mongoose = require("mongoose")
const Schema = mongoose.Schema

let tagsSchema = new Schema({
    codigo: String,
    nombre: String,
    estado: Number
})

const myModel = mongoose.model("tags", tagsSchema)

tagsModel.buscarCodigo = function(post, callback){
    myModel.find({ codigo: post.codigo}, {nombre:1, codigo: 1, estado: 1}).then((respuesta) => {
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
tagsModel.crear = function(post,callback) {

    const instancia = new myModel 
    instancia.codigo = post.codigo
    instancia.nombre = post.nombre
    instancia.estado = post.estado

    instancia.save().then((respuesta) => {
        return callback({ state:true })
    }).catch((error) => {
        return callback({ state:false, mensaje:error })
    })




    // tags.push({ codigo: post.codigo, nombre: post.nombre, estado: post.estado})
    // return callback ({ state: true })
}
tagsModel.listar = function (post, callback) { 
    myModel.find({}, {}).then((respuesta) => {
        return callback({state: true, data: respuesta})
    })
}
tagsModel.listarid = function (post, callback) { 
    myModel.find({_id:post._id}, {}).then((respuesta) => {
        return callback({state: true, data: respuesta})
    })
}
tagsModel.update = function(post, callback) {
    myModel.updateOne({_id:post._id},{nombre:post.nombre, estado:post.estado}).then((respuesta) => {
        console.log(respuesta)
        return callback({state:true})
    }).catch((error) => {
        console.log(error)
        return callback({state: false, mensaje: error})
    })
}
tagsModel.delete = function(post, callback) {
    myModel.deleteOne({_id:post._id}).then((respuesta) => {
        console.log(respuesta)
        return callback({state:true})
    }).catch((error) => {
        console.log(error)
        return callback({state: false, mensaje: error})
    })
}

module.exports.tagsModel = tagsModel
