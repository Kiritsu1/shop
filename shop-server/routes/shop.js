var express = require('express')
var router = express.Router();
var Shop = require("../modules/shop");
var md5 = require('md5')

router.post('/addshop', function(req, res) {
	var body = req.body;

	Shop.insert(body)
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

router.get('/getshopByuid/:uid', function(req, res) {
	//	   /:id形式的参数存储在req.param里面
	var id = req.params.uid;
	Shop.find({
			u_id: id
		})
		.then((shop) => {
			if(shop.length == 0) {
				res.json({
					status: 2,
					message: "shop not exit",
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

router.post('/addsellcount', function(req, res) {
	var body = req.body;
	Shop.adddata({
			id: body.id,
			sellcount: body.sellcount
		})
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

router.post('/delteshop', function(req, res) {
	var body = req.body;
	Shop.delete(body)
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