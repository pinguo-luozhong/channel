var Action = require('./PageAction.js');

var MainAction = require('../../modules/pageMain/MainAction.js');

var MainAction = MainAction.MainAction;

var PageAction = Action.PageAction;

var PageStore = Action.PageStore;

var PageView = React.createClass({

    mixins:[Reflux.connect(PageStore, 'pageObject')],

    handlerPageItemEvent: function(event) {

        var pageIndex = event.currentTarget.getAttribute("data-num"),
            index = 0,
            lastTimeSelectIndex = this.state.pageObject.currentPageIndex;

        if (pageIndex == "pre") {
            if (this.state.pageObject.currentPageIndex > 0) {
                index = this.state.pageObject.currentPageIndex - 1;
                PageAction.setCurrentPageIndex(this.state.pageObject.currentPageIndex - 1);
            }
        } else if (pageIndex == "next") {
            if (this.state.pageObject.currentPageIndex < this.totalPage - 1) {
                index = this.state.pageObject.currentPageIndex + 1;
                PageAction.setCurrentPageIndex(this.state.pageObject.currentPageIndex + 1);
            }
        } else if (pageIndex == "first") {
            index = 0;
            PageAction.setCurrentPageIndex(0);
        } else if (pageIndex == "last") {
            index = this.totalPage - 1;
            PageAction.setCurrentPageIndex(this.totalPage - 1);
        } else {
            index = parseInt(pageIndex);
            PageAction.setCurrentPageIndex(parseInt(pageIndex));
        }

        if($.isFunction(this.state.pageObject.callback)) this.state.pageObject.callback(index);

        if (lastTimeSelectIndex == this.state.pageObject.currentPageIndex) {
            return;
        }

        //this.doTableData();

    },

    updatePageItems:function(){
        this.totalPage = Math.ceil(this.state.pageObject.pageTotal / c360.MAX_PAGE_NUM);

        this.totalArray = [];

        this.createPreAndNextBtn(true);

        if (this.totalPage <= this.MAX_PAGE_SIZE) {
            for (var i = 0; i < this.totalPage; i++) {
                this.createPageItem(i);
            };
        } else {
            var index = 0;
            if (this.state.pageObject.currentPageIndex <= this.MAX_PAGE_FLAG) {
                // 当前页码小于等于2时，就创建前5个页码
                for (; index < this.MAX_PAGE_SIZE; index++) {
                    this.createPageItem(index);
                }
            } else if (this.state.pageObject.currentPageIndex > this.totalPage - this.MAX_PAGE_FLAG) {
                // 当前页码大于等于总页码-2时，就创建后5个页码
                index = this.totalPage - this.MAX_PAGE_SIZE;
                for (; index < this.totalPage; index++) {
                    this.createPageItem(index);
                }
            } else {
                // 当前页码大于等于2并且小于等于总页码-2时，就创建中间5个页码
                index = this.state.pageObject.currentPageIndex - this.MAX_PAGE_FLAG;
                var max = Math.min(this.state.pageObject.currentPageIndex + this.MAX_PAGE_FLAG, this.totalPage - 1);
                if (max == this.totalPage - 1) {
                    index = this.totalPage - this.MAX_PAGE_SIZE;
                }
                for (; index <= max; index++) {
                    this.createPageItem(index);
                }
            }
        }

        this.createPreAndNextBtn(false);
    },

    createPreAndNextBtn: function(isPre) {
        if (isPre == true) {
            this.totalArray.push(<a key="firstItem" className='pageItem' onClick={this.handlerPageItemEvent} data-num='first' href='javascript:void(0)'>第一页</a>);
            this.totalArray.push(<a key="preItem" className='pageItem' onClick={this.handlerPageItemEvent} data-num='pre' href='javascript:void(0)'>上一页</a>);
        } else {
            this.totalArray.push(<a key="nextItem" className='pageItem' onClick={this.handlerPageItemEvent} data-num='next' href='javascript:void(0)'>下一页</a>);
            this.totalArray.push(<a key="lastItem" className='pageItem' onClick={this.handlerPageItemEvent} data-num='last' href='javascript:void(0)'>最后一页</a>);
        }
    },

    createPageItem: function(index) {

        var activeClass = "";

        if (this.state.pageObject.currentPageIndex == index) {
            activeClass = "page_active";
        }

        this.totalArray.push(<a key={"item"+index} onClick={this.handlerPageItemEvent} className={'pageItem '+activeClass} data-num={index} href='javascript:void(0)'>{index + 1}</a>);

    },

    handleSelectEvent:function(event){
        var target = $(event.currentTarget);
        c360.MAX_PAGE_NUM = parseInt(target.val(),10);
        MainAction.getTemplateList(0,c360.api, this.initTemplateList);
    },

    initTemplateList: function (length) {
        PageAction.setPageTotal(length, function (index) {
            MainAction.getTemplateList(index,c360.api);
        }.bind(this));
    },

    render:function(){

        this.MAX_PAGE_SIZE = 5;

        this.MAX_PAGE_FLAG = 2;

        if(this.state.pageObject.pageTotal == 0){
            return (<div></div>);
        }

        this.updatePageItems();

        return (
                <div className="page">
                    <div className="l">
                        每页显示:
                        <select onChange={this.handleSelectEvent}>
                            <option value="10">10</option>
                            <option value="30">30</option>
                            <option value="60">60</option>
                            <option value="120">120</option>
                        </select>
                    </div>
                    <div className="r">
                        {this.totalArray}
                    </div>
                </div>
            );
    }

});

module.exports = PageView;