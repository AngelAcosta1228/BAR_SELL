const { json } = require("body-parser");
const categoriasController = {};

categoriasController.catsave = function (request, response)  {
    let { cod_cat, nombre, estado } = request.body;

    // Validar cod_cat
    if (!cod_cat) {
        return response.json({ state: false, mensaje: "el campo cod_cat es obligatorio", campo: "cod_cat" });
    }
    if (isNaN(cod_cat)) {
        cod_cat = parseInt(cod_cat);
        return response.json({ state: false, mensaje: "el campo cod_cat debe tener ser numerico", campo: "cod_cat" });
    }
    
    // Convertir a string para verificar la longitud
    if (cod_cat.length > 5) {
        return response.json({ state: false, mensaje: "el campo cod_cat debe tener maximo 5 caracteres", campo: "cod_cat" });
    }

    // Validar nombre
    if (!nombre) {
        return response.json({ state: false, mensaje: "el campo nombre es obligatorio", campo: "nombre" });
    }
    if (nombre.length > 50) {
        return response.json({ state: false, mensaje: "el campo nombre debe tener maximo 50 caracteres", campo: "nombre" });
    }
    if (nombre.length < 3) {
        return response.json({ state: false, mensaje: "el campo nombre debe tener minimo 3 caracteres", campo: "nombre" });
    }

    // Validar estado
    if (estado === undefined || estado === null) {
        return response.json({ state: false, mensaje: "el campo estado es obligatorio", campo: "estado" });
    }
    if (estado === "true") {
        estado = true;
    } else if (estado === "false") {
        estado = false;
    } else {
        return response.json({ state: false, mensaje: "el campo estado es debe ser true o false", campo: "estado" });
    }
    if (!cod_cat || !nombre || estado === undefined) {
        return response.json({ state: true, mensaje: "la categoria se almaceno correctamente" });
    }
    // Si todos los campos estan validados


    categorias.push({cod_cat, nombre, estado});

    response.json({
        state: true,
        mensaje: "La categoria se almaceno correctamente"
    });
}

categoriasController.listar = function (request, response) { 
    response.json({"state": true, data: productos})
}

module.exports.categoriasController = categoriasController

