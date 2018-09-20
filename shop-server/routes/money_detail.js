var express = require('express')
var router = express.Router();
var Money_detail = require("../modules/money_detail");

router.post('/addMoneyDetail', function(req, res) {
	var body = req.body;
	body.time = new Date();
	Money_detail.insert(body)
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

router.get('/getMDByid/:id', function(req, res) {
	//	   /:id形式的参数存储在req.param里面
	var md_id = req.params.id;
	Money_detail.find({
			md_id: md_id
		})
		.then((data) => {

			if(data.length == 0) {
				res.json({
					status: 2,
					message: "data not exit",
				})
			} else {
				res.json({
					status: 0,
					message: data
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

router.post('/getMD', function(req, res) {

	var body = req.body
	Money_detail.find(body)
		.then((data) => {

			if(data.length == 0) {
				res.json({
					status: 2,
					message: "data not exit",
				})
			} else {
				res.json({
					status: 0,
					message: data
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

router.post('/updateMD', function(req, res) {
	var body = req.body;

	Money_detail.update(body)
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

router.post('/deleteMD', function(req, res) {
	var body = req.body;
	Money_detail.delete(body)
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