var http = require("http");
var express = require("express");
var app = express();

app.use(express.static("public"));
app.use(express.bodyParser());
app.use(app.router);

// var data = [
// 	{"bookid":6,"bookname":"역도","price":6000,"publisher":"굿스포츠"},
// 	{"bookid":7,"bookname":"야구의 추억","price":20000,"publisher":"이상미디어"},
// 	{"bookid":8,"bookname":"야구를 부탁해","price":13000,"publisher":"이상미디어"},
// 	{"bookid":9,"bookname":"올림픽 이야기","price":7500,"publisher":"삼성당"}
// ]

var data;
var bookDAO = require("./bookDAO");

app.get("/listBook",async function (req, res) {
    let arr = await bookDAO.listBook();
    res.send(arr);
})

app.post("/insert",async function (req, res) {
    await bookDAO.insert(req);
    res.redirect("/bookTest.html");
})

app.post("/update",async function (req, res) {
    await bookDAO.update(req);
    res.redirect("/bookTest.html");
})

app.post("/delete",async function (req, res) {
    var bookid = req.body.bookid;
    await bookDAO.del(bookid);
    res.redirect("/bookTest.html");
})

http.createServer(app).listen(52273, "192.168.0.57", function () {
    console.log("가동")
})