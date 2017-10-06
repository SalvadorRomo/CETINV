const express = require('express');
const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const jwt = require('jsonwebtoken');
const Redis = require('ioredis');
const redis = new Redis();
const KeyGen = require('./KeyGen.js');
const keyGen = new  KeyGen();

function validate(token,socket, cb){
    keyGen.getPublicKey((val)=>{
        jwt.verify(token ,val ,function(err,decode){
        if(err){
            switch(err.name){
                case 'TokenExpiredError' : 
                    cb('expiro');
                case 'JsonWebTokenError' : 
                    cb('raro');
                default :
                    cb('desconocido');
             }   
        }else{
            socket.Sid = decoded.payload.email;
            socket.email = decoded.payload.email;
            cb("ok");
        }     
         });
    });
}

function generateToken(idUser , emailUser, cb){
     // se sustitura por codigo de busqueda en db

    console.log("entro aqui");
    keyGen.getPrivatKey((val)=>{ 
        
    jwt.sign({id: idUser, email : emailUser}, val, { algorithm: 'RS256' },function(err,token){
      
        if(err){
            console.log("no se porque");
            cb("err");
        }
       
            cb({token: token });

         });
    });
}

    io.use((socket,next)=>{
        let token = socket.handshake.query.token;
        validate(token,socket,(val)=>{
            if(val == 'raro'){
                console.log("usaurio no valido");
                next((new Error('Not a valid user')));
            }
            else if(val == 'expiro'){
                let decoded = jwt.decode(token);
                generateToken(decoded.id,decoded.email,(val)=>{
                        redis.set(decoded.id,decoded.email,val);
                        next((new Error('Volviendose a conectar')));
                 });
            }
            else if(val == 'ok'){
                next();
            }

        });
    });

    io.on('connection',(socket)=>{
        socket.on('user-connected',(data)=>{
                console.log('welcome: ' + socket.email);
        });
    });


    app.post('/registerUser', function(req, res){  
           
    generateToken(req.param('data.id'),req.param('data.email'),function(token){ 
         console.log("holi");   
         res.send(token);
        });

    });
    

server.listen(8080);