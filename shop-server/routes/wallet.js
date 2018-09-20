var express = require('express')
var router = express.Router();
var Wallet = require("../modules/wallet");
var md5 = require('md5')

router.post('/addwallet', function(req, res) {
	var body = req.body;
	var flag = false //账号是否存在
	//如果此账号已经注册则终止运行
	Wallet.find({
		u_id: body.id
	}).then((data) => {
		if(data.length != 0) {
			flag = true;
		} else {
			return Wallet.insert(body)
		}

	}).then((data) => {
		if(flag) {
			res.json({
				status: 2,
				message: 'id already exists'
			})
		} else
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

router.get('/getwalletById/:id', function(req, res) {
	//	   /:id形式的参数存储在req.param里面
	var id = req.params.id;
	Wallet.find({
			u_id: id
		})
		.then((wallet) => {
			if(wallet.length == 0) {
				res.json({
					status: 2,
					message: "user not exit",
				})
			} else {
				res.json({
					status: 0,
					message: wallet
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

router.post('/Recharge', function(req, res) {

	var body = req.body;
	Wallet.adddata(body)
		.then((data) => {

			res.json({
				status: 0,
				message: data
			})
		}).catch((err) => {
			res.json({
				status: 1,
				message: 'Internet error.',
				err: err
			})
		})
})

router.post('/delteWallet', function(req, res) {
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

module.exports = router