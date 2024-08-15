var categoriasModel = {};
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let categoriasSchema = new Schema({
    cod_cat: String,
    nombre: String,
    estado: Number
});

const myModel = mongoose.model("categorias", categoriasSchema);

categoriasModel.buscarCodigo = function(post, callback) {

    myModel.find({ cod_cat: post.cod_cat }, {  cod_cat: 1, nombre: 1, estado: 1 }).then((respuesta) => {
        console.log(respuesta);
        if (respuesta.length == 0) {
            return callback({ posicion: -1 });
        } else {
            return callback({ posicion: respuesta.length });
        }
    }).catch((error) => {
        console.log(error);
        return callback({ posicion: 0, state: false, mensaje: error });
    });
};
categoriasModel.crear = function(post, callback) {
    const instancia = new myModel({
        cod_cat: post.cod_cat,
        nombre: post.nombre,
        estado: post.estado
    });

    instancia.save().then((respuesta) => {
        console.log(respuesta);
        return callback({ state: true });
    }).catch((error) => {
        console.log(error);
        return callback({ state: false, mensaje: error });
    });
};
categoriasModel.listar = function(post, callback) {
    myModel.find({}).then((respuesta) => {
        return callback({ state: true, data: respuesta });
    }).catch((error) => {
        console.log(error);
        return callback({ state: false, mensaje: error });
    });
};
categoriasModel.listarid = function (post, callback) { 
    myModel.find({_id:post._id}, {}).then((respuesta) => {
        return callback({state: true, data: respuesta})
    })
}
categoriasModel.update = function(post, callback) {
    myModel.updateOne({ _id: post._id }, { nombre: post.nombre, estado: post.estado }).then((respuesta) => {
        console.log(respuesta);
        return callback({ state: true });
    }).catch((error) => {
        console.log(error);
        return callback({ state: false, mensaje: error });
    });
};
categoriasModel.delete = function(post, callback) {
    myModel.deleteOne({_id:post._id}).then((respuesta) => {
        console.log(respuesta)
        return callback({state:true})
    }).catch((error) => {
        console.log(error)
        return callback({state: false, mensaje: error})
    })
}

module.exports.categoriasModel = categoriasModel;
