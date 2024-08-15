const categoriasModel = require("../modelos/categoriasModel.js").categoriasModel;
const categoriasController = {};

categoriasController.save = function(request, response) {
    var post = {
        cod_cat : request.body.cod_cat,
        nombre: request.body.nombre,
        estado: request.body.estado

    }

    // Validar cod_cat
    if (!post.cod_cat) {
        return response.json({ state: false, mensaje: "el campo codigo de categoria es obligatorio", campo: "cod_cat" });
    }
    if(post.cod_cat.length < 3 ){
        response.json({state: false, mensaje: "el campo codigo de categoria debe tener minimo 4 caracteres", campo:"cod_cat"})
        return false
    }
    if(post.cod_cat.length >= 50 ){
        response.json({state: false, mensaje: "el campo codigo de categoria debe tener maximo 50 caracteres", campo:"cod_cat"})
        return false
    }

    // Validar nombre
    if (!post.nombre) {
        return response.json({ state: false, mensaje: "el campo nombre es obligatorio", campo: "nombre" });
    }
    if (post.nombre.length <= 2) {
        return response.json({ state: false, mensaje: "el campo nombre debe contener minimo 3 caracteres", campo: "nombre" });
    }
    if (post.nombre.length > 50) {
        return response.json({ state: false, mensaje: "el campo nombre debe contener maximo 50 caracteres", campo: "nombre" });
    }

    // Validar estado
    if (post.estado === undefined || post.estado === null) {
        return response.json({ state: false, mensaje: "el campo estado es obligatorio", campo: "estado" });
    }
    

    // Crear objeto post después de todas las validaciones


    categoriasModel.buscarCodigo(post, function(resultado) {
        if (resultado.posicion == -1) {
            categoriasModel.crear(post, function(respuesta) {
                if (respuesta.state === true) {
                    return response.json({ state: true, mensaje: "categoria creado correctamente" });
                } 
                else {
                    return response.json({ state: false, mensaje: "Error al guardar" });
                }
            });
        } else {
            return response.json({ state: false, mensaje: "el codigo de la categoria ya existe" });
        }
    });
};
categoriasController.listar = function(request, response) {
    categoriasModel.listar(null, function(respuesta) {
        response.json(respuesta);
    });
};
categoriasController.listarid = function(request, response) {

    let post = { 
        _id:request.body._id,
    }

    if (!post._id) {
        return response.json({ state: false, mensaje: "el campo id de la categoria es obligatorio", campo: "_id" });
    }

    categoriasModel.listarid(post, function(respuesta) {
        response.json(respuesta);
    });
};
categoriasController.update = function(request, response) {
    let post = { 
        _id:request.body._id,
        nombre:request.body.nombre,
        estado:request.body.estado
    }

    if (!post._id) {
        return response.json({ state: false, mensaje: "el campo id de la categoria es obligatorio", campo: "_id" });
    }
    if (!post.nombre) {
        return response.json({ state: false, mensaje: "el campo nombre de categoria es obligatorio", campo: "nombre" });
    }
    if (!post.estado) {
        return response.json({ state: false, mensaje: "el campo estado de categoria es obligatorio", campo: "estado" });
    }

    // Validar nombre
    if (!post.nombre) {
        return response.json({ state: false, mensaje: "el campo nombre es obligatorio", campo: "nombre" });
    }
    if (post.nombre.length < 2) {
        return response.json({ state: false, mensaje: "el campo nombre debe contener minimo 3 caracteres", campo: "nombre" });
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

    categoriasModel.update(post, function(respuesta) {
        if (respuesta.state == true) {
            response.json({ state: true, mensaje: "se actualizo el elemento correctamente" });
        } else {
            response.json({ state: false, mensaje: "se presento un error al cargar el elemento", error: respuesta });
        }
    });
};
categoriasController.delete = function(request, response) {
    let post = { 
        _id:request.body._id,
    }

    if (!post._id) {
        return response.json({ state: false, mensaje: "el campo id de la categoria es obligatorio", campo: "_id" });
    }

    categoriasModel.delete(post, function(respuesta) {
        if (respuesta.state == true) {
            response.json({ state: true, mensaje: "se elimino el elemento correctamente" });
        } else {
            response.json({ state: false, mensaje: "se presento un error al eliminar el elemento", error: respuesta });
        }
    });
};

module.exports.categoriasController = categoriasController;








