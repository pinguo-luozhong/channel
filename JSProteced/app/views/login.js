/**
 * Created by luozhong on 16/2/16.
 */
require('./utils.js');

require('../common/Server.js');

var Route = require('./AppRoute.js');

var AppRoute = Route.AppRoute;

var IndexView = React.createClass({

    componentDidMount: function () {
        window.location.href = "#page_Login";
        AppRoute.init();
    },

    render: function () {
        return (<div></div>);
    }

});

ReactDOM.render(
    <IndexView />,
    document.getElementById('pageIndex')
);