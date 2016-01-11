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

        var tableHead = ['信息','截图','状态'];

        var tableHeadArr = (function() {
            var tempArr = [];

            for (var key in tableHead) {
                var width = "auto";
                if(tableHead[key] == '截图'){
                    width = 350;
                }else if(tableHead[key] == '状态'){
                    width = 500;
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
            var array = [];

            array.push(<div style={{textAlign:"left"}}>
                    <a style={{cursor:"pointer"}} href={tableArray[i].channelUrl} target="_blank">{tableArray[i].title}</a>
                    <span style={{display:"inline-block",width:'100%',lineHeight:"30px"}}>
                        <img style={{width:"30px"}} src={tableArray[i].icon}/>
                        <span style={{fontSize:"18px",marginLeft:"50px"}} className={tableArray[i].versionFlag == 1?"green":"red"}>{tableArray[i].version}</span>
                    </span>
                </div>);

            var imageArray = [];
            for(var j = 0 , len = 6;j < len;j ++){
                if(tableArray[i].imageList[j] == undefined){
                    imageArray.push(<img style={{width:"50px"}} src='../resource/images/icon-default.jpg'/>);
                }else{
                    imageArray.push(<img style={{width:"50px"}} src={tableArray[i].imageList[j]}/>);
                }
            }
            array.push(imageArray);
            var versionVal = "版本太低";
            if(tableArray[i].versionFlag == 1){
                versionVal = "版本正常";
            }
            var descVal = "描述过期";
            if(tableArray[i].descFlag == 1){
                var descVal = "描述正常";
            }
            var iconVal = "图标过期";
            if(tableArray[i].iconFlag == 1){
                iconVal = "图标正常";
            }
            var screenshotVal = "截图过期";
            if(tableArray[i].screenshotFlag == 1){
                screenshotVal = "截图正常";
            }
            var date = c360.utils.unix2human(tableArray[i].time).date;

            var listArray = [{
                flag:tableArray[i].versionFlag,
                value:versionVal
            },{
                flag:tableArray[i].iconFlag,
                value:iconVal
            },{
                flag:tableArray[i].descFlag,
                value:descVal
            },{
                flag:tableArray[i].screenshotFlag,
                value:screenshotVal
            },{
                flag:2,
                value:'数据抓取时间:'+date
            }];

            array.push(<div>
                    <span className="flag-top">
                        <span className="flag-style version"><span className={tableArray[i].versionFlag == 1?"glyphicon glyphicon-info-sign green":"glyphicon glyphicon-info-sign red"}></span>{versionVal}</span>
                        <span className="flag-style desc"><span className={tableArray[i].descFlag == 1?"glyphicon glyphicon-info-sign green":"glyphicon glyphicon-info-sign red"}></span>{descVal}</span>
                        <span className="flag-style time"><span className="glyphicon glyphicon-info-sign orange"></span>数据抓取时间:{date}</span>
                    </span>
                    <span className="flag-bottom">
                        <span className="flag-style icon"><span className="glyphicon glyphicon-info-sign green"></span>{iconVal}</span>
                        <span className="flag-style screenshot"><span className="glyphicon glyphicon-info-sign green"></span>{screenshotVal}</span>
                        <span className="flag-style channel">
                            <a onClick={this.handleEditAlertEvent.bind(null,tableArray[i]._id,tableArray[i].title,listArray)} style={{cursor:"pointer"}}>编辑告警状态</a>
                            <a onClick={this.handleShowMatchEvent.bind(null,tableArray[i]._id,'查看匹配规则')} style={{cursor:"pointer",marginLeft:"10px"}}>查看匹配规则</a>
                            <a onClick={this.handleDeleteEvent.bind(null,tableArray[i]._id)} style={{cursor:"pointer",marginLeft:"10px"}}>删除</a>
                        </span>
                    </span>
                </div>);
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
        MainAction.showEditAlert(title,true,array);
    },

    handleShowMatchEvent:function(id,title,array){
        MainAction.showAlert(title,'',true);
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