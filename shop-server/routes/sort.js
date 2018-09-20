var express = require('express')
var router = express.Router();
var Sort = require("../modules/sort");
var md5 = require('md5')

router.post('/addsort', function(req, res) {
	var body = req.body;
	var flag = false;
	Sort.find({
			sortname: body.sortname
		}).then((data) => {
			if(data.length != 0) {
				flag = true;
			} else {
				return Sort.insert(body)
			}

		})
		.then((data) => {
			if(flag) {
				res.json({
					status: 2,
					message: 'sort already exists'
				})
			} else {
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

router.get('/getallsort', function(req, res) {
	Sort.findAll()
		.then((data) => {
			if(data.length == 0) {
				res.json({
					status: 2,
					message: "sort not exit",
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

router.get('/getsortById/:id', function(req, res) {
	//	   /:id形式的参数存储在req.param里面
	var id = req.params.id;
	Sort.find({
			sortid: id
		})
		.then((data) => {
			if(data.length == 0) {
				res.json({
					status: 2,
					message: "sort not exit",
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

router.post('/updateSort', function(req, res) {
	var body = req.body;
	Sort.update(body)
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

router.post('/delteSort', function(req, res) {
	var body = req.body;
	Sort.delete(body)
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