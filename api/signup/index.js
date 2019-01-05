const router = require('express').Router();
const httpRequest = require('request-promise-native');

module.exports = (db) => {
    const userDb = require('../../db/user')(db);

    //POST Request for admin
    router.post('/admin' , async(req,res) => {
        try {
            const userid = req.body.id;
            const password = req.body.password;
            const insert = await userDb.create(userid, password);

            if(insert != null) {
                res.send("inserted successfully");
            }
        }catch(e){
            console.log(e.message);
        }

    });

    router.post('/teacher' , async(req,res) => {
        try {
            const userid = req.body.id;
            const password = req.body.password;
            const insert = await userDb.createTeacher(userid, password);

            if(insert != null) {
                res.send("inserted successfully");
            }
        }catch(e){
            console.log(e.message);
        }

    });
    return router;
};