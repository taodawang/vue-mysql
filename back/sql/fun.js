let mysql = require('mysql');
let db = require('../config/db');
let pool = mysql.createPool(db);


module.exports  = {

    connPool (sql, val, callback) {
        //当有些操作需要保证是同一 connection 的时候，就独立使用 pool.getConnection
        pool.getConnection((err, conn) => {
            let q = conn.query(sql, val, (err,results,fields) => {

                if (err) {
                    console.log(err);
                }

                callback(err,results,fields);

                conn.release();//在完成后释放连接
            });
        });
    },


    connPoolQuery (sql, val, callback) {
        //直接用 pool.query 每次都随机分配 connection,并自动获取回收
        pool.query(sql, val, (err,results,fields) => {

            if (err) {
                console.log(err);
            }

            callback(err,results,fields);

        })
    }
}