var express = require('express')
var router = express.Router();
var User = require("../modules/user");
var Wallet = require("../modules/wallet");
var Shop = require("../modules/shop");
var md5 = require('md5')

router.post('/reg', function(req, res) {
	var body = req.body;
	var flag = false //账号是否存在
	//如果此账号已经注册则终止运行
	User.find({
			username: body.username
		}).then((data) => {
			if(data.length != 0) {
				flag = true;
			} else {
				body.password = md5(body.password)

				return User.insert(body)
			}

		})
		.then((data) => {
			if(flag) {
				res.json({
					status: 2,
					message: 'username already exists'
				})
			} else {
				Wallet.insert({
					u_id: data.insertId,
					money: 0,
					foraccount: 0,
					alreadysettled: 0
				})

				Shop.insert({
					u_id: data.insertId
				})

				res.json({
					status: 0,
					message: data
				})
			}
		})
		.catch((err) => {
			console.log(err)
			res.json({
				status: 1,
				message: 'Internet error.',
				err: err
			})
		})
})

router.post('/login', function(req, res) {
	var body = req.body;
	body.password = md5(body.password)
	User.find(body, function(result, err) {
		if(err) {
			console.log(err)
			res.json({
				status: 1,
				message: "error",
			})
		} else if(result.length == 0) {
			res.json({
				status: 2,
				message: "user or password is wrong",
			})
		} else {
			result[0].password = "";
			res.json({
				status: 0,
				message: result,
			})
		}

	})
})

router.get('/getUserById/:id', function(req, res) {
	//	   /:id形式的参数存储在req.param里面
	var id = req.params.id;
	User.find({
			u_id: id
		})
		.then((user) => {
			if(user.length == 0) {
				res.json({
					status: 2,
					message: "user not exit",
				})
			} else {
				res.json({
					status: 0,
					message: user
				})
			}
		}).catch(err => {
			res.json({
				status: 1,
				message: 'Internal error.',
				err: err
			})
		})
})

router.post('/updateUser', function(req, res) {
	var body = req.body;
	if(body.password)
		body.password = md5(body.password)
	User.update(body)
		.then((data) => {
			res.json({
				status: 0,
				message: data
			})
		}).catch((err) => {
			console.log(err)
			res.json({
				status: 1,
				message: 'Internet error.',
				err: err
			})
		})
})

//router.post('/Recharge', function(req, res) {
//	var body = req.body;
//	Users.update({
//			_id: body._id
//		}, {
//			"$inc": {
//				"money": body.money
//			}
//		})
//		.then((data) => {
//			res.json({
//				status: 0,
//				message: data
//			})
//		}).catch((err) => {
//			res.json({
//				status: 1,
//				message: 'Internet error.',
//				err: err
//			})
//		})
//})

router.post('/delteUser', function(req, res) {
	var body = req.body;
	User.delete(body)
		.then((data) => {
			res.json({
				status: 0,
				message: data
			})
		}).catch((err) => {
			console.log(err)
			res.json({
				status: 1,
				message: 'Internet error.',
				err: err
			})
		})
})

router.get('/clearUsers', function(req, res) {
	User.remove({}).then(() => {
		res.json({
			status: 0,
			message: 'clearUsers.'
		})
	})
})

module.exports = router