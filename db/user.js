const crypto = require('crypto');
const hashPassword = require('../utils/hashPassword');

module.exports = (db) => ({
    create: (id, password) => {
        const salt = crypto.randomBytes(512).toString('hex');
        const iterations = Math.floor((Math.random() * 500) + 500);
        const hashedPassword = hashPassword(password, salt, iterations);
        return db.collection('admin').insertOne({
            userid: id,
            password: {
                hash: hashedPassword,
                salt,
                iterations
            }
        });
    },
    get: (id) => {
        return db.collection('admin').findOne({
            userid: id
        });
    },
    getTeacher: (id) => {
        return db.collection('teachers').findOne({
            userid: id
        });
    },
    createTeacher: (id,password) => {
        const salt = crypto.randomBytes(512).toString('hex');
        const iterations = Math.floor((Math.random() * 500) + 500);
        const hashedPassword = hashPassword(password, salt, iterations);
        return db.collection('teachers').insertOne({
            userid: id,
            password: {
                hash: hashedPassword,
                salt,
                iterations
            }
        });
    }
});