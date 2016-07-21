var React=require('react');
var ReactPropTypes=React.PropTypes;
var classnames=require('classnames');

var RegisterActions=require('../actions/RegisterActions');

var ENTER_KEY_CODE=13;

var Input=React.createClass({

	propTypes: {
		id: ReactPropTypes.string,
		type: ReactPropTypes.string,
		className: ReactPropTypes.string,
		placeholder: ReactPropTypes.string,
		RegExp: ReactPropTypes.object,
		focus: ReactPropTypes.bool
	},

	render: function(){
		return (
			<input 
				type={this.props.type}
				className={classnames('nt-input',this.props.className)}
				placeholder={this.props.placeholder}
				id={this.props.id}
				onBlur={this._check}
				onFocus={this._onFocus}
				onKeyDown={this._onKeyDown}
				autoFocus={this.props.focus}
			/>
		);
	},

	_check: function(e){
		this.props.onCheck(e.target.value);
	},

	_onKeyDown: function(e){
		if(e.keyCode===ENTER_KEY_CODE){
			e.preventDefault();
			this._check(e);
			this.props.moveFocus(this.props.id);
		}
	},

	_onFocus: function(e){
		RegisterActions.updateStatus(this.props.id,'normal',e.target.value);
	}

});

module.exports=Input;