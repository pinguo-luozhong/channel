var EditAlertDialogView = React.createClass({

    getInitialState:function(){
        return {
            showEditAlertFlag: false,
            showEditAlertModel:[],
            showEditAlertTitle:'Error'
        };
    },

    render:function(){

        var templateArr = (function() {

            var tempArr = [];

            this.props.pageObject.showEditAlertModel.map(function(item,index){
                tempArr.push(<div style={{marginTop:"20px"}}>
                    <span style={{display:"inline-block",lineHeight:"30px",float:'left'}}>
                        <img style={{width:"30px"}} src={item.icon}/>
                        <span style={{marginLeft:"10px"}}>{item.flag}</span>
                    </span>
                    <a className="bottun4 relative" onClick={this.handleChannelEvent} style={{margin:"0px 0px 0px 22px"}}>
                        <div><span>警告忽略</span></div>
                    </a>
                    <div style={{clear: 'both'}}></div>
                </div>);
            });

            return tempArr;

        }.bind(this))();

        return (
                <div id="editAlertDialog" onClick={this.handleHideEvent} className={this.props.pageObject.showEditAlertFlag?"modal fade in":"modal fade"}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button onClick={this.handleCloseEvent} type="button" className="close">&times;</button>
                                <h4 style={{textAlign:"center"}} className="modal-title">{'编辑警告状态：'+this.props.pageObject.showEditAlertTitle}</h4>
                            </div>
                            <div className="modal-body">
                                {
                                    templateArr
                                }
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
        if(target.attr('id') == 'editAlertDialog') this.handleCloseEvent(event);
    },

    handleCloseEvent:function(event){
        event.stopPropagation();
        this.props.pageObject.showEditAlertFlag = false;
        this.props.pageObject.showEditAlertModel = [];
        this.props.pageObject.showEditAlertTitle = 'Error';
        this.setState({
            showEditAlertFlag: false,
            showEditAlertModel:[],
            showEditAlertTitle:'Error'
        });
        if($.isFunction(this.props.pageObject.callback)) this.props.pageObject.callback();
    }

});

module.exports = EditAlertDialogView;