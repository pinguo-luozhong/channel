/**
 * Created by luozhong on 16/1/17.
 */
module.exports = function (app) {
    var fs = require('fs');
    var path = require('path');
    var multipart = require('connect-multiparty');

    app.post('/uploadFiles', multipart(), function (req, res) {
        //get filename
        var filename = req.files.files.originalFilename || path.basename(req.files.files.path);
        //copy file to a public directory
        var thisPath = path.dirname(__filename);
        var p = thisPath.substr(0,thisPath.lastIndexOf("/")+1);
        var targetPath = p + '/public/uploadFile/' + filename;
        console.log(targetPath);
        //copy file
        fs.createReadStream(req.files.files.path).pipe(fs.createWriteStream(targetPath));
        //return file url
        res.json(
            {
                status: 200,
                message: "ok",
                data: 'http://' + req.headers.host + '/uploadFile/' + filename
            }
        );
    });
};