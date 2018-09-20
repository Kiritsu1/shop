const query = require('./mysql_pool')

var user = {

	insert(body, callback) {
		if(!body['type'] || body.type == null) {
			body['type'] = 1;
		}
		if(!callback) {
			return new Promise(function(resolve, reject) {
				query("INSERT INTO user VALUES(null,?,?,?,?,?)", Object.values(body), function(error, results, fields) {
					if(reject != null && error != null) {
						reject(error);
					} else {
						resolve(results, error);
					}
				})
			})
		} else {
			query("INSERT INTO user VALUES(null,?,?,?,?,?)", Object.values(body), function(error, results, fields) {
				if(error) {
					callback(error, null)
				}
				callback(null, results);
			})
		}

	},
	find(obj, callback) {
		var sql = "select * from user where "
		Object.keys(obj).forEach(function(key, i) {
			if(i > 0)
				sql += " and ";
			sql += key + " =? ";
		});
		if(!callback) {
			return new Promise(function(resolve, reject) {
				query(sql, Object.values(obj), function(error, results, fields) {
					if(reject != null && error != null) {
						reject(error);
					} else {
						resolve(results, error);
					}
				})
			})
		} else {
			query(sql, Object.values(obj), function(error, results, fields) {
				if(error) {
					callback(null, error)
				} else {
					callback(results, null);
				}
			})
		}
	},
	update(obj, callback) {
		//		obj={id:xxx,username:xxx,password:xxx,email:xxx,telephone:xxx}
		var sql = "update user set ";
		var id = obj.id;
		delete obj["id"];
		Object.keys(obj).forEach(function(key, i) {
			if(i > 0)
				sql += ",";
			sql += key + " =? ";

		});
		sql += " where u_id=" + id;

		if(!callback) {
			return new Promise(function(resolve, reject) {
				query(sql, Object.values(obj), function(error, results, fields) {
					if(reject != null && error != null) {
						reject(error);
					} else {
						resolve(results, error);
					}
				})
			})
		} else {
			query(sql, Object.values(obj), function(error, results, fields) {
				if(error) {
					callback(null, error)
				} else {
					callback(results, null);
				}
			})
		}
	},
	delete(obj, callback) {
		var sql = "delete from user where u_id=?"
		if(!callback) {
			return new Promise(function(resolve, reject) {
				query(sql, Object.values(obj), function(error, results, fields) {
					if(reject != null && error != null) {
						reject(error);
					} else {
						resolve(results, error);
					}
				})
			})
		} else {
			query(sql, Object.values(obj), function(error, results, fields) {
				if(error) {
					callback(null, error)
				} else {
					callback(results, null);
				}
			})
		}
	}

	//	var addSql = 'INSERT INTO user VALUES(null,?,?,?,?)';
	//	var addSqlParams = ["admin", "123456", "fasd", "aaaa"];

}
module.exports = user;