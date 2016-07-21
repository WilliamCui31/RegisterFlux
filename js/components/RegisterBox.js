var React=require('react');
var ReactPropTypes=React.PropTypes;
var Field=require('./Field');
var RegisterStore=require('../stores/RegisterStore');

var RegisterActions=require('../actions/RegisterActions');

var Link=require('react-router').Link;

var RegisterBox=React.createClass({

	getInitialState: function(){
		return {
			allFields: RegisterStore.getAll(),
			areAllSuccess: RegisterStore.areAllSuccess(),
			agree: true
		}
	},

	contextTypes: {
		router: React.PropTypes.object.isRequired
	},

	componentDidMount: function(){
		RegisterStore.addChangeListener(this._onChange);
		this.context.router.setRouteLeaveHook(
			this.props.route,
			this.routerWillLeave
		)
	},

	componentWillUnmount: function(){
		RegisterStore.removeChangeListener(this._onChange);
	},

	render: function(){

		var allFields=this.state.allFields;
		var fields=[];

		for(var key in allFields){
			fields.push(<Field key={key} field={allFields[key]} moveFocus={this._moveFocus}/>);
		}

		return (
			<div className="register-box" key="register">
				<p className="turn-login">已有账户？<Link to="/login" id="goLogin">立即登录</Link></p>
				<h1 className="register-tit">注册账户</h1>
				<ul className="register-list">
					{fields}
					<li className="register-cell clearfix">
						<span className="register-cell-value agree">
							<input type="checkbox" id="agree" checked={this.state.agree} onChange={this._checkAgree} />
							<label htmlFor="agree">我已阅读并同意<a href="https://www.ntjrchina.com/req/protocol.do?type=protocol&name=%25E6%25B3%25A8%25E5%2586%258C%25E5%258D%258F%25E8%25AE%25AE" target="_blank">《农泰金融平台注册及服务协议》</a></label>
						</span>
					</li>
					<li className="register-cell clearfix">
						<span className="register-cell-value">
							<input type="button" className="nt-button lg" id="regBtn" value="立即注册" onClick={this._submit} />
						</span>
					</li>
				</ul>
			</div>
		);
	},

	_moveFocus: function(id){
		var allFields=this.state.allFields,keys=[],index;
		for(var key in allFields){
			if(allFields[key].display!=='hidden') {
				keys.push(key);
				if(key===id) index=keys.length;
			}
		}
		if(index>keys.length-1) index=0;
		document.getElementById(keys[index]).focus();
	},

	_checkAgree: function(e){
		this.setState({agree: e.target.checked});
	},

	_submit: function(){
		if(this.state.areAllSuccess&&this.state.agree){
			console.log("success");
			RegisterActions.submit();
		}else{
			console.log("failure");
			var allFields=this.state.allFields;
			for(var id in allFields){
				if(allFields[id].status==='warning'){
					document.getElementById(id).select();
					RegisterActions.updateStatus(id,'warning',allFields[id].value);
					return;
				}else if(allFields[id].require==='required'
					&&!allFields[id].value) {
					document.getElementById(id).select();
					RegisterActions.updateStatus(id,'empty','');
					return;
				}
			}
		}
	},

	_onChange: function(){
		this.setState({
			allFields: RegisterStore.getAll(),
			areAllSuccess: RegisterStore.areAllSuccess()
		});
	},

	routerWillLeave: function(nextLocation){
		//return '已有账户？';
	}

});

module.exports=RegisterBox;