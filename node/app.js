const express = require('express');
const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const jwt = require('jsonwebtoken');
const KeyGen = require('./KeyGen.js');
const keyGen = new KeyGen();
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');


var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'cetinv'
});


function validate(token, socket, cb) {
    keyGen.getPublicKey((val) => {
        jwt.verify(token, val, function(err, decode) {
            if (err) {
                switch (err.name) {
                    case 'TokenExpiredError':
                        {
                            cb('expiro', null, null);
                            break;
                        }
                    case 'JsonWebTokenError':
                        {
                            cb('raro', null, null);
                            break;
                        }
                    default:
                        cb('desconocido', null, null);
                        break;
                }
            } else {
                console.log(decode);
                cb("ok", decode.id, decode.name);
            }
        });
    });
}

function generateToken(idUser, emailUser, cb) {
    // se sustitura por codigo de busqueda en db

    console.log("entro aqui");
    keyGen.getPrivatKey((val) => {

        jwt.sign({ id: idUser, name: emailUser }, val, { algorithm: 'RS256' }, function(err, token) {

            if (err) {
                console.log("no se porque");
                cb("err");
            }

            cb({ token: token });

        });
    });
}

io.use((socket, next) => {

    let token = socket.handshake.query.token;
    validate(token, socket, (val, param1, param2) => {
        if (val == 'raro') {
            console.log("usaurio no valido");
            next((new Error('Not a valid user')));
        } else if (val == 'expiro') {

            let decoded = jwt.decode(token);
            generateToken(decoded.id, decoded.email, (val) => {
                next((new Error('Volviendose a conectar')));
            });
        } else if (val == 'ok') {

            socket.Sid = param1;
            socket.name = param2;

            connection.query('INSERT INTO users_socket(name,socketid) VALUES(' + "'" + socket.Sid + "'" + "," + "'" + socket.id + "'" + ')', function(error, results, fields) {
                if (error) {

                } else {
                    console.log('--------INSRTs-----');
                }

            });

            console.log(param2);
            console.log("bienvenido: " + socket.name);
            next();
        } else {
            console.log("te estas topando con pared puto");
        }

    });
});

io.on('connection', (socket) => {

    socket.on('user-connected', (data) => {

    });

    socket.on('send-message', (data) => {

        if (socket.Sid != data.idManager) {
            console.log("entra aqui: " + data.idManager);
            connection.query('SELECT * FROM users_socket WHERE name=' + "'" +
                data.idManager + "'", (error, results, fields) => {
                    if (error) console.log(error);
                    else {
                        console.log(results);
                        for (let i = 0; i < results.length; i++) {
                            console.log(results[i].socketid);
                            socket.broadcast.to(results[i].socketid).emit('message', data.message);
                        }
                    }
                });
        }
    });

    socket.on('disconnect', (data) => {
        connection.query('DELETE FROM users_socket WHERE socketid=' + "'" +
            socket.id + "'", (error, results, fields) => {
                if (error) console.log(error);
                else {
                    console.log(socket.id + " se ha elimidado");
                }
            });
    });

});

app.use(cors());
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.post('/registerUser', function(req, res) {

    console.log("entra a la api");
    keyGen.getPublicKeyRequest((val) => {
        console.log(req.body);

        jwt.verify(req.body.token, val, function(err, decode) {
            if (err) res.send('no es posible conectarte');
            else {
                console.log(decode.id);
                console.log(decode.name);
                generateToken(decode.id, decode.name, function(token) {
                    res.send(token);
                });
            }
        });
    });

});

server.listen(8080);