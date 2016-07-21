var React=require('react');
var Header=require('../components/Header');
var LoginWindow=require('../components/LoginWindow');
var RegisterBox=require('../components/RegisterBox');
var Footer=require('../components/Footer');
var RegisterStore=require('../stores/RegisterStore');

var ReactCSSTransitionGroup=require('react/lib/ReactCSSTransitionGroup');

require('../../css/common.css');
require('../../css/iconfont.css');
require('../../css/register.css');

var Register=React.createClass({

	render: function(){
		return (
			<div>
				<Header />
				<div id="content">
					<div className="content-box">
						<ReactCSSTransitionGroup 
							transitionName="cut" 
							transitionEnterTimeout={500} 
							transitionLeaveTimeout={300}>
							{this.props.children}
						</ReactCSSTransitionGroup>
					</div>
				</div>
				<Footer />
			</div>
		);
	}
});

module.exports=Register;
