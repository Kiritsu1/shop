var express = require('express')
var router = express.Router();
var Order = require("../modules/order");
var Prod = require("../modules/prod");

router.post('/addorder', function(req, res) {
	var body = req.body;
	body.add_time = new Date();
	Order.insert(body)
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

router.post('/addmoreOrder', function(req, res) {
	//添加多条记录 ，参数为一个obj的arr
	var objArr = req.body.paramsArr;
	objArr.forEach((e, index) => {
		objArr[index] = JSON.parse(e);
		objArr[index].add_time = new Date();
	})
	Order.insertmore(
			objArr
		)
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
			console.log(err)
			res.json({
				status: 1,
				message: 'Internal error.',
				err: err
			})
		})
})

router.get('/getOrderByid/:id', function(req, res) {
	//	   /:id形式的参数存储在req.param里面
	var id = req.params.id;
	Order.find({
			orderid: id
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

router.post('/getOrder', function(req, res) {

	var body = req.body;
	var orderList = []
	Order.find(body)
		.then(data => {
			orderList = data;
			var ids = [];
			data.forEach(e => {
				ids.push(e.prodid);
			})
		if(ids[0]!=null)
			return Prod.findbymore({
				prodid: ids
			})
		else{
			return [];
		}
		})
		.then((prods) => {
			orderList.forEach((e, index) => {
				prods.forEach(p => {
					if(e.prodid == p.prodid) {
						orderList[index].prod = JSON.stringify(p)
					}
				})
			})
			if(orderList.length == 0) {
				res.json({
					status: 2,
					message: "data not exit",
				})
			} else {
				res.json({
					status: 0,
					message: orderList
				})
			}
		}).catch(err => {
			console.log(err)
			res.json({
				status: 1,
				message: 'Internal error.',
				err: err
			})
		})

})

router.post('/updateOrder', function(req, res) {
	var body = req.body;

	Order.update(body)
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
	Order.delete(body)
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