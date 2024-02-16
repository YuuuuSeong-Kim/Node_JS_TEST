var http = require("http");
var express = require("express");
var app = express();

//public 폴더를 정적 컨텐츠 두는 곳으로 설정
//public 폴더의 내용은 서버 재가동 없이 바로 적용이 된다.(static으로 설정해두어서)
app.use(express.static("public"));

app.use(function(req,res){
	res.send("<h2>안녕하세요!</h2>")
})

http.createServer(app).listen(52273, function(){
	console.log("서버가동됨 http://127.0.0.1:52273");
})