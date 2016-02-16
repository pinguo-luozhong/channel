var ConfirmDialogView = React.createClass({

    getInitialState:function(){
        return {
            showComfirmFlag: false,
            showComfirmTitle:'Error',
            showComfirmMessage:''
        };
    },

    render:function(){
        return (
                <div id="confirmDialog" onClick={this.handleHideEvent} className={this.props.pageObject.showComfirmFlag?"modal fade in":"modal fade"}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button onClick={this.handleCloseEvent} type="button" className="close">&times;</button>
                                <h4 className="modal-title">{this.props.pageObject.showComfirmTitle}</h4>
                            </div>
                            <div className="modal-body">
                                {this.props.pageObject.showComfirmMessage}
                            </div>
                            <div className="modal-footer">
                                <button onClick={this.handleConfirmEvent} type="button" className="btn">确认</button>
                                <button style={{marginLeft:'20px'}} onClick={this.handleCloseEvent} type="button" className="btn">关闭</button>
                            </div>
                        </div>
                    </div>
                </div>
            );
    },

    handleHideEvent:function(event){
        var target = $(event.target);
        if(target.attr('id') == 'confirmDialog') this.handleCloseEvent(event);
    },

    handleConfirmEvent:function(event){
        this.handleStateEvent(event);
        if($.isFunction(this.props.pageObject.comfirmCallback)) this.props.pageObject.comfirmCallback();
    },

    handleCloseEvent:function(event){
        this.handleStateEvent(event);
        if($.isFunction(this.props.pageObject.cancelCallback)) this.props.pageObject.cancelCallback();
    },

    handleStateEvent:function(event){
        event.stopPropagation();
        this.props.pageObject.showComfirmFlag = false;
        this.props.pageObject.showComfirmTitle = 'Error';
        this.props.pageObject.showComfirmMessage = '';
        this.setState({
            showComfirmFlag: false,
            showComfirmTitle:'Error',
            showComfirmMessage:''
        });
    }

});

module.exports = ConfirmDialogView;