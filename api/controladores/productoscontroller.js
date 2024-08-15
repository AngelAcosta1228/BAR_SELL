const productosModel = require("../modelos/productosModel.js").productosModel;
const productosController = {};

productosController.save = function(request, response) {
    let { cod_prod, cod_cat, nombre, estado , precio, imagen, color} = request.body;

    // validar cod_cat
    if (!cod_cat) {
        return response.json({ state: false, mensaje: "el campo cod_cat es obligatorio", campo: "cod_cat" });
    }
    // Validar cod_prod
    if (!cod_prod) {
        return response.json({ state: false, mensaje: "el campo cod_prod es obligatorio", campo: "cod_prod" });
    }
    
    if (!/^\d+$/.test(cod_prod)) {
        return response.json({ state: false, mensaje: "el campo codigo de producto debe ser numerico", campo: "cod_prod" });
    }

    // Validar nombre
    if (!nombre) {
        return response.json({ state: false, mensaje: "el campo nombre es obligatorio", campo: "nombre" });
    }
    if (nombre.length < 4) {
        return response.json({ state: false, mensaje: "el campo nombre debe contener minimo 4 caracteres", campo: "nombre" });
    }
    if (nombre.length > 50) {
        return response.json({ state: false, mensaje: "el campo nombre debe contener maximo 50 caracteres", campo: "nombre" });
    }

    // Validar estado
    if (estado === undefined || estado === null) {
        return response.json({ state: false, mensaje: "el campo estado es obligatorio", campo: "estado" });
    }
    if (typeof estado === 'string') {
        if (estado.toLowerCase() === "true") {
            estado = true;
        } else if (estado.toLowerCase() === "false") {
            estado = false;
        } else {
            return response.json({ state: false, mensaje: "el campo estado debe ser true o false", campo: "estado" });
        }
    }

    // Crear objeto post después de todas las validaciones
    let post = { cod_prod, cod_cat, nombre, estado, precio, imagen, color};

    productosModel.buscarCodigo(post, function(resultado) {
        if (resultado.posicion == -1) {
            productosModel.crear(post, function(respuesta) {
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
productosController.listar = function(request, response) {
    productosModel.listar(null, function(respuesta) {
        response.json(respuesta);
    });
};
productosController.listarid = function(request, response) {

    let post = { 
        _id:request.body._id,
    }

    if (!post._id) {
        return response.json({ state: false, mensaje: "el campo id es obligatorio", campo: "_id" });
    }

    productosModel.listarid(post, function(respuesta) {
        response.json(respuesta);
    });
};
productosController.update = function(request, response) {
    let post = { 
        _id:request.body._id,
        cod_cat:request.body.cod_cat,
        nombre:request.body.nombre,
        precio:request.body.precio,
        estado:request.body.estado,
        imagen: request.body.imagen,
        color: request.body.color
    }
    
    if (!post.cod_cat) {
        return response.json({ state: false, mensaje: "el campo cod_cat es obligatorio", campo: "cod_cat" });
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
    if (!post.precio){
        response.json({state: false,mensaje: "el campo precio es obligatorio", campo:"precio"})
        return false
    }
    if(post.precio.length < 3 ){
        response.json({state: false, mensaje: "el campo precio debe contener minimo 3 caracteres", campo:"precio"})
        return false
    }
    if(post.precio.length > 10 ){
        response.json({state: false, mensaje: "el campo precio debe contener maximo 10 caracteres", campo:"precio"})
        return false
    }

    productosModel.update(post, function(respuesta) {
        if (respuesta.state == true) {
            response.json({ state: true, mensaje: "se actualizo el elemento correctamente" });
        } else {
            response.json({ state: false, mensaje: "se presento un error al cargar el elemento", error: respuesta });
        }
    });
};
productosController.delete = function(request, response) {
    let post = { 
        _id:request.body._id,
    }

    if (!post._id) {
        return response.json({ state: false, mensaje: "el campo id es obligatorio", campo: "_id" });
    }

    productosModel.delete(post, function(respuesta) {
        if (respuesta.state == true) {
            response.json({ state: true, mensaje: "se elimino el producto correctamente" });
        } else {
            response.json({ state: false, mensaje: "se presento un error al eliminar el elemento", error: respuesta });
        }
    });
};

module.exports.productosController = productosController;
