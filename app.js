const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();

//CON POSTMAN

app.get("/api", (req, res)=>{
    //res.send("hola mundo");
    res.send({
      mensaje: "hola"
    });
    
});
// 1. el usuario accede a /api/login para poder logearse
// 2. jwt---> crea un token, para identificar al usuario y para enviareselo al cliente el navegador almacena dicho token
//3. /api/posts envia dicho token verifica si es valido o no

// el usuario accede a login, para logearse
app.post("/api/login", (req, res)=>{
   const user = {
    id: 1,
    nombre: "nat",
    email: "nan@gmail.com"
   }
//jwt, va a crear un token para el usuario, para identificarlo.
   jwt.sign({user}, "secretkey", {expiresIn:"32s"}, (err, token)=>{ //token se envía al ciente y lo almacena 
    res.send({
        token //  se podría escribir solo token
        //token
    });
   }) 
});

//dejamos que el ususrio acceda a esta ruta simpre que tenga el token correcto:

app.post("/api/posts", verifyToken, (req, res)=>{

    jwt.verify(req.token, "secretkey", (error, authData) =>{  //verificar el token almacenado en la función verifyToken. authData = informacion const user
        if(error){
            res.sendStatus(403);
        }else{
            res.json({
                mensaje: "Post fue creado",
                authData: authData
            })
        }
    })
 });

 //authorization: Bearer <token> ---->verificar si dicho token es valido.- bearer[0] <token>[1]
 function verifyToken(req, res, next){
        const bearerHeader = req.headers["authorization"];
        if(typeof bearerHeader !== "undefined"){ // tenemos acceso a la cadena bearer[0] <token>[1]
            const token = bearerHeader.split(" ")[1];
            req.token = token;
            next();
        }else{
            res.sendStatus(403)// ruta o acceso prohibido.
 }
 }


const PUERTO = 3000;
app.listen(PUERTO, () => {
console.log(`Servidor escuchando en el puerto ${PUERTO}...-`)
})