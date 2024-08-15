const tagsModel = require("../modelos/tagsModel.js").tagsModel;
const tagsController = {};

tagsController.save = function(request, response) {
    let post = { 
        codigo: request.body.codigo,
        nombre: request.body.nombre, 
        estado: request.body.estado
    };

    // Validar codigo
    if (!post.codigo) {
        return response.json({ state: false, mensaje: "el campo codigo es obligatorio", campo: "codigo" });
    }

    // Validar nombre
    if (!post.nombre) {
        return response.json({ state: false, mensaje: "el campo nombre es obligatorio", campo: "nombre" });
    }
    if (post.nombre.length < 4) {
        return response.json({ state: false, mensaje: "el campo nombre debe contener minimo 4 caracteres", campo: "nombre" });
    }
    if (post.nombre.length > 50) {
        return response.json({ state: false, mensaje: "el campo nombre debe contener maximo 50 caracteres", campo: "nombre" });
    }

    // Validar estado
    if (post.estado === undefined || post.estado === null) {
        return response.json({ state: false, mensaje: "el campo estado es obligatorio", campo: "estado" });
    }
    if (typeof post.estado === 'string') {
        if (post.estado.toLowerCase() === "true") {
            post.estado = true;
        } else if (post.estado.toLowerCase() === "false") {
            post.estado = false;
        } else {
            return response.json({ state: false, mensaje: "el campo estado debe ser true o false", campo: "estado" });
        }
    }

    // Crear objeto post después de todas las validaciones
    

    tagsModel.buscarCodigo(post, function(resultado) {
        if (resultado.posicion == -1) {
            tagsModel.crear(post, function(respuesta) {
                if (respuesta.state === true) {
                    return response.json({ state: true, mensaje: "producto creado correctamente" });
                } else {
                    return response.json({ state: false, mensaje: "Error al guardar" });
                }
            });
        } else {
            return response.json({ state: false, mensaje: "el codigo ya existe" });
        }
    });
};
tagsController.listar = function(request, response) {
    tagsModel.listar(null, function(respuesta) {
        response.json(respuesta);
    });
};
tagsController.listarid = function(request, response) {

    let post = { 
        _id:request.body._id,
    }

    if (!post._id) {
        return response.json({ state: false, mensaje: "el campo id es obligatorio", campo: "_id" });
    }

    tagsModel.listarid(post, function(respuesta) {
        response.json(respuesta);
    });
};
tagsController.update = function(request, response) {
    let post = { 
        _id:request.body._id,
        nombre:request.body.nombre,
        estado:request.body.estado
    }

    if (!post._id) {
        return response.json({ state: false, mensaje: "el campo id es obligatorio", campo: "_id" });
    }
    if (!post.nombre) {
        return response.json({ state: false, mensaje: "el campo nombre es obligatorio", campo: "nombre" });
    }
    if (post.estado === undefined || post.estado === null) {
        return response.json({ state: false, mensaje: "el campo estado es obligatorio", campo: "estado" });
    }

    tagsModel.update(post, function(respuesta) {
        if (respuesta.state == true) {
            response.json({ state: true, mensaje: "se actualizo el elemento correctamente" });
        } else {
            response.json({ state: false, mensaje: "se presento un error al actualizar el elemento", error: respuesta });
        }
    });
};
tagsController.delete = function(request, response) {
    let post = { 
        _id:request.body._id,
        nombre:request.body.nombre,
        estado:request.body.estado
    }

    if (!post._id) {
        return response.json({ state: false, mensaje: "el campo id es obligatorio", campo: "_id" });
    }

    tagsModel.delete(post, function(respuesta) {
        if (respuesta.state == true) {
            response.json({ state: true, mensaje: "se elimino el elemento correctamente" });
        } else {
            response.json({ state: false, mensaje: "se presento un error al eliminar el elemento", error: respuesta });
        }
    });
};

module.exports.tagsController = tagsController;








