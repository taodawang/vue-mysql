let express = require('express');
let router = express.Router();

router.post('/login',(req,res) => {
    let name = req.body.user_name;
    let pass = req.body.password;
    let data = {};
    data.name = name;
    data.pass = pass;
    res.json({code: 200,data : data,msg: 'done'});
})


module.exports = router;