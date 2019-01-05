const router = require('express').Router();

module.exports = (db) => {
  const noticeDb = require('../../db/notice')(db);
  router.post('/upload' , async(req,res)=> {
     try{
         const insertedNotice = await noticeDb.upload(req.body);
         if(insertedNotice != null){
             res.json({message:'notice added'});
         }
     }catch(e){
         console.log(e.message);
     }
  });
  return router;
};