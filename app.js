const express = require("express") 
const nodemon = require("nodemon");

global.app = express()
global.config = require("./config.js").config
global.categorias = []
global.productos = []
global.usuarios = []
global.sha256 = require("sha256")
global.path = require("path")
global.multer = require ('multer')

let bodyParser = require("body-parser")
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
global.raiz = __dirname

app.all('*',function(req, res, next){

    var whitelist = req.headers.origin;
   // console.log(whitelist)
    res.header('Access-Control-Allow-Origin', whitelist);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS,HEAD');
    res.header('Access-Control-Allow-Headers', " authorization, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    res.header("Access-Control-Allow-Credentials", "true");
  // res.header('Set-Cookie: cross-site-cookie=name; SameSite=None; Secure');


   next();

});

// configuracion CORS //
var cors = require("cors")
app.use(cors({
    origin: function(origin, callback){
        if (!origin) return callback(null,true)

        if (config.origin.indexOf(origin) === -1){
            return callback("error de cors", false)
        }

        return callback(null,true)
    }
}))

// configuracion mongose //
const mongoose = require("mongoose")
mongoose.connect("mongodb://172.18.0.2:27017/" + config.bd).then(
    () => console.log("connected")
)

// configuracion de sesiones//
let session = require("express-session")({
    secret:config.palabraclave,
    resave:true,
    saveUninitialized:true,
    cookie:{path:"/",httpOnly:true, maxAge: config.maxage },   //, secure:true//
    name:config.nombrecookie,
    rolling:true
})

app.use(session)

require("./routes.js")

app.use('/assets', express.static(__dirname + '/assets'))
app.use('/uploads', express.static(__dirname + '/uploads'))

app.listen(config.puerto, function(){
    console.log ("Servidor funcionando por puerto " + config.puerto)
})
