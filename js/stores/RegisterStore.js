var AppDispatcher=require('../dispatcher/AppDispatcher');
var EventEmitter=require('events').EventEmitter;
var RegisterConstants=require('../constants/RegisterConstants');
var assign=require('object-assign');

var CHANGE_EVENT='change';

var _fields={
	mobileNumber: {
		id: 'mobileNumber',
		type: 'text',
		name: '手机号码',
		size: 'lg',
		require: 'required',
		status: 'normal',
		placeholder: '请输入您的常用手机号码',
		regExp: /^1[3,4,5,7,8]\d{9}$/,
		errorHint: '手机号码格式不正确，请重新输入！',
		existHint: '手机号码已经存在，您可以直接登录！',
		emptyHint: '手机号码不能为空哦！',
		focus: true
	},
	graphCode: {
		id: "graphCode",
		type: 'text',
		name: '图形验证码',
		require: 'required',
		status: 'normal',
		placeholder: '请输入图形验证码',
		graphCode: getGraphCode(4),
		errorHint: '图形验证码错误，请重新输入！',
		emptyHint: '图形验证码不能为空哦！'
	},
	messageCode: {
		id: 'messageCode',
		type: 'text',
		name: '短信验证码',
		require: 'required',
		status: 'normal',
		placeholder: '请输入短信验证码',
		errorHint: '短信验证码错误，请重新输入！',
		emptyHint: '短信验证码不能为空哦！'
	},
	password: {
		id: 'password',
		type: 'password',
		name: '登录密码',
		size: 'lg',
		require: 'required',
		status: 'normal',
		placeholder: '请输入6-20位字母和数字组合',
		regExp: /(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{6,20})$/,
		errorHint: '登录密码格式不正确，请重新输入！',
		emptyHint: '登录密码不能为空哦！'
	},
	inviteCode: {
		id: 'inviteCode',
		type: 'text',
		name: '推荐码',
		size: 'lg',
		require: 'optional',
		status: 'normal',
		placeholder: '请输入推荐码',
		errorHint: '输入的推荐码不存在，请重新输入！',
		nonentityHint: '输入的推荐码不存在!',
		display: 'hidden'
	}
};

function update(id,updates){
	_fields[id]=assign({},_fields[id],updates);
}

/** 
  *
  * @des 随机生成字符串（模拟生成图形验证码） 
  * @param {len} number 生成字符串的位数
  * @return {str} string 生成的字符串
  *
  **/
function getGraphCode(len){
	var len=len||32;
	var charLib='ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'; /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
	var maxPos=charLib.length;
	var str='';
	for(var i=0; i<len; i++){
		str+=charLib.charAt(Math.floor(Math.random()*maxPos));
	}

	return str;
}

/** 
  *
  * @des 随机生成数字字符串（模拟发送短信验证码）
  * @param {len} number 生成字符串的位数
  * @return {str} string 生成的字符串
  *
  **/
function getMessageCode(len){
	var len=len||32;
	var charLib='0123456789';
	var maxPos=charLib.length;
	var str='';
	for(var i=0; i<len; i++){
		str+=charLib.charAt(Math.floor(Math.random()*maxPos));
	}

	console.log('messageCode: '+str);
	return str;
}

/** 
  *
  * @des 查询用户（模拟查询后台用户手机号码）
  * @param {str} string 要查询的字符串
  * @return {result} boolean 返回查询结果true or false
  *
  **/
function queryUser(str){
	var userLib=['13576283879','15820757329','13392856621'];
	var result=false;
	for(var i in userLib){
		if(userLib[i]===str) result=true;
	}
	return result;
}

var RegisterStore=assign({},EventEmitter.prototype,{

	areAllSuccess: function(){
		for(var id in _fields){
			if(_fields[id].require==='required'&&_fields[id].status!=='success'||
				_fields[id].require==='optional'&&_fields[id].status==='warning'){
				return false;
			}
		}
		return true;
	},

	getAll: function(){
		return _fields;
	},

	emitChange: function(){
		this.emit(CHANGE_EVENT);
	},

	addChangeListener: function(callback){
		this.on(CHANGE_EVENT,callback);
	},

	removeChangeListener: function(callback){
		this.removeListener(CHANGE_EVENT,callback);
	}

});

AppDispatcher.register(function(action){
	switch(action.actionType){
		case RegisterConstants.GET_GRAPH_CODE:
			update("graphCode",{graphCode: getGraphCode(4)});
			RegisterStore.emitChange();
			break;

		case RegisterConstants.GET_MESSAGE_CODE:
			update("messageCode",{messageCode: getMessageCode(6)});
			RegisterStore.emitChange();
			break;

		case RegisterConstants.TOGGLE_DISPLAY:
			if(_fields[action.id].display==='hidden'){
				update(action.id,{display: 'visible'});
			}else{
				update(action.id,{display: 'hidden'});
			}
			RegisterStore.emitChange();
			break;
			
		case RegisterConstants.UPDATE_STATUS:
			var status=action.status==="empty"?"warning":action.status;
			if(action.id==='mobileNumber'){
				if(queryUser(action.value)){
					status='warning';
					update(action.id,{exist: true});
				}else{
					update(action.id,{exist: false});
				}
			}else if(action.id==='inviteCode'){
				if(queryUser(action.value)){
					status='success';
					update(action.id,{exist: true});
				}else{
					update(action.id,{exist: false});
				}
			}
			update(action.id,{status: status,value: action.value});
			RegisterStore.emitChange();
			break;

		case RegisterConstants.SUBMIT:
			var registerData={};
			for(var id in _fields){
				if(_fields[id].value) registerData[id]=_fields[id].value;
			}
			console.log(registerData);
			break;

		default:
	}
});

module.exports=RegisterStore;