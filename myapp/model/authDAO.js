const db = require('../config/dbConn');

const checkUserID = (parameters) => {
    return new Promise((resolve, rejecet) => {
        console.log(parameters);
        let queryData = `SELECT EXISTS(SELECT * FROM user WHERE name =? AND passwd=?) AS exist`;
        db.query(queryData, [parameters.name, parameters.passwd], (err, db_data) => {
            if(err){
                rejecet(err);
            } else {
                resolve(db_data);
            }
        })
    })
}

const insertUser = (parameters) => {
    return new Promise((resolve, reject) => {
        let queryData = `INSERT INTO user (name, passwd) VALUES (?, ?)`;
        db.query(queryData, [parameters.name, parameters.passwd], (err, db_data) => {
            if(err){
                reject(err);
            } else {
                resolve(db_data);
            }
        })
    })   
}



module.exports = {
    checkUserID,
    insertUser
}