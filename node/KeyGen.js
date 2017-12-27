const fs = require('fs');

module.exports = class KeyGen {

    constructor() {

    }

    getPrivatKey(cb) {
        fs.readFile('./keys/jwtRS256.key', 'utf8', function(err, data) {
            if (err) throw err;
            cb(data);
        });
    }

    getPublicKey(cb) {
        fs.readFile('./keys/jwtRS256.key.pub', 'utf8', function(err, data) {
            if (err) throw err;
            cb(data);
        });
    }

    getPublicKeyRequest(cb) {
        fs.readFile('../keysreq/request.key.pub', 'utf8', function(err, data) {
            if (err) throw err;
            cb(data);

        });
    }

};