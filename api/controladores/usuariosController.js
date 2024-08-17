const { config } = require("../../config.js");

const usuariosModel = require("../modelos/usuariosModel.js").usuariosModel;
const usuariosController = {};

usuariosController.save = function(request, response) {

    let post = { 
        email:request.body.email,
        password:request.body.password,
        telefono:request.body.telefono,
        direccion:request.body.direccion,
        nombre:request.body.nombre,
        estado:request.body.estado,
        ciudad:request.body.ciudad,
        rol:request.body.rol
    };

    // Validar email
    if (!post.email) {
        return response.json({ state: false, mensaje: "el campo email es obligatorio", campo: "email" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (!emailRegex.test(post.email)) {
        return response.json({ state: false, mensaje: 'Invalid email format.' });
    }
    //validar password
    if (!post.password) {
        return response.json({ state: false, mensaje: "el campo password es obligatorio", campo: "password" });
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

    post.password = sha256(post.password + config.passsha256)

    usuariosModel.buscaremail(post, function(resultado) {
        if (resultado.posicion == -1) {

            usuariosModel.crear(post, function(respuesta) {
                if (respuesta.state === true) {
                    return response.json({ state: true, mensaje: "Usuario creado correctamente" });
                } else {
                    return response.json({ state: false, mensaje: "Error al guardar" });
                }
            });
        } else {
            return response.json({ state: false, mensaje: "el email ya existe" });
        }
    });
};
usuariosController.registro = function(request, response) {

    let post = { 
        email:request.body.email,
        password:request.body.password,
        confpassword:request.body.confpassword,
        telefono:request.body.telefono,
        direccion:request.body.direccion,
        nombre:request.body.nombre,
        estado:request.body.estado,
        rol:request.body.rol
    };
    let match

    // Validar email
    if (!post.email) {
        return response.json({ state: false, mensaje: "el campo email es obligatorio", campo: "email" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (!emailRegex.test(post.email)) {
        return response.json({ state: false, mensaje: 'Invalid email format.' });
    }
    //validar password
    if (!post.password) {
        return response.json({ state: false, mensaje: "el campo password es obligatorio", campo: "password" });
    }

    if (!post.confpassword) {
        return response.json({ state: false, mensaje: "el campo confirmar password es obligatorio", campo: "confpassword" });
    }
    if (post.confpassword == post.password) {
        match = true
        
    }else{
        match = false
        return response.json({ state: false, mensaje: "Las contraseñas no coinciden", campo: "confpassword" });
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

    post.password = sha256(post.password + config.passsha256)

    usuariosModel.buscaremail(post, function(resultado) {
        if (resultado.posicion == -1) {

            var azar = "App-"+Math.floor(Math.random() * (9999 - 1000) + 1000);
            post.azar = azar

            const nodemailer = require("nodemailer")

            let transporter = nodemailer.createTransport({
                host:'smtp.gmail.com',
                port:587,
                secure:false,
                requireTLS:true,
                auth:{
                    user:config.usergmail,
                    pass:config.passgmail
                }
            })
             
             let mailOptions = {
                from:config.usergmail,
                to:post.email,
                subject:"verifica tu cuenta codigo: " + post.azar,
                html: 
                `<div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #ddd; border-radius: 5px;">
        <div style="background-color: #007bff; color: #ffffff; padding: 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">Activación de Cuenta</h1>
        </div>
        <div style="padding: 20px;">
                <p style="font-size: 16px; color: #333333; margin: 0 0 10px 0;">Hola [Nombre del Usuario],</p>
                <p style="font-size: 16px; color: #333333; margin: 0 0 10px 0;">Gracias por registrarte en nuestro servicio. Para completar el proceso de registro, por favor utiliza el siguiente código de activación:</p>
                <p style="font-size: 24px; font-weight: bold; color: #007bff; text-align: center; margin: 20px 0;">${post.azar}</p>
                <p style="font-size: 16px; color: #333333; margin: 0 0 10px 0;">También puedes activar tu cuenta haciendo clic en el siguiente enlace:</p>
                <p style="text-align: center; margin: 20px 0;">
                    <a href="http://localhost:4200/activar/${post.email}/${post.azar}" style="display: inline-block; background-color: #007bff; color: #ffffff; text-decoration: none; padding: 10px 20px; border-radius: 5px; font-size: 16px;">Activar Cuenta</a>
                </p>
                <p style="font-size: 16px; color: #333333; margin: 0 0 10px 0;">Si no solicitaste esta cuenta, puedes ignorar este correo electrónico.</p>
                <p style="font-size: 16px; color: #333333; margin: 0 0 10px 0;">Saludos,<br>El equipo de [Nombre de la Empresa]</></p>
            </div><div style="background-color: #f4f4f4; color: #666666; padding: 10px; text-align: center; font-size: 12px;">
                    <p style="margin: 0;">&copy; [Año] [Bar sell]. Todos los derechos reservados.</p>
                </div></div>`
                } 

                transporter.sendMail(mailOptions,(error, info) => {
                if(error){
                    return console.log(error)
                }else{
                    
                }
                })

            usuariosModel.crear(post, function(respuesta) {
                if (respuesta.state === true) {
                    return response.json({ state: true, mensaje: "Usuario creado correctamente , Revise su correo de activacion" });
                } else {
                    return response.json({ state: false, mensaje: "Error al guardar" });
                }
            });
        } else {
            return response.json({ state: false, mensaje: "el email ya existe" });
        }
    });


};
usuariosController.listar = function(request, response) {
    usuariosModel.listar(null, function(respuesta) {
        response.json(respuesta);
    });
};
usuariosController.listarid = function(request, response) {

    let post = { 
        _id:request.params._id,
    }

    if (!post._id) {
        return response.json({ state: false, mensaje: "el campo id es obligatorio", campo: "_id" });
    }

    usuariosModel.listarid(post, function(respuesta) {
        response.json(respuesta);
    });
};
usuariosController.update = function(request, response) {
    let post = { 
        _id:request.body._id,
        rol:request.body.rol,
        nombre:request.body.nombre,
        direccion:request.body.direccion,
        telefono:request.body.telefono,
        estado:request.body.estado,
        
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


    usuariosModel.update(post, function(respuesta) {
        if (respuesta.state == true) {
            response.json({ state: true, mensaje: "se actualizo el elemento correctamente" });
        } else {
            response.json({ state: false, mensaje: "se presento un error al actualizar el elemento", error: respuesta });
        }
    });
};
usuariosController.delete = function(request, response) {
    let post = { 
        _id:request.body._id,
        nombre:request.body.nombre,
        estado:request.body.estado
    }

    if (!post._id) {
        return response.json({ state: false, mensaje: "el campo id es obligatorio", campo: "_id" });
    }

    usuariosModel.delete(post, function(respuesta) {
        if (respuesta.state == true) {
            response.json({ state: true, mensaje: "se elimino el elemento correctamente" });
        } else {
            response.json({ state: false, mensaje: "se presento un error al eliminar el elemento", error: respuesta });
        }
    });
};
usuariosController.login = function(request, response) {

    // console.log(respuesta.usuarios.length)

    let post = { 
        email: request.body.email,
        password: request.body.password,
    }

    if (!post.email) {
        return response.json({ state: false, mensaje: "el campo email es obligatorio", campo: "email" });
    }
    if (!post.password) {
        return response.json({ state: false, mensaje: "el campo password es obligatorio", campo: "password" });
    }
    
    post.password = sha256(post.password + config.passsha256)

    usuariosModel.login(post, function(respuesta) {
        // console.log(respuesta.usuarios.length)
        if (respuesta.state == true){
            if(respuesta.usuarios[0].length == 0){
                response.json({state: false, mensaje: "Error en las credenciales de acceso"})
            } else {
                if(respuesta.usuarios[0].estado == 0){
                    response.json({ state: false, mensaje: "Su cuenta no ha sido activada, verifica tu correo"})
                }
                else{
                    request.session.rol = respuesta.usuarios[0].rol
                    request.session.nombre = respuesta.usuarios[0].nombre
                    request.session._id = respuesta.usuarios[0]._id
                    request.session.direccion = respuesta.usuarios[0].direccion
                    request.session.ciudad = respuesta.usuarios[0].ciudad
                    request.session.telefono = respuesta.usuarios[0].telefono

                    response.json({state: true, mensaje: "Bienvenido " + respuesta.usuarios[0].nombre })
                }
            }
        } else {
            response.json({state: false, mensaje: "Error en las credenciales de acceso"})
        } 
    })

};
usuariosController.misdatos = function(request, response) {

    let post = { 
        _id:request.session._id,
    }
    usuariosModel.listarid(post, function(respuesta) {
        response.json(respuesta);
    });
};
usuariosController.actualizardatos = function(request, response) {
    var post = { 
        _id:request.session._id,
        password:request.body.password,
        confirmpassword:request.body.confirmpassword
        
    }
    if (post.password == undefined || post.password == null || post.password == "") {
        return response.json({ state: false, mensaje: "el campo password es obligatorio", campo: "password" });
    }
    if(post.password.length < 7 ){
        response.json({state: false, mensaje: "el campo password debe tener minimo 7 caracteres", campo:"password"})
        return false
    }
    if(post.password.length > 15 ){
        response.json({state: false, mensaje: "el campo password debe tener maximo 10 caracteres", campo:"password"})
        return false
    }

    post.password = sha256(post.password + config.passwordsha256)
    usuariosModel.actualizardatos(post, function(respuesta) {
        if (respuesta.state == true) {
            response.json({ state: true, mensaje: "se actualizo el elemento correctamente" });
        } else {
            response.json({ state: false, mensaje: "se presento un error al actualizar el elemento", error: respuesta });
        }
    });
}
usuariosController.activar = function(request, response) {
    var post = { 
        email:request.body.email,
        codigoact:request.body.codigoact
    }
    if (post.email == undefined || post.email == null || post.email == ""){
        response.json({state: false, mensaje: "el campo email es obligatorio", campo:"email"}) 
        return false  
    }
    if (post.codigoact == undefined || post.codigoact == null || post.codigoact == ""){
        response.json({state: false, mensaje: "el campo codigo de activacion es obligatorio", campo:"codigoact"}) 
        return false  
    }


    usuariosModel.activar(post, function(respuesta) {
        if (respuesta.respuesta.modifiedCount == 0) {
            response.json({ state: false, mensaje: "Sus credenciales de activacion son invalidas" })
        } else {
            response.json({ state: true, mensaje: "Su cuenta ha sido activado correctamente"})
        }
    });
}

module.exports.usuariosController = usuariosController;





