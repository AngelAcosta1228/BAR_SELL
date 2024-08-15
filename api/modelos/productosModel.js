let productosModel = {};
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let productosSchema = new Schema({
    cod_cat: String,
    cod_prod: String,
    nombre: String,
    precio: Number, 
    estado: Number,
    imagen: String,
    color: String
     
});

const myModel = mongoose.model("productos", productosSchema);

productosModel.buscarCodigo = function(post, callback) {
    myModel.find({ cod_prod: post.cod_prod }, { 
        nombre: 1, 
        cod_prod: 1, 
        precio: 1, 
        estado: 1 
    }).then((respuesta) => {
        // console.log(respuesta);
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
productosModel.crear = function(post, callback) {
    const instancia = new myModel({
        cod_cat: post.cod_cat,
        cod_prod: post.cod_prod,
        precio: post.precio,
        nombre: post.nombre,
        estado: post.estado,
        color: post.color,
    });

    if(post.imagen == ""){
        instancia.imagen = "http://localhost:3003/assets/default.png"
    }else{
        instancia.imagen = post.imagen
    }

    instancia.save().then((respuesta) => {
        console.log(respuesta);
        return callback({ state: true });
    }).catch((error) => {
        console.log(error);
        return callback({ state: false, mensaje: error });
    });
};
productosModel.listar = function(post, callback) {
    myModel.find({}).then((respuesta) => {
        return callback({ state: true, data: respuesta });
    }).catch((error) => {
        console.log(error);
        return callback({ state: false, mensaje: error });
    });
};
productosModel.listarid = function (post, callback) { 
    myModel.find({_id:post._id}, {}).then((respuesta) => {
        return callback({state: true, data: respuesta})
    })
}
productosModel.update = function(post, callback) {
    myModel.updateOne({ _id: post._id }, { 
        nombre: post.nombre, 
        estado: post.estado, 
        cod_cat: post.cod_cat,
        precio: post.precio,
        imagen: post.imagen,
        color: post.color

    }).then((respuesta) => {
        console.log(respuesta);
        return callback({ state: true });
    }).catch((error) => {
        console.log(error);
        return callback({ state: false, mensaje: error });
    })
};
productosModel.delete = function(post, callback) {
    myModel.deleteOne({_id:post._id}).then((respuesta) => {
        console.log(respuesta)
        return callback({state:true})
    }).catch((error) => {
        console.log(error)
        return callback({state: false, mensaje: error})
    })
}

module.exports.productosModel = productosModel;
