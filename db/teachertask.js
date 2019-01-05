module.exports = (db) => ({
    getClass: (classid) => {
        return db.collection('classes').findOne({
            classid:classid
        });
    },
    updateClass: (reqObj) => {
        return db.collection('classes').findOneAndReplace(
            {classid:reqObj.classid},reqObj);
    },
    getParent: (pid) => {
        return db.collection('parents').findOne({
            pid:pid
        });
    },
    updateParent: (reqObj) => {
        return db.collection('parents').findOneAndReplace(
            {pid:reqObj.pid},reqObj);
    }
});