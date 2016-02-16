 /**
 * Created by luozhong on 15/12/30.
 */
 module.exports = function ( app ) {
     require('./register')(app);
     require('./login')(app);
     require('./logout')(app);
     require('./getUserInfo')(app);
     require('./home')(app);
     require('./addChannel')(app);
     require('./getChannelList')(app);
     require('./delChannel')(app);
     require('./updateStatus')(app);
     require('./updateBaseChannel')(app);
     require('./getChannelBaseData')(app);
     require('./uploadFiles')(app);
 };