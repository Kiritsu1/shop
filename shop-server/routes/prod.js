var express = require('express')
var router = express.Router();
var Prod = require("../modules/prod");
var md5 = require('md5')
const formidable = require('formidable');
const path = require('path');
const fs = require('fs');

router.post('/addprod', function(req, res) {
	var body = req.body;
	body.add_time = new Date();
	Prod.insert(body)
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

router.get('/getprodByid/:id', function(req, res) {
	//	   /:id形式的参数存储在req.param里面
	var id = req.params.id;
	Prod.find({
			prodid: id
		})
		.then((prod) => {

			if(prod.length == 0) {
				res.json({
					status: 2,
					message: "prod not exit",
				})
			} else {
				res.json({
					status: 0,
					message: prod
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

router.post('/getprodByids', function(req, res) {
	//	   /:id形式的参数存储在req.param里面

	var ids = req.body.ids
	var idsArr = JSON.parse(ids)
	Prod.findbymore({
			prodid: idsArr
		})
		.then((prod) => {

			if(prod.length == 0) {
				res.json({
					status: 2,
					message: "prod not exit",
				})
			} else {
				res.json({
					status: 0,
					message: prod
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

router.post('/getprod', function(req, res) {
	//	   /:id形式的参数存储在req.param里面
	var body = req.body;
	Prod.find(body)
		.then((shop) => {
			if(shop.length == 0) {
				res.json({
					status: 2,
					message: "prod not exit",
				})
			} else {
				res.json({
					status: 0,
					message: shop
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

router.post('/addnumberinprod', function(req, res) {
	var body = req.body;
	Prod.adddata(body)
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

router.post('/updateprod', function(req, res) {
	var body = req.body;

	Prod.update(body)
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

router.post('/deleteprod', function(req, res) {
	var body = req.body;
	Prod.delete(body)
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

router.post('/upload', (req, res) => {
	var form = new formidable.IncomingForm();
	//为了能更好的保存文件在本地服务器目录
	form.uploadDir = path.join(__dirname, '../public/img');

	form.keepExtensions = true; //上传后保留扩展名
	//解析请求
	form.parse(req, function(err, fields, files) {
		console.log(files.file.path)
		var p = path.basename(files.file.path); //获取图片名字

		console.log('上传文件完毕');
		if(err) res.json({
			status: 1,
			message: err
		})
		else
			res.json({
				status: 0,
				message: {
					filename: p
				},
				err: err
			})
	});
})

module.exports = router