var items = [
    {name:"우유",price:2000},
    {name:"홍차",price:2000},
    {name:"커피",price:2000}
]

var http = require("http");
var express = require("express");

var app = express();
app.use(express.static("public"));
app.use(express.bodyParser()); //post 방식의 데이터 처리를 위하여 필요함
app.use(app.router);

app.post("/products",function(req,res){
    try{
        var name = req.param("name");
        var price = req.param("price");
        console.log("name : "+name);
        console.log("price : "+price);
        res.send("OK");
        var item = {
            name:name,
            price:price
        }
        items.push(item);
    }catch(e){
        console.log(e);
    }
})

app.get("/products",function(req,res){
    res.send(items);
})

app.get("/products/:id",function(req,res){
    var id = Number(req.param("id"));
    if(isNaN(id)){
        res.send({error:"숫자를 입력해주세요"});
    }else if(items[id]){
        res.send(items[id]);
    }else{
        res.send({error:"존재하지 않는 데이터입니다."});
    }
})

app.all("/wiki/:id",function(req,res){
    var id = req.param("id");
    res.send("<h1>"+id+"</h1>")
})

//html응답
app.all("/data1",function(req,res){
    var output = "";
    output += "<!DOCTYPE html>";
    output += "<html>";
    output += "<body>";
    items.forEach(function(item){
        output += "<div>";
        output += "<h1>"+item.name+"</h1>";
        output += "<h1>"+item.price+"</h1>";
        output += "</div>";
    })
    output += "</body>";
    output += "</html>";

    res.send(output);
});

//json 응답
app.all("/data2",function(req,res){
    res.send(items);
});

//xml 응답
app.all("/data3",function(req,res){
    var output = "";
    res.type("text/xml");
    output += "<?xml version='1.0' encoding='UTF-8'?>";
    output += "<products>";
    items.forEach(function(item){
        output += "<product>";
        output += "<name>"+item.name+"</name>";
        output += "<price>"+item.price+"</price>";
        output += "</product>";
    })
    output += "</products>";
    res.send(output);
});

http.createServer(app).listen(52273,function(){
    console.log("서버가동됨");
})