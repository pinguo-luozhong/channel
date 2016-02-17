/**
 * Created by luozhong on 15/12/30.
 */
module.exports = {
    user: {
        name: { type: String, required: true },
        password: { type: String, required: true }
    },
    channelList:{
        channelName:{type:String,required:true},
        channelUrl:{type:String,require:true}
    }
};