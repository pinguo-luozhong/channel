require('./utils.js');

require('../common/Server.js');

var MainView = require('./MainView.js');

ReactDOM.render(
		<MainView />,
		document.getElementById('pageMain')
	);