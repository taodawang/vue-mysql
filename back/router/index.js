let express = require('express');
let router = express.Router();
let fun = require('../sql/fun');
let utility = require('utility');


router.post('/api/register',(req,res) => {
    let name = req.body.user_name;
    let pass = req.body.password;
    var md5Value = utility.md5(pass);

    fun.connPoolQuery('SELECT * from user where user_name = ?',[name],(err,result,fields) => {
        if(!err){
           if(result.length > 0){
                res.json({code:202,msg:'当前用户已存在！'});
           }else{
                fun.connPoolQuery('INSERT INTO user(user_name, password) VALUES(?, ?)',[name,md5Value],(err,result,fields) => {
                    if(!err){
                        res.json({code: 200, msg: 'done'});
                    }else{
                        res.json({code:201,msg:'err!'});
                    }
                })
           }
        }else{
            res.json({code:201,msg:'err!'});
        }
    })
})

router.post('/api/login',(req,res) => {
    let name = req.body.user_name;
    let pass = req.body.password;
    var md5Value = utility.md5(pass);

    fun.connPoolQuery('SELECT * from user where user_name = ?',[name],(err,result,fields) => {
        if(!err){
           if(result.length == 0){
                res.json({code:202,msg:'当前用户不存在！'});
           }else{
                let password = result[0].password;
                if(password === md5Value){
                    res.json({code:200,data:result[0],msg:'登陆成功'});
                }else{
                    res.json({code:203,msg:'帐号或者密码错误！'});
                }

           }
        }else{
            res.json({code:201,msg:'err!'});
        }
    })
})

module.exports = router;