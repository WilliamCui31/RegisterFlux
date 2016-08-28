var React=require('react');
var ReactDOM=require('react-dom');
var Register=require('./views/Register');
var LoginWindow=require('./components/LoginWindow');
var RegisterBox=require('./components/RegisterBox');

var Router=require('react-router').Router;
var Route=require('react-router').Route;
var IndexRoute=require('react-router').IndexRoute;
var browserHistory=require('react-router').browserHistory;
var IndexRedirect=require('react-router').IndexRedirect;

ReactDOM.render(
	<Router history={browserHistory}>
		<Route path="/" component={Register}>
			<IndexRedirect to="/register" />
			<Route path="/register" component={RegisterBox} />
			<Route path="/login" component={LoginWindow} />
		</Route>
	</Router>,
	document.querySelector("#app")
)