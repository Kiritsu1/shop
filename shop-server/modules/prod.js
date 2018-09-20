const query = require('./mysql_pool')

var prod = {

	insert(body, callback) {
		var sql = "INSERT INTO  ";
		var sql2 = " prod(";
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
	find(obj, callback) {
		var sql = "select * from prod where "
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
	//根据多个值查找,obj的val是一个arr
	findbymore(obj, callback) {
		var sql = "select * from prod where ";
		var key = Object.keys(obj)[0];

		obj[key].forEach(function(k, i) {
			if(i == 0) sql += key + " in ( ";
			if(i > 0) sql += ","
			sql += "?";
			if(i == obj[key].length - 1) sql += ")";
		})
		if(!callback) {
			return new Promise(function(resolve, reject) {
				query(sql, obj[key], function(error, results, fields) {
					if(reject != null && error != null) {
						reject(error);
					} else {
						resolve(results, error);
					}
				})
			})
		} else {
			query(sql, obj[key], function(error, results, fields) {
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
		var sql = "update prod set ";
		var id = obj.prodid;
		delete obj["prodid"];
		Object.keys(obj).forEach(function(key, i) {
			if(i > 0)
				sql += ",";
			sql += key + " =? ";

		});
		sql += " where prodid=" + id;

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
		var sql = "update prod set ";
		var id = obj.prodid;
		delete obj["prodid"];
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

	adddata(obj, callback) {
		var sql = "update prod set ";
		var prodid = obj.prodid;
		delete obj["prodid"];
		Object.keys(obj).forEach(function(key, i) {
			if(i > 0)
				sql += ",";
			sql += key + "=" + key + "+? ";

		});
		sql += " where prodid=" + prodid;

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
		var sql = "delete from prod where prodid=?"
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
module.exports = prod;