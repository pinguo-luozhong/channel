/**
 * Created by luozhong on 16/1/24.
 */
module.exports = function (app) {
    function convertImgToBase64(url, callback, outputFormat) {
        var canvas = document.createElement('CANVAS'),
            ctx = canvas.getContext('2d'),
            img = new Image;
        img.crossOrigin = 'Anonymous';
        img.onload = function () {
            canvas.height = img.height;
            canvas.width = img.width;
            ctx.drawImage(img, 0, 0);
            var dataURL = canvas.toDataURL(outputFormat || 'image/png');
            callback.call(this, dataURL);
            canvas = null;
        };
        img.src = url;
    }

    convertImgToBase64('http://bit.ly/18g0VNp', function (base64Img) {
        // Base64DataURL
    });
};