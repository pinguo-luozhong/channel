require('../../common/fileupload.js');

var Action = require('../../views/MainAction.js');

var MainAction = Action.MainAction;

var UpdateChannelDialogView = React.createClass({

    getInitialState:function(){
        return {
            showUpdateChannelAlertFlag: false,
            showUpdateChannelAlertTitle:'Error',
            version:'',
            desc:''
        };
    },

    componentDidMount:function(){
        this.url = "uploadFiles";

        var uploadIcon = $(ReactDOM.findDOMNode(this.refs.uploadIcon));
        uploadIcon.fileupload({
            url: c360.config.jsonpRoot+this.url,
            type:"post",
            dataType: 'json',
            add: function(e, data) {
                data.submit();
            }.bind(this),
            done: function(e, data) {
                var data = data.result;
                if(data.status == 200){
                    MainAction.setIcon(data.data);
                }else{
                    MainAction.showAlert('Error','图片上传错误，请重试！',true);
                    return;
                };
            }
        });

        var uploadImage = $(ReactDOM.findDOMNode(this.refs.uploadImage));
        uploadImage.fileupload({
            url: c360.config.jsonpRoot+this.url,
            type:"post",
            dataType: 'json',
            add: function(e, data) {
                if(this.props.pageObject.imageList.length == 6){
                    MainAction.showAlert('Error','最多上传6张截图！',true);
                    return;
                }
                data.submit();
            }.bind(this),
            done: function(e, data) {
                var data = data.result;
                if(data.status == 200){
                    MainAction.setImageList(data.data);
                }else{
                    MainAction.showAlert('Error','图片上传错误，请重试！',true);
                    return;
                };
            }
        });
    },

    render:function(){

        var imageDom = (function() {

            var tempArr = [];

            if(this.props.pageObject.icon == ""){
                tempArr.push(<div key="icon0" ></div>);
            }else{
                tempArr.push(<img key="icon0" className="standard" style={{ marginLeft:"20px",marginTop:"20px"}} src={this.props.pageObject.icon} alt="上传图片"/>);
            }

            return tempArr;

        }.bind(this))();

        var imageListDom = (function() {

            var tempArr = [];

            if(this.props.pageObject.imageList.length == 0){
                tempArr.push(<div key="file0"></div>);
            }else{
                this.props.pageObject.imageList.map(function(item,index){
                    tempArr.push(<div key={"file"+index} className="general-panel">
                        <div className="delete-panel hide" onClick={this.handleDeleteEvent.bind(this,item)}>
                            <span className="glyphicon glyphicon-trash" aria-hidden="true">
                            </span>
                        </div>
                        <img className="standard" src={item} alt="上传图片"/>
                    </div>);
                }.bind(this));
            }

            return tempArr;

        }.bind(this))();

        var elementDom = (function(){

            var tempArr = [];

            if(this.props.pageObject.updateChannelFlag){
                tempArr.push(<button onClick={this.handleConfirmEvent} type="button" className="btn">保存</button>);
            }else{
                tempArr.push(<button onClick={this.handleConfirmEvent} type="button" className="btn">编辑</button>);
            }

            return tempArr;

        }.bind(this))();

        return (
                <div id="updateChannelDialog" onClick={this.handleHideEvent} className={this.props.pageObject.showUpdateChannelAlertFlag?"modal fade in":"modal fade"}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button onClick={this.handleCloseEvent} type="button" className="close">&times;</button>
                                <h4 className="modal-title">{this.props.pageObject.showUpdateChannelAlertTitle}</h4>
                            </div>
                            <div className="modal-body">
                                <div style={{display: 'block'}}>
                                    <span style={{display: 'inline-block',lineHeight:'24px',width:'50px',textAlign:'right'}}><div className="red">*</div>版本号</span>
                                    <input className="form-control" onChange={this.handleVersionEvent} value={this.props.pageObject.version} type="text" style={{display: 'inline-block',marginLeft:'10px'}} placeholder=""/>
                                </div>
                                <div style={{display: 'block',marginTop:'20px'}}>
                                    <span style={{display: 'inline-block',lineHeight:'24px',width:'50px',textAlign:'right'}}><div className="red">*</div>描述</span>
                                    <input className="form-control" onChange={this.handleDescEvent} value={this.props.pageObject.desc} type="text" style={{display: 'inline-block',marginLeft:'10px'}} placeholder=""/>
                                </div>
                                <div style={{display: 'block'}}>
                                    <span style={{display: 'inline-block',lineHeight:'24px',width:'50px',textAlign:'right',marginTop:'20px'}}><div className="red">*</div>图标</span>
                                    <button type="button" className="btn btn-primary" style={{marginTop:'20px',marginLeft:'10px'}}>上传图片</button>
                                    <input className="cover-upload" ref="uploadIcon" name="files" type="file"/>
                                    {imageDom}
                                </div>
                                <div style={{display: 'block'}}>
                                    <span style={{display: 'inline-block',lineHeight:'24px',width:'50px',textAlign:'right',marginTop:'20px'}}><div className="red">*</div>截图</span>
                                    <button type="button" className="btn btn-primary" style={{marginTop:'20px',marginLeft:'10px'}}>上传图片</button>
                                    <input className="cover-upload" ref="uploadImage" name="files" type="file"/>
                                    {imageListDom}
                                </div>
                            </div>
                            <div className="modal-footer">
                                {
                                    elementDom
                                }
                                <button style={{marginLeft:'20px'}} onClick={this.handleCloseEvent} type="button" className="btn">关闭</button>
                            </div>
                        </div>
                    </div>
                </div>
            );
    },

    handleDeleteEvent:function(src,event){
        MainAction.delImageList(src);
    },

    handleHideEvent:function(event){
        var target = $(event.target);
        if(target.attr('id') == 'updateChannelDialog') this.handleCloseEvent(event);
    },

    handleConfirmEvent:function(event){
        //this.handleStateEvent(event);
        if($.isFunction(this.props.pageObject.comfirmCallback)) this.props.pageObject.comfirmCallback();
    },

    handleCloseEvent:function(event){
        this.handleStateEvent(event);
        if($.isFunction(this.props.pageObject.cancelCallback)) this.props.pageObject.cancelCallback();
    },

    handleDescEvent:function(event){
        var target = $(event.target),
            desc = target.val().trim();
        this.props.pageObject.desc = desc;
        this.setState({
            desc:desc
        });
    },

    handleVersionEvent:function(event){
        var target = $(event.target),
            version = target.val().trim();
        this.props.pageObject.version = version;
        this.setState({
            version:version
        });
    },

    handleStateEvent:function(event){
        event.stopPropagation();
        this.props.pageObject.showUpdateChannelAlertFlag = false;
        this.props.pageObject.showUpdateChannelAlertTitle = 'Error';
        this.setState({
            showUpdateChannelAlertFlag: false,
            showUpdateChannelAlertTitle:'Error',
        });
    }

});

module.exports = UpdateChannelDialogView;