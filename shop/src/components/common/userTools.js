let UserTools = {}

let loginedUser = JSON.parse(localStorage.getItem('loginedUser') || '{}')

//保存登录信息
UserTools.savelogin = function(user) {
	for(var u in user) {
		loginedUser[u] = user[u]
	}
	loginedUser.password=""
	this.saveLoginedUser(loginedUser);
}

//登出
UserTools.logout = function(id) {
	loginedUser = {}
	this.saveLoginedUser(loginedUser);
}

UserTools.islogin= function() {
	return loginedUser
}
UserTools.getLoginedUser = function() {
	return loginedUser

}

//存储
UserTools.saveLoginedUser = function() {
	localStorage.setItem('loginedUser', JSON.stringify(loginedUser));
}

export default UserTools;