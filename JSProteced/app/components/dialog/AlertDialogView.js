var AlertDialogView = React.createClass({

    getInitialState:function(){
        return {
            showAlertFlag: false,
            showAlertTitle:'Error',
            showAlertMessage:''
        };
    },

    render:function(){
        return (
                <div id="alertDialog" onClick={this.handleHideEvent} className={this.props.pageObject.showAlertFlag?"modal fade in":"modal fade"}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button onClick={this.handleCloseEvent} type="button" className="close">&times;</button>
                                <h4 className="modal-title">{this.props.pageObject.showAlertTitle}</h4>
                            </div>
                            <div className="modal-body">
                                {this.props.pageObject.showAlertMessage}
                            </div>
                            <div className="modal-footer">
                                <button onClick={this.handleCloseEvent} type="button" className="btn">关闭</button>
                            </div>
                        </div>
                    </div>
                </div>
            );
    },

    handleHideEvent:function(event){
        var target = $(event.target);
        if(target.attr('id') == 'alertDialog') this.handleCloseEvent(event);
    },

    handleCloseEvent:function(event){
        event.stopPropagation();
        this.props.pageObject.showAlertFlag = false;
        this.props.pageObject.showAlertTitle = 'Error';
        this.props.pageObject.showAlertMessage = '';
        this.setState({
            showAlertFlag: false,
            showAlertTitle:'Error',
            showAlertMessage:''
        });
        if($.isFunction(this.props.pageObject.callback)) this.props.pageObject.callback();
    }

});

module.exports = AlertDialogView;