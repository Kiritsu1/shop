var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')
var session = require('express-session')
var userRouter = require('./routes/user')
var walletRouter = require('./routes/wallet')
var shopRouter = require('./routes/shop')
var ProdRouter = require('./routes/prod')
var SortRouter = require('./routes/sort')
var OrderRouter = require('./routes/order')
var MDRouter = require('./routes/money_detail')
//var articleRouter = require('./routes/article')
//var goodsRouter = require('./routes/goods')
//var commentsRouter = require('./routes/comments')

var app = express()

app.use('/public/', express.static(path.join(__dirname, './public/')))
app.use('/node_modules/', express.static(path.join(__dirname, './node_modules/')))
app.engine('html', require('express-art-template'))
app.set('views', path.join(__dirname, './views/'))
app.use(bodyParser.urlencoded({
	extended: false
}))
app.use(bodyParser.json())

//跨域
//app.all('*', function(req, res, next) {
//  res.header("Access-Control-Allow-Origin", "*");
//  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
//  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
//  res.header("X-Powered-By",' 3.2.1')
//	next();
//});

app.use(userRouter);
app.use(walletRouter);
app.use(shopRouter);
app.use(ProdRouter);
app.use(SortRouter);
app.use(OrderRouter);
app.use(MDRouter);
//app.use(articleRouter);
//app.use(goodsRouter);
//app.use(commentsRouter);

app.listen(5000, function() {
	console.log('running on port 5000...');
})