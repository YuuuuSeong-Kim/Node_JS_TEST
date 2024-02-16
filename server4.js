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
const { MongoClient } = require("mongodb");
const uri = "mongodb://localhost:27017";


app.get("/listBook", function (req, res) {
    const client = new MongoClient(uri);
    async function run() {
        try {
            const database = client.db('madang');
            const book = database.collection('book');
            data = await book.find({}).toArray();
            const nextNO = await book.find({}).project({ bookid:1,_id:0 }).sort({bookid:-1}).limit(1).toArray();
            var bookid = nextNO[0].bookid+1;
            var arr = {
                data,
                bookid
            }
            res.send(arr);
        } finally {
            await client.close();
        }
    }
    run();
})

app.post("/insert", function (req, res) {
    const client = new MongoClient(uri);
    async function run() {
        try {
            const database = client.db('madang');
            const book = database.collection('book');
            // var Query = {   bookid:Number(req.param("bookid")),
            //                 bookname:req.param("bookname"),
            //                 price:Number(req.param("price")),
            //                 publisher:req.param("publisher"),
            //                 };
            
            
            var Query = {   bookid:Number(req.body.bookid),
                            bookname:req.body.bookname,
                            price:Number(req.body.price),
                            publisher:req.body.publisher,
                            };
            await book.insertOne(Query);
        } finally {
            // Ensures that the client will close when you finish/error
            await client.close();
        }
    }
    run();
    res.redirect("/bookTest.html");
})

app.post("/update", function (req, res) {
    const client = new MongoClient(uri);
    async function run() {
        try {
            const database = client.db('madang');
            const book = database.collection('book');
            // var Query = {   bookid:Number(req.param("bookid")),
            //                 bookname:req.param("bookname"),
            //                 price:Number(req.param("price")),
            //                 publisher:req.param("publisher"),
            //                 };
            
            var Query = {   $set:{
                            bookname:req.body.bookname,
                            price:Number(req.body.price),
                            publisher:req.body.publisher}
                            };
            await book.updateOne({bookid:Number(req.body.bookid)},Query,{});
        } finally {
            // Ensures that the client will close when you finish/error
            await client.close();
        }
    }
    run();
    res.redirect("/bookTest.html");
})

http.createServer(app).listen(52273, "192.168.0.57", function () {
    console.log("가동")
})