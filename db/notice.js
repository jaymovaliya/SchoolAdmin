module.exports = (db) => ({
   upload: (reqObj) => {
       return db.collection('notices').insertOne(reqObj);
   }
});
