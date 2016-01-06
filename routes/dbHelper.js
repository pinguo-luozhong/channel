/**
 * Created by luozhong on 16/1/3.
 */

var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://localhost:27017/channel';
var ObjectID = require('mongodb').ObjectID

var table = "channel";
//插入数据
var insertData = function (p, callback) {
    //连接到表
    MongoClient.connect(DB_CONN_STR, function (err, db) {
        var collection = db.collection(table);
        //插入数据
        var data = {
            channelName: p.channelName,
            channelUrl: p.channelUrl,
            imageList:p.imageList,
            icon:p.icon,
            version:p.version,
            desc:p.desc,
            title:p.title,
            domObj:p.domObj,
            time:p.time
        };
        console.log(data);
        collection.findOne({channelName: p.channelName}, function (error, doc) {
            if (error) {
                res.send(500);
                req.session.error = '网络异常错误！';
            } else if (doc) {
                console.log("存在");
                callback({
                    status:201,
                    message:"已存在"
                });
            } else {
                collection.insert(data, function (err, result) {
                    if (err) {
                        console.log('Error:' + err);
                        return;
                    }
                    //console.log("=-----------------------------"+result)
                    db.close();
                    callback(result);
                });
            }
        })
    });
};

//查询
var getChannelList = function (data,callback) {
    MongoClient.connect(DB_CONN_STR, function (err, db) {
        var collection = db.collection(table);
        var skip = parseInt(data.skip);
        var limit = parseInt(data.limit);
        collection.find({}).skip(skip).limit(limit).toArray(function (error, doc) {
            if (error) {
                res.send(500);
                req.session.error = '网络异常错误！';
            } else {
                var total = collection.count(function(e,a){
                    callback({
                        status:200,
                        message:"ok",
                        total:a,
                        data:doc
                    });
                });
            }
        })
    });
};
//删除
var delChannel = function (data,callback) {
    MongoClient.connect(DB_CONN_STR, function (err, db) {
        var collection = db.collection(table);
        //collection.remove({_id:obj_id}).toArray(function (error, doc) {
        collection.findAndRemove({_id: new ObjectID(data._id)},function(error,doc){
            if (error) {
                res.send(500);
                req.session.error = '网络异常错误！';
            } else {
                callback({
                    status:200,
                    message:"ok",
                    data:doc
                });
            }
        })
    });
};

module.exports = {
    getChannelList: getChannelList,
    delChannel: delChannel,
    insertData: insertData
};

