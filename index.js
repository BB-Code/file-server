const express = require('express')
const app = express();
const port = 9000

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    //res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
app.use(express.static('public'))
app.get(`/`,(req,res)=>{
    res.send(`This is file server!`)
});

app.listen(port,()=>{
    console.log(`file server is listening on port ${port}`)
})