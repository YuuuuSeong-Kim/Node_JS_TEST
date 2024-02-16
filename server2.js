var http = require("http");
var express = require("express");
var app = express();

app.use(express.static("public"));
app.use(app.router);

app.all("/list.do",function(req,res){
    res.send("<h1>글목록</h1>")
});

app.all("/write.do",function(req,res){
    res.send("<h1>글작성</h1>")
});

app.all("/update.do",function(req,res){
    res.send("<h1>글수정</h1>")
});

http.createServer(app).listen(52273,function(){
    console.log("서버가 가동되었습니다. http://127.0.0.1:52237");
});