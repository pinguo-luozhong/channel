var PageAction = Reflux.createActions(['setReset','setPageTotal','setCurrentPageIndex']);

var PageStore = Reflux.createStore({

    listenables:[PageAction],

    getInitialState:function(){
        return this.onSetReset();
    },

    onSetReset:function(){

        this.pageObject = {
            pageTotal:0,
            callback:null,
            currentPageIndex:0
        };

        return this.pageObject;
    },

    onSetPageTotal:function(pageTotal,callback){
        this.pageObject.pageTotal = pageTotal;
        this.pageObject.callback = callback;
        this.trigger(this.pageObject);
    },

    onSetCurrentPageIndex:function(currentPageIndex){
        this.pageObject.currentPageIndex = currentPageIndex;
        this.trigger(this.pageObject);
    }

});

module.exports = {
    PageAction:PageAction,
    PageStore:PageStore
};