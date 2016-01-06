var MainAction = require('./MainAction.js');

var PageAction = require('../components/page/PageAction.js');

var PageStore = PageAction.PageStore;

var PageAction = PageAction.PageAction;

var MainAction = MainAction.MainAction;

var ListView = React.createClass({

    getInitialState:function(){
        return {

        };
    },

    componentDidMount:function(){
        PageAction.setCurrentPageIndex(0);
        MainAction.getTemplateList(0,this.initTemplateList);
    },

    initTemplateList:function(length){
        PageAction.setPageTotal(length,function(index){
            MainAction.getTemplateList(index);
        }.bind(this));
    },

    render:function(){

        var tableHead = ['序号','标题','图标','版本号','截图','状态','','',""];

        var tableHeadArr = (function() {

            var tempArr = [];

            for (var key in tableHead) {
                var width = "auto";
                if(tableHead[key] == '截图'){
                    width = 300;
                }else if(tableHead[key] == '状态'){
                    width = 450;
                }else if(tableHead[key] == '标题'){
                    width = 100;
                }
                tempArr.push(<th key={"stickerTableHead"+key} style={{width:width}}>
                                <div>{tableHead[key]}</div>
                            </th>);
            }

            return tempArr;

        }.bind(this))();

        var tableArray = this.props.pageObject.list;

        if(tableArray.length == 0){
            PageAction.setPageTotal(0);
        }

        var tableContent = [];
        for(var i = 0 ,length = tableArray.length;i < length;i ++){
            var array = [i+1,tableArray[i].title,<img style={{width:"50px"}} src={tableArray[i].icon}/>,tableArray[i].version];
            var imageArray = [];
            for(var j = 0 , len = tableArray[i].imageList.length;j < len;j ++){
                imageArray.push(<img style={{width:"50px"}} src={tableArray[i].imageList[j]}/>);
            }
            array.push(imageArray);
            array.push(<div>
                    <span className="flag-top">
                        <span className="flag-style version"><span className="glyphicon glyphicon-info-sign"></span>版本太低</span>
                        <span className="flag-style desc"><span className="glyphicon glyphicon-info-sign"></span>描述过期</span>
                        <span className="flag-style time"><span className="glyphicon glyphicon-info-sign"></span>数据抓取时间:2015/12/26</span>
                    </span>
                    <span className="flag-bottom">
                        <span className="flag-style icon"><span className="glyphicon glyphicon-info-sign"></span>图标过期</span>
                        <span className="flag-style screenshot"><span className="glyphicon glyphicon-info-sign"></span>截图过期</span>
                        <span className="flag-style channel"><span className="glyphicon glyphicon-info-sign"></span>渠道更新时间过期</span>
                    </span>
                </div>);
            var listArray = [{
                    icon:tableArray[i].icon,
                    flag:tableArray[i].versionFlag
                },{
                    icon:tableArray[i].icon,
                    flag:tableArray[i].iconFlag
                },{
                    icon:tableArray[i].icon,
                    flag:tableArray[i].descFlag
                },{
                    icon:tableArray[i].icon,
                    flag:tableArray[i].screenshotFlag
                },{
                    icon:tableArray[i].icon,
                    flag:'数据抓取时间:'+tableArray[i].time
                },{
                    icon:tableArray[i].icon,
                    flag:tableArray[i].channelFlag
                }];
            array.push(<a onClick={this.handleEditAlertEvent.bind(null,tableArray[i]._id,tableArray[i].title,listArray)} style={{cursor:"pointer"}}>编辑告警状态</a>);
            array.push(<a onClick={this.handleShowMatchEvent.bind(null,tableArray[i]._id)} style={{cursor:"pointer"}}>查看匹配规则</a>);
            array.push(<a onClick={this.handleDeleteEvent.bind(null,tableArray[i]._id)} style={{cursor:"pointer"}}>删除</a>);
            tableContent.push(array);
        }

        var tableArrayArr = (function() {

            var tempArr = [];

            for (var i = 0,length = tableContent.length;i < length; i++) {

                var arr = [];

                for(var key in tableContent[i]){
                    arr.push(<td><div>{tableContent[i][key]}</div></td>);
                }

                tempArr.push(<tr className={i%2 == 0?"even":""}>
                                {arr}
                            </tr>);
            }

            return tempArr;

        }.bind(this))();

        return (
                <div className="boxmax" style={{margin: "0px 20px"}}>
                    <div className="title">
                        <strong className="l">明细数据</strong>
                        <span className="r">
                        </span>
                    </div>
                    <div className="dynamic">
                        <div className="dynamicTable">
                            <table className="table_style1 data-table">
                                <thead>
                                    <tr>
                                        {tableHeadArr}
                                    </tr>
                                </thead>
                                <tbody>
                                    {tableArrayArr}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            );
    },

    handleEditAlertEvent:function(id,title,array,event){
        MainAction.showEditAlert(id,title,array);
    },

    handleShowMatchEvent:function(id,title,array){
        MainAction.showAlert(id,title,array);
    },

    handleDeleteEvent:function(id){
        MainAction.showConfirm('温馨提示','是否删除',true,this.handleDelEvent.bind(this,id));
    },

    handleDelEvent:function(id){
        var data = {
            _id:id
        };

        c360.server.jsonpInterface('delChannel',data,function(res){
            if(res.status == 200){
                MainAction.showAlert('Success','删除渠道成功!',true,function(){
                    MainAction.getTemplateList(PageStore.pageObject.currentPageIndex,this.initTemplateList);
                }.bind(this));
            }else{
                MainAction.showAlert('Error',res.message,true);
            }
        }.bind(this),'GET');
    }
});

module.exports = ListView;