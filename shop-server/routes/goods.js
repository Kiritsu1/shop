var express = require('express')
var router = express.Router();
var Goods = require("../models/goods")
router.all('*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	next();
});

router.get('/getgoodlist', function(req, res) {
	Goods.find()
		.then((data) => {
			res.json({
				status: 0,
				message: data
			})
		}).catch(err => {
			res.json({
				status: 1,
				message: 'Internal error.',
				err: err
			}) 
		})
})

router.post('/addGood', function(req, res) {
	var body = req.body;
	new Goods(body).save().then((data) => {
		res.json({
			status: 0,
			message: 'ok'
		})
	}).catch((err) => {
		res.json({
			status: 1,
			message: 'Internet error.',
			err: err
		})
	})
})

router.get('/getGood/:_id', function(req, res) {
	var _id = req.params._id.replace(/"/g, '')
	Goods.findById(_id)
		.then((data) => {
			res.json({
				status: 0,
				message: data
			})
		}).catch(err => {
			res.json({
				status: 1,
				message: 'Internal error.',
				err: err
			})
		})
})

router.post('/getGoodsByIds', function(req, res) {
	var body = req.body;
	var ids = JSON.parse(body.ids)
	Goods.find({
			_id: {
				$in: ids
			}
		})
		.then((data) => {
			res.json({
				status: 0,
				message: data
			})
		}).catch(err => {
			res.json({
				status: 1,
				message: 'Internal error.',
				err: err
			})
		})
})

router.get('/deleteGood/:_id', function(req, res) {
	var _id = req.params._id.replace(/"/g, '')
	Goods.remove({
		_id: _id
	}).then(() => {
		res.json({
			status: 0,
			message: 'delete success.'
		})
	}).catch(err => {
		res.json({
			status: 1,
			message: 'Internal error.',
			err: err
		})
	})
})

router.post('/updateGood', function(req, res) {
	var body = req.body;
	Goods.update({
			_id: body._id
		}, body)
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

router.get('/goodInit', function(req, res) {
	Goods.insertMany([{
		img_url: 'http://localhost:5000/public/img/goodsimg1.jpg',
		market_price: 7000,
		sell_price: 6000,
		stock_quantity: 10,
		title: "12期免息 Samsung/三星 Galaxy S9+ SM-G9650/DS 全网通 手机"
	}, {
		img_url: 'http://localhost:5000/public/img/goodsimg2.png',
		market_price: 5599,
		sell_price: 5568,
		stock_quantity: 10,
		title: "Hasee/神舟 战神 Z7-KP7D2/Z7-KP7GT/T7-X7/Z7M-KP7G1/Z7-KP7GC"
	}, {
		img_url: 'http://localhost:5000/public/img/goodsimg3.png',
		market_price: 6930,
		sell_price: 6630,
		stock_quantity: 100,
		title: "Apple/苹果 iPhone 8 Plus"
	}, {
		img_url: 'http://localhost:5000/public/img/goodsimg4.png',
		market_price: 769,
		sell_price: 669,
		stock_quantity: 80,
		title: "送大礼 Cherry樱桃G80-3000 3494机械键盘黑轴红轴茶轴青轴静音轴"
	}]).then((data) => {
		res.json({
			status: 0,
			message: 'ok'
		})
	}).catch((err) => {
		res.json({
			status: 1,
			message: 'Internet error.',
			err: err
		})
	})
})

router.get('/clearGoods', function(req, res) {
	Goods.remove({}).then(() => {
		res.json({
			status: 0,
			message: 'clearGoods.'
		})
	})
})

module.exports = router