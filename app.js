
const express = require('express')
// const port = process.env.PORT || 3000
const fs = require('fs')
const path = require('path')
const app = express()
const bodyParser = require("body-parser")
const cors = require('cors')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.options('*', cors())

let  writeToJsonFile = (fileName, fileData, callback) => {
    fs.writeFile(path.join(__dirname, fileName), fileData , (err, data) => {
        callback(err, data)
    })
}
app.get('/getEn', cors(), ( req,res) => {
    fs.readFile(path.join(__dirname, 'en.json'), 'utf8',function (err,data) {
        if( err ) throw err
        res.send(data)
     })
})
app.get('/getZh', cors(), ( req,res) => {
    fs.readFile(path.join(__dirname, 'zh.json'), 'utf8',function (err,data) {
        if( err ) throw err
        res.send(data)
     })
})

app.post('/postZh', cors(), (req,res) => {
    // console.log(req.body)
    let postData = JSON.stringify(req.body)
    writeToJsonFile('zh.json', postData, (err, data) => {
        if( err ) res.json({code:0,message:'保存失败'})
        res.json({code:0,message:'保存成功'})
    })
})
app.post('/postEn', cors(), (req,res) => {
    // console.log(req.body)
    let postData = JSON.stringify(req.body)
    writeToJsonFile('en.json' ,postData,  (err, data) => {
        if( err ) res.json({code:0,message:'保存失败'})
        res.json({code:0,message:'保存成功'})
    })
})

app.listen(1234, () => {
    console.log('http://127.0.0.1:1234')
})