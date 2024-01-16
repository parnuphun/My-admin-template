
const db = require('../config/database');

module.exports.dbQuery = async (query, params) => {
    return new Promise((resolve, reject) => {
        if(params){
            db.query(query, params, (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        }else {
            db.query(query, (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        }
    });
}