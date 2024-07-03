const fs = require('fs')
const { model } = require('mongoose')

function logReqRes(fileName){
    return (req, res, next)=>{
        fs.appendFile(fileName,`${Date.now()}: ${req.method}: ${req.path}\n`,(err,data)=>{
            next()
        })
    }
}

module.exports = {
    logReqRes,
}