const query = require('./mysql_pool')

var wallet = {

	insert(body, callback) {
		if(!callback) {
			return new Promise(function(resolve, reject) {
				query("INSERT INTO wallet VALUES(?,?,?,?)", Object.values(body), function(error, results, fields) {
					if(reject != null && error != null) {
						reject(error);
					} else {
						resolve(results, error);
					}
				})
			})
		} else {
			query("INSERT INTO wallet VALUES(?,?,?,?)", Object.values(body), function(error, results, fields) {
				if(error) {
					callback(error, null)
				}
				callback(null, results);
			})
		}

		query("INSERT INTO wallet VALUES(?,?,?,?)", Object.values(body), function(error, results, fields) {
			if(error) {
				callback(error, null)
			}
			callback(null, results);
		})
	},
	find(obj, callback) {
		var sql = "select * from wallet where "
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
		var sql = "update wallet set ";
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
		var sql = "update wallet set ";
		var u_id = obj.u_id;
		delete obj["u_id"];
		Object.keys(obj).forEach(function(key, i) {
			if(i > 0)
				sql += ",";
			sql += key + "=" + key + "+? ";

		});
		sql += " where u_id=" + u_id;

		if(!callback) {
			return new Promise(function(resolve, reject) {
				query(sql, Object.values(obj), function(error, results, fields) {
					if(reject != null && error != null) {
						console.log(error)
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
		var sql = "delete from wallet where u_id=?"
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
module.exports = wallet;