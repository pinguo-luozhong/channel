require('./utils.js');

require('../common/Server.js');

var Route = require('./AppRoute.js');

var AppRoute = Route.AppRoute;

var IndexView = React.createClass({

    componentDidMount: function () {
        if (window.location.hash == "") {
            //window.location.href = "#page_Login";
        }
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