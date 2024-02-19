const { MongoClient } = require("mongodb");
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function listBook() {
    let arr;
    const client = new MongoClient(uri);
    try {
        const database = client.db('madang');
        const book = database.collection('book');
        data = await book.find({}).toArray();
        const nextNO = await book.find({}).project({ bookid:1,_id:0 }).sort({bookid:-1}).limit(1).toArray();
        var bookid = nextNO[0].bookid+1;
        arr = {
            data,
            bookid
        }
    } finally {
        await client.close();
    }
    return await arr;
}

async function insert(req) {
    const client = new MongoClient(uri);
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

async function update(req) {
    const client = new MongoClient(uri);
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

async function del(bookid) {
    const client = new MongoClient(uri);
    try {
        const database = client.db('madang');
        const book = database.collection('book');
        await book.deleteOne({bookid:Number(bookid)});
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}

module.exports = {listBook,insert,update,del};