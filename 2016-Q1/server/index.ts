/// <reference path='../typings/tsd.d.ts' />
import express = require("express");

var app = express();

app.get("/",(req,res)=>{
	res.send("Hello,dacy....I'm TS test...");	
})

var port: number = + process.env.PORT || 3000

var server = app.listen(port,function(){
	console.log("Express server listenning on port "+port);
})
