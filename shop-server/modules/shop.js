const query = require('./mysql_pool')

var shop = {

	insert(body, callback) {
		var sql = "INSERT INTO  ";
		var sql2 = " shop(";
		var sql3 = " VALUES(";
		Object.keys(body).forEach(function(key, i) {
			if(i > 0) {
				sql2 += ",";
				sql3 += "?"
			}
			sql2 += key;
			sql3 += "?"

		});
		sql2 += ")";
		sql3 += ")";
		sql = sql + sql2 + sql3;

		if(!callback) {
			return new Promise(function(resolve, reject) {
				query(sql, Object.values(body), function(error, results, fields) {
					if(reject != null && error != null) {
						reject(error);
					} else {
						resolve(results, error);
					}
				})
			})
		} else {
			query(sql, Object.values(body), function(error, results, fields) {
				if(error) {
					callback(error, null)
				}
				callback(null, results);
			})
		}

	},
	find(obj, callback) {
		var sql = "select * from shop where "
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
		var sql = "update shop set ";
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
	adddata(obj, callback) {
		var sql = "update shop set ";
		var id = obj.id;
		delete obj["id"];
		Object.keys(obj).forEach(function(key, i) {
			if(i > 0)
				sql += ",";
			sql += key + "=" + key + "+? ";

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
		var sql = "delete from shop where u_id=?"
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
module.exports = shop;