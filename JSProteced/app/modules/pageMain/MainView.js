/**
 *  初始化导航视图
 *  @author fenghaiting@camera360.com
 *  @version 2015-5-26
 */

var MainAction = require('./MainAction.js');

var MainStore = MainAction.MainStore;

var MainAction = MainAction.MainAction;

var TopView = require('./TopView.js');

var ListView = require('./ListView.js');

var AlertDialogView = require('../../components/dialog/AlertDialogView.js');

var ChannelDialogView = require('../../components/dialog/ChannelDialogView.js');

var ConfirmDialogView = require('../../components/dialog/ConfirmDialogView.js');

var EditAlertDialogView = require('../../components/dialog/EditAlertDialogView.js');

var UpdateChannelDialogView = require('../../components/dialog/UpdateChannelDialogView.js');

var LoadView = require('../../components/load/LoadView.js');

var PageView = require('../../components/page/PageView.js');

var NavView = React.createClass({

    mixins:[Reflux.connect(MainStore, 'pageObject')],

    componentDidMount:function(){
        c360.api = "getChannelList";
        c360.MAX_PAGE_NUM = 10;
    },

    render:function(){
        return (<div className="index">
                <LoadView  />
                <AlertDialogView {...this.state}/>
                <ChannelDialogView {...this.state}/>
                <UpdateChannelDialogView {...this.state}/>
                <ConfirmDialogView {...this.state}/>
                <EditAlertDialogView {...this.state}/>
                <TopView {...this.state}/>
                <ListView {...this.state}/>
                <PageView />
            </div>);
    },

    handleChannelEvent:function(){

    }

})

module.exports = NavView;
