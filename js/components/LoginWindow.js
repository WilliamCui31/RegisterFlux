var React=require('react');
var Link=require('react-router').Link;

var Content=React.createClass({
	render: function(){
		return (
			<div className="nt-loginWindow" key="login">
				<div className="nt-loginWindow-title"><h1>登录</h1></div>
				<div className="nt-loginWindow-form">
					<div className="nt-loginWindow-error" id="errorHintWrapper">
						<i className="iconfont icon-gantanhao"></i>
						<span id="errorHint"></span>
					</div>
					<div style={{marginTop:"7px"}}>
						<i className="iconfont input-icon">&#xe674;</i>
						<input type="text" className="nt-input block" placeholder="请输入您的手机号码" name="acct" autoFocus />
					</div>
					<div>
						<i className="iconfont input-icon">&#xe675;</i>
						<input type="password" className="nt-input block" placeholder="请输入登录密码" name="password" />
					</div>
					<div className="clearfix nt-verificationCode-wrapper" id="verificationCodeWrapper">
						<div className="col-xs-6"><input type="text" className="nt-input block" placeholder="请输入验证码" name="verifyCode" val="" /></div>
						<div className="col-xs-4"><img src="javascript:;" className="captchaId" className="yzm" width="85" height="40" style={{cursor: "pointer"}}/></div>
						<div className="col-xs-2 nt-cannotSee-hint">看不清换一张</div>
					</div>
					<div className="login-btn-wrapper"><button id="loginBtn">立即登录</button></div>
				</div>
				<div className="nt-loginWindow-footer">
					<Link to="/register" id="goRegister">注册领红包</Link><span style={{padding:"0 15px"}}>|</span><a href="/user/find_pwd.html">忘记密码?</a>
				</div>
			</div>
		);
	}
});

module.exports=Content;