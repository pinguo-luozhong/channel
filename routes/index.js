 /**
 * Created by luozhong on 15/12/30.
 */
 module.exports = function ( app ) {
     require('./register')(app);
     require('./addChannel')(app);
     require('./getChannelList')(app);
     require('./delChannel')(app);
 };