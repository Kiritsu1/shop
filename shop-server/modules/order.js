const query = require('./mysql_pool')

var order = {

	insert(body, callback) {
		var sql = "INSERT INTO  ";
		var sql2 = " prodorder(";
		var sql3 = " VALUES(";
		Object.keys(body).forEach(function(key, i) {
			if(i > 0) {
				sql2 += ",";
				sql3 += ",";
			}
			sql2 += key;

			sql3 += "?";

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
	insertmore(objArr, callback) {
		//添加多条记录 ，参数为一个obj的arr
		var sql = "INSERT INTO ";
		var sql2 = " prodorder(";
		var sql3 = 'VALUES';
		var paramsArr = []

		Object.keys(objArr[0]).forEach(function(key, i) {
			if(i > 0)
				sql2 += ",";
			sql2 += key;
		});
		sql2 += ")";

		objArr.forEach((obj, i) => {
			sql3 += "(";
			Object.keys(obj).forEach(function(key, j) {
				if(j > 0) {
					sql3 += ",";
				}
				sql3 += "?";

			});
			paramsArr = paramsArr.concat(Object.values(obj))
			sql3 += "),";

		})
		sql3 = sql3.replace(/,$/gi, "");

		sql = sql + sql2 + sql3;
		console.log(sql)
		console.log(paramsArr)

		if(!callback) {
			return new Promise(function(resolve, reject) {
				query(sql, paramsArr, function(error, results, fields) {
					if(reject != null && error != null) {
						reject(error);
					} else {
						resolve(results, error);
					}
				})
			})
		} else {
			query(sql, paramsArr, function(error, results, fields) {
				if(error) {
					callback(error, null)
				}
				callback(null, results);
			})
		}

	},
	find(obj, callback) {
		var sql = "select * from prodorder where ";
		console.log(obj)
		Object.keys(obj).forEach(function(key, i) {
			if(i > 0)
				sql += " and ";
			sql += key + " =? ";
		});
		console.log(sql)
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
		var sql = "update prodorder set ";
		var id = obj.orderid;
		delete obj["orderid"];
		Object.keys(obj).forEach(function(key, i) {
			if(i > 0)
				sql += ",";
			sql += key + " =? ";

		});
		sql += " where orderid=" + id;

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
		var sql = "update prodorder set ";
		var id = obj.orderid;
		delete obj["orderid"];
		Object.keys(obj).forEach(function(key, i) {
			if(i > 0)
				sql += ",";
			sql += key + "=" + key + "+? ";

		});
		sql += " where orderid=" + id;

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
		var sql = "delete from prodorder where orderid=?"
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
module.exports = order;