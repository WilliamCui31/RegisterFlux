var AppDispatcher=require('../dispatcher/AppDispatcher');
var RegisterConstants=require('../constants/RegisterConstants');

var RegisterActions={

	getGraphCode: function(){
		AppDispatcher.dispatch({
			actionType: RegisterConstants.GET_GRAPH_CODE
		});
	},

	getMessageCode: function(){
		AppDispatcher.dispatch({
			actionType: RegisterConstants.GET_MESSAGE_CODE
		});
	},

	toggleDisplay: function(id){
		AppDispatcher.dispatch({
			actionType: RegisterConstants.TOGGLE_DISPLAY,
			id: id
		});
	},

	updateStatus: function(id,status,value){
		AppDispatcher.dispatch({
			actionType: RegisterConstants.UPDATE_STATUS,
			id: id,
			status: status,
			value: value
		});
	},

	submit: function(){
		AppDispatcher.dispatch({
			actionType: RegisterConstants.SUBMIT
		})
	}

}

module.exports=RegisterActions;