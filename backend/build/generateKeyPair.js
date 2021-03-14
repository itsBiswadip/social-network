const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const keysDirectory = path.resolve(__dirname, '../config');

const generateKeyPair = () => {

    const keys = crypto.generateKeyPairSync('rsa',{
        modulusLength: 4096, // size of keys
        publicKeyEncoding: {
            type: 'pkcs1', // "Public Key Cryptography Standards 1" 
            format: 'pem'
        },
        privateKeyEncoding: {
            type: 'pkcs1', 
            format: 'pem'
        }
    });

    // write keys to the config directory
    fs.writeFileSync(`${keysDirectory}/rsa_public.pem`, keys.publicKey);
    fs.writeFileSync(`${keysDirectory}/rsa_private.pem`, keys.privateKey);

    console.log("Keys generated successfully");
}

generateKeyPair();