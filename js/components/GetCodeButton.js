var React=require('react');
var classnames=require('classnames');

var GetCodeButton=React.createClass({

	getInitialState: function(){
		return {
			status: '',
			text: '获取验证码'
		}
	},

	tick: function(){
		if(this.state.text-1<1) {
			clearInterval(this.interval); 
			this.setState({
				status: '',
				text: '获取验证码'
			});
			return;
		}
		this.setState({text: this.state.text-1});
	},

	render: function(){
		return (
			<button className={classnames('nt-button','sm',this.state.status)} onClick={this._getCode}>{this.state.text}</button>		
		);
	},

	_getCode: function(){
		if(!this.state.status){
			this.props.onGetCode();
			this.setState({
				status: 'disabled',
				text: this.props.seconds
			});
			this.interval=setInterval(this.tick,1000);
		}
	}
});

module.exports=GetCodeButton;