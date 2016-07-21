var React=require('react');
var ReactPropTypes=React.PropTypes;
var classnames=require('classnames');
var Input=require('./Input');
var GetCodeButton=require('./GetCodeButton');

var ReactCSSTransitionGroup=require('react/lib/ReactCSSTransitionGroup');

var RegisterActions=require('../actions/RegisterActions');

var Field=React.createClass({

	propTypes: {
		field: ReactPropTypes.object.isRequired
	},

	getInitialState: function(){
		return {
			type: this.props.field.type,
			eye: 'icon-guanbiyanjing'
		}
	},

	render: function(){
		var field=this.props.field;

		var graphCode;
		if(field.id==='graphCode') {
			graphCode=<span className="graph-code sm" onClick={this._getGraphCode}>{field.graphCode}</span>;
		}

		var getMessageCodeButton;
		if(field.id==='messageCode') {
			getMessageCodeButton=<GetCodeButton onGetCode={this._getMessageCode} seconds={30} />
		}

		var eye;
		if(field.type==='password') {
			eye=<i className={classnames('iconfont','icon-eye',this.state.eye)} onClick={this._switchEye}></i>;
		}

		var inviteDirection,inviteCell;
		if(field.id==='inviteCode'){
			inviteDirection=(
				<span className="register-cell-value invite-tip" onClick={this._toggleInvite}>
					<i className="iconfont">&#xe67f;</i>推荐人手机号、推荐码（选填）
				</span>
			);
			inviteCell='invite-cell';
		}

		var feedback;
		if(field.status==='success'){
			feedback=<i className="iconfont register-success-icon">&#xe673;</i>	
		}else if(field.status==='warning'){
			var feedbackText=field.errorHint
			if(field.id==='mobileNumber'&&field.exist){
				feedbackText=field.existHint;
			}else if(field.id==='inviteCode'&&!field.exist){
				feedbackText=field.nonentityHint;
			}else if(!field.value){
				feedbackText=field.emptyHint;
			}
			feedback=(
				<p className="register-error-tip" key={field.id}>
					<i className="register-error-tip-triangle"></i>
					{feedbackText}
				</p>
			);
		}

		return (
			<li className={classnames('register-cell',inviteCell,'clearfix')}>
				{inviteDirection}
				<lable className={classnames('register-cell-key',field.display)}>{field.name}：</lable>
				<span className={classnames('register-cell-value',field.display)}>
					<Input 
						type={this.state.type}
						className={classnames(field.size,field.status)}
						id={field.id} 
						placeholder={field.placeholder}
						onCheck={this._onCheck}
						moveFocus={this._moveFocus}
						focus={field.focus}
					/>
					{graphCode}
					{getMessageCodeButton}
					{eye}
				</span>
		        <ReactCSSTransitionGroup 
		          transitionName="feedback" 
		          transitionEnterTimeout={300} 
		          transitionLeaveTimeout={300}>
					{feedback}
				</ReactCSSTransitionGroup>
			</li>
		)
	},

	_onCheck: function(value){
		var status='normal';
		if(value){
			var field=this.props.field;
			status='warning';

			if(field.regExp&&field.regExp.test(value)){
				status='success';
			}else if(field.graphCode&&eval('/^'+field.graphCode+'$/i').test(value)){
				status='success';
			}else if(field.messageCode&&field.messageCode===value){
				status='success';
			}
		}

		RegisterActions.updateStatus(this.props.field.id,status,value);
	},

	_moveFocus: function(id){
		this.props.moveFocus(id);
	},

	_getGraphCode: function(){
		RegisterActions.getGraphCode();
	},

	_getMessageCode: function(){
		RegisterActions.getMessageCode();
	},

	_switchEye: function(e){
		if(this.state.type==='password'){
			this.setState({
				type: 'text',
				eye: 'icon-yanjing'
			});
		}else{
			this.setState({
				type: 'password',
				eye: 'icon-guanbiyanjing'
			});
		}
	},

	_toggleInvite: function(){
		RegisterActions.toggleDisplay(this.props.field.id);
	}

});

module.exports=Field;