/**
 * Created by luozhong on 16/1/3.
 * desc：数据库操作
 */

var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://10.1.3.142:27017/channel';
var ObjectID = require('mongodb').ObjectID;

var table = "channel";
var channelStatus = "channelStatus";
var baseChannel = "baseChannel";

//更改状态表
var updateStatusTable = function (p, callback) {
    //连接到表
    MongoClient.connect(DB_CONN_STR, function (err, db) {
        var collection = db.collection(table);
        //插入数据
        var data = {
            versionFlag: p.versionStatus,
            descFlag: p.descStatus,
            iconFlag: p.iconStatus,
            screenshotFlag: p.screenshotStatus
        };
        var whereStr = {_id: new ObjectID(p._id)};
        collection.update(whereStr, {"$set": data}, function (err, result) {
            if (err) {
                console.log('Error:' + err);
                return;
            }
            console.log("更新成功");
            //console.log("=-----------------------------"+result)
            db.close();
            callback(result);
        });
    });
};

//插入数据
var insertData = function (p, callback) {
    //连接到表
    MongoClient.connect(DB_CONN_STR, function (err, db) {
        var collection = db.collection(table);
        //插入数据
        var data = {
            channelName: p.channelName,
            channelUrl: p.channelUrl,
            imageList: p.imageList,
            icon: p.icon,
            version: p.version,
            desc: p.desc,
            title: p.title,
            domObj: p.domObj,
            versionFlag: 1,
            descFlag: 1,
            iconFlag: 1,
            screenshotFlag: 1,
            time: p.time
        };
        collection.findOne({channelName: p.channelName}, function (error, doc) {
            if (error) {
                res.send(500);
                req.session.error = '网络异常错误！';
            } else if (doc) {
                console.log("存在");
                callback({
                    status: 201,
                    message: "已存在"
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
var getChannelList = function (data, callback) {
    MongoClient.connect(DB_CONN_STR, function (err, db) {
        var collection = db.collection(table);
        console.log(collection);
        if (!collection) {
            console.log("链接失败");
            return;
        }
        var skip = parseInt(data.skip);
        var limit = parseInt(data.limit);
        collection.find({}).skip(skip).limit(limit).toArray(function (error, doc) {
            if (error) {
                res.send(500);
                req.session.error = '网络异常错误！';
            } else {
                var total = collection.count(function (e, a) {
                    callback({
                        status: 200,
                        message: "ok",
                        total: a,
                        data: doc
                    });
                });
            }
        })
    });
};
//删除
var delChannel = function (data, callback) {
    MongoClient.connect(DB_CONN_STR, function (err, db) {
        var collection = db.collection(table);
        //collection.remove({_id:obj_id}).toArray(function (error, doc) {
        collection.findAndRemove({_id: new ObjectID(data._id)}, function (error, doc) {
            if (error) {
                res.send(500);
                req.session.error = '网络异常错误！';
            } else {
                callback({
                    status: 200,
                    message: "ok",
                    data: doc
                });
            }
        })
    });
};
//获取基础数据
var getChannelBaseData = function (p, callback) {
    MongoClient.connect(DB_CONN_STR, function (err, db) {
        var collection = db.collection(baseChannel);
        console.log('aa');
        collection.find({}).toArray(function (error, doc) {
            if (error) {
                res.send(500);
                req.session.error = '网络异常错误！';
            } else {
                var total = collection.count(function (e, a) {
                    callback({
                        status: 200,
                        message: "ok",
                        total: a,
                        data: doc
                    });
                });
            }
        });
    });
};

//更新基础数据
var updateBaseChannel = function (p, callback) {
    MongoClient.connect(DB_CONN_STR, function (err, db) {
        var collection = db.collection(baseChannel);
        //collection.remove({_id:obj_id}).toArray(function (error, doc) {
        if (p._id) {// 修改
            var whereStr = {_id: new ObjectID(p._id)};
            var data={
                imageList:p.imageList,
                icon:p.icon,
                version:p.version,
                desc:p.desc,
                time:p.time
            };
            collection.update(whereStr, {"$set": data}, function (err, result) {
                if (err) {
                    console.log('Error:' + err);
                    return;
                }
                console.log("更新成功");
                //console.log("=-----------------------------"+result)
                db.close();
                callback(result);
            });
        } else {//新增
            console.log(p);
            collection.insert(p, function (err, result) {
                if (err) {
                    console.log('Error:' + err);
                    return;
                }
                console.log("新增成功");
                //console.log("=-----------------------------"+result)
                db.close();
                callback(result);
            });
        }
    });
};

module.exports = {
    getChannelList: getChannelList,
    delChannel: delChannel,
    updateChannelStatus: updateStatusTable,
    updateBaseChannel: updateBaseChannel,
    getChannelBaseData: getChannelBaseData,
    insertData: insertData
};

