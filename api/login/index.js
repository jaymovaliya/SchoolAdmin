const router = require('express').Router();
const jwt = require('jsonwebtoken');
const hashPassword = require('../../utils/hashPassword');

module.exports = (db) => {
  const userDb  = require('../../db/user')(db);

  router.post('/admin' , async(req,res) => {
     try{
         const id = req.body.id;
         const password = req.body.password;

         const result = await userDb.get(id);

         if (result.password.hash === hashPassword(password, result.password.salt, result.password.iterations)) {
             const payload = {
                 user: {
                     id
                 }
             };
             const token = jwt.sign(payload, 'TOPSECRET', {expiresIn: '12h'});
             res.json({token:token});
         }
     }catch(e){
         console.log(e.message);
     }
  });

    router.post('/teacher' , async(req,res) => {
        try{
            const id = req.body.id;
            const password = req.body.password;

            const result = await userDb.getTeacher(id);

            if (result.password.hash === hashPassword(password, result.password.salt, result.password.iterations)) {
                const payload = {
                    user: {
                        id
                    }
                };
                const token = jwt.sign(payload, 'TOPSECRET', {expiresIn: '12h'});
                res.json({token:token});
            }
        }catch(e){
            console.log(e);
        }
    });
  return router;
};