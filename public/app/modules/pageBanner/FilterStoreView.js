var FilterStoreView = React.createClass({

	getInitialState:function(){
		return {
		}
	},

	render:function(){
		return (
			<div className="boxmax">
				<div className="title">
					<strong className="l">
						{this.props.value}
					</strong>
			        <span className="r"></span>
				</div>
				<div className="textbox">
			        <div className="tablee">
			        	{this.props.value}
			        </div>
				</div>
			</div>
		)
	}
});

module.exports = FilterStoreView;