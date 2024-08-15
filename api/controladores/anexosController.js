var anexosController = {}
anexosController.Imagen = function(request, response){
    var post = {
        nombre : request.body.nombre
    }
    if (!post._id) {
        return response.json({ state: false, mensaje: "el campo id de la categoria es obligatorio", campo: "_id" });
    }

    try{
        
        var upload = multer({
            storage: multer.diskStorage({
                destination: (req, file, callback)=> {
                    callback(null, raiz + "/uploads/")
                },
                filename: (req, file, callback)=> {
                    callback(null, post._id + ".png")
                }
            }),
            fileFilter: function(req, file, callback){
                var ext = path.extname(file.originalname)
                var misextenciones = ['.png','.jpeg', '.gif', '.jpg', '.tif']
                if(misextenciones.indexOf(ext)== -1){
                    return callback({state: false, mensaje: "Solo soportamos las siguientes extenciones" + misextenciones.join(" | ")}, null)
                }
                callback(null, true)

            }
        }).single('image')

        upload(request, response, function(err){
            if(err){
                response.json({state:false, error: err})
            }else{
            response.json({state:true, mensaje:"Archivo subido correctamente"})
            }
        })
    }catch(error){
        response.json({state:false, error:error})
    }
}
module.exports.anexosController = anexosController;