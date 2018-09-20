var express = require('express')
var router = express.Router();
var Comments = require("../models/comments")
router.all('*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	next();
});

router.get('/getCommentsByCid/:cid', function(req, res) {
	var cid = req.params.cid
	Comments.find({
			cid: cid
		}, {}, {
			sort: {
				add_time: -1
			},
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

router.post('/sendComment', function(req, res) {
	var body = req.body;
	new Comments(body).save().then((data) => {
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

router.get('/deleteComment/:_id', function(req, res) {
	var _id = req.params._id.replace(/"/g, '')
	Comments.remove({
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

router.get('/clearComments', function(req, res) {
	Goods.remove({}).then(() => {
		res.json({
			status: 0,
			message: 'clearComments.'
		})
	})
})

module.exports = router