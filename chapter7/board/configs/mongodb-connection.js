const { MongoClient} = require("mongodb");

const uri = "mongodb+srv://jdlee:1004dangg!@cluster0.vcd9cxy.mongodb.net/board";

module.exports = function (callback) {
    return MongoClient.connect(uri, callback);
}