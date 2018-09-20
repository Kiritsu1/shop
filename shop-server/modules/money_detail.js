const query = require('./mysql_pool')

var money_detail = {

	insert(body, callback) {
		var sql = "INSERT INTO  ";
		var sql2 = " money_detail(";
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
		var sql = "select * from money_detail where ";
		console.log(obj)
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
		var sql = "update money_detail set ";
		var md_id = obj.md_id;
		delete obj["orderid"];
		Object.keys(obj).forEach(function(key, i) {
			if(i > 0)
				sql += ",";
			sql += key + " =? ";

		});
		sql += " where md_id=" + md_id;

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
		var sql = "delete from money_detail where md_id=?"
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
}
module.exports = money_detail;