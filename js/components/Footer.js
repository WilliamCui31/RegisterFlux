var React=require('react');

var Footer=React.createClass({
	render: function(){
		return <div id="footer">
			<div id="footer-boy"></div>
			<ul className="footer-nav clearfix">
				<li className="footer-nav-cell first-cell"><a href="/index.do">网站首页</a></li>
				<li className="footer-nav-cell"><a href="/about/32.html">关于我们</a></li>
				<li className="footer-nav-cell"><a href="/about/40.html">联系我们</a></li>
				<li className="footer-nav-cell last-cell"><a href="http://wpa.b.qq.com/cgi/wpa.php?ln=2&uin=4006322688" target="_blank">在线咨询</a></li>
			</ul>
			<p className="footer-copyright">
				All Rights Reserved | 备案号：粤ICP备15090308号 | 深圳农泰金融服务有限公司
			</p>
		</div>
	}
});

module.exports=Footer;