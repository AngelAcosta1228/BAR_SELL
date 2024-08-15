//Admin middlewar//
let soloadmin = function(request,response, next){
    let rol = request.session.rol
    if(rol == 1){
        next()
    } else {
        response.json({state:false, mensaje:"Esta Api solo la pueden usar los Administradores"})
    }
}
//Logeados Middlewar//
let solologueados = function(request,response, next){
  
    if(request.session._id != undefined){
        next()
    } else {
        response.json({state:false, mensaje:"debe iniciar sesion"})
    }
}

//categorias//

const categoriasController = require("./api/controladores/categoriasController").categoriasController

app.post("/categorias/save", soloadmin,function(request,response){
    categoriasController.save(request,response)
})
app.post("/categorias/listar",  function(request, response) {
    categoriasController.listar(request,response)
})
app.post("/categorias/listarid", function(request, response) {
    categoriasController.listarid(request,response)
})
app.post("/categorias/update", soloadmin, function(request,response){
    categoriasController.update (request,response)
})
app.post("/categorias/delete", soloadmin, function(request,response){
    categoriasController.delete (request,response)
})

//productos//

const productosController = require("./api/controladores/productoscontroller").productosController

app.post("/productos/save", soloadmin, function(request,response){
    productosController.save(request,response)
})
app.post("/productos/listar", function(request, response) {
    productosController.listar(request,response)
})
app.post("/productos/listarid", function(request, response) {
    productosController.listarid(request,response)
})
app.post("/productos/update", soloadmin, function(request,response){
    productosController.update (request,response)
})
app.post("/productos/delete", soloadmin, function(request,response){
    productosController.delete (request,response)
})

// tags

const tagsController = require("./api/controladores/tagsController").tagsController


app.post("/tags/save",soloadmin, function(request,response){
    tagsController.save(request,response)
})
app.get("/tags/listar", function(request, response) {
    tagsController.listar(request,response)
})
app.get("/tags/listarid", function(request, response) {
    tagsController.listarid(request,response)
})
app.put("/tags/update",soloadmin,  function(request,response){
    tagsController.update (request,response)
})
app.delete("/tags/delete",soloadmin, function(request,response){
    tagsController.delete (request,response)
})

// api usuarios

const usuariosController = require("./api/controladores/usuariosController").usuariosController


app.post("/usuarios/save", soloadmin, function(request,response){
    usuariosController.save(request,response)
})
app.post("/usuarios/registro",function(request,response){
    usuariosController.registro(request,response)
})
app.post("/usuarios/listar", function(request, response) {
    usuariosController.listar(request,response)
})
app.get("/usuarios/listarid/:_id" , function(request, response) {
    usuariosController.listarid(request,response)
})
app.post("/usuarios/update",soloadmin, function(request,response){
    usuariosController.update (request,response)
})
app.post("/usuarios/delete",soloadmin, function(request,response){
    usuariosController.delete (request,response)
})
app.post("/usuarios/login", function(request,response){
    usuariosController.login (request,response)
})
app.post("/usuarios/actualizardatos", function(request,response){
    usuariosController.actualizardatos (request,response)
})
app.post("/usuarios/state", function(request,response){
    response.json(request.session)
})
app.post("/usuarios/logout", solologueados, function(request,response){
    response.session.destroy
    response.json({state:true, mensaje: "session cerrada correctamente"})
})
app.post("/usuarios/activar", function(request,response){
    usuariosController.activar (request,response)
})
app.post("/usuarios/misdatos" , solologueados,  function(request, response) {
    usuariosController.misdatos(request,response)
})


var Anexos = require("./api/controladores/anexosController.js").anexosController

app.post("/uploads",function(request, response) {
    Anexos.Imagen(request,response)
})