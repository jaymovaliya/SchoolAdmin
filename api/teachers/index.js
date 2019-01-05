const router = require('express').Router();
const asyncseries = require('async');
const moment = require('moment');

module.exports = (db) => {
    const teacherDb = require('../../db/teachertask')(db);
    router.post('/homework', async(req,res) => {
        try{
            const classid = req.body.cid;
            let homeworkObj = {
                date:moment().format('D MMM, YYYY'),
                subject:req.body.subject,
                content:req.body.content
            };
            let classObj = await teacherDb.getClass(classid);
            classObj.homework.push(homeworkObj);
            let updateHomework = await teacherDb.updateClass(classObj);
            if(updateHomework != null){
                res.json("updated homework");
            }
        } catch(e){
            console.log(e);
        }

    });

    router.post('/attendance', async(req,res) => {
       try{
           const pids = req.body.pids;
           let d = new Date();
           let month = d.getMonth();
           let date = d.getDate();
           for(let i=0; i<pids.length; ++i){
               console.log(pids[i]);
               let pObj = await teacherDb.getParent(pids[i]);
               let att = JSON.parse(pObj.attendance[month].attands);
               att[date-1] = 5;
               pObj.attendance[month].attands = JSON.stringify(att);
               let updatedpObj = await teacherDb.updateParent(pObj);
               if(updatedpObj != null){
                   res.json("attendance added");
               }
           }

       } catch(e){
           console.log(e);
       }
    });
    return router;
};