var Spinner = require('./spin.js');

var LoadingView = React.createClass({

    componentDidMount:function(){
        $.ajaxSetup({
            global: true
        });

        var opts = {
            lines: 13, // The number of lines to draw
            length: 7, // The length of each line
            width: 4, // The line thickness
            radius: 10, // The radius of the inner circle
            corners: 1, // Corner roundness (0..1)
            rotate: 0, // The rotation offset
            color: '#000', // #rgb or #rrggbb
            speed: 1, // Rounds per second
            trail: 60, // Afterglow percentage
            shadow: false, // Whether to render a shadow
            hwaccel: false, // Whether to use hardware acceleration
            className: 'spinner', // The CSS class to assign to the spinner
            zIndex: 2e9, // The z-index (defaults to 2000000000)
            top: '50%', // Top position relative to parent in px
            left: '50%' // Left position relative to parent in px
        };

        var target = document.getElementById('loading');

        var spinner = new Spinner(opts).spin(target);

        $(document).ajaxStop(function() {
            $(target).removeClass('active');
        });

        $(document).ajaxStart(function() {
            $(target).addClass('active');
        });
    },

    render:function(){
        return (
                <div id="loading"></div>
            );
    }

});

module.exports = LoadingView;