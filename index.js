const express = require('express');
const multer = require('multer');
var fs = require("fs");
const upload = multer({ dest: 'upload/' });
const app = express();
const port = 9000

app.post('/profile', upload.single('fileHandler'), function (req, res, next) {
    console.log(req.file)
    let savePath = __dirname + "/upload/" + req.file.originalname;
    let fileData = fs.readFileSync(req.file.path);
    fs.writeFile(savePath, fileData, (err, data) => {
        if (err) res.send(err);
        let response = {
            message: 'File uploaded successfully',
            filename: req.file.originalname
        };
        res.end(JSON.stringify(response));
    });
})
app.use(express.static('public'))
app.get(`/`, (req, res) => {
    res.send(`This is file server!`)
});

app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", 'express')
    //res.header("Content-Type", "application/json;charset=utf-8");
    next();
});


app.listen(port, () => {
    console.log(`file server is listening on port ${port}`)
})