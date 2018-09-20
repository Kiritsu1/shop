var express = require('express')
var router = express.Router();
var Article = require("../models/article")
router.all('*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	next();
});

router.get('/getArticleList', function(req, res) {
	Article.find()
		.then((data) => {
			res.json({
				status: 0,
				message: data
			})
		}).catch(err => {
			res.json({
				status: 1,
				message: 'Internal error.',	err:err
			})
		})
}) 

router.get('/getArticleListByType/:type', function(req, res) {
	var type = req.params.type

	Article.find({
			type: type
		})
		.then((data) => {
			res.json({
				status: 0,
				message: data
			})
		}).catch(err => {
			res.json({
				status: 1,
				message: 'Internal error.',	err:err
			})
		})
})
router.get('/getArticleById/:_id', function(req, res) {
	var _id = req.params._id.replace(/"/g, '')
	Article.findById(_id)
		.then((data) => {
			res.json({
				status: 0,
				message: data
			})
		}).catch(err => {
			res.json({
				status: 1,
				message: 'Internal error.',	err:err
			})
		})
})
router.post('/addArticle', function(req, res) {
	var body = req.body;
	new Article(body).save().then((data) => {
		res.json({
			status: 0,
			message: 'ok'
		})
	}).catch((err) => {
		res.json({
			status: 1,
			message: 'Internet error.',
			err:err
			
		})
	})
})

router.get('/deleteArticle/:_id', function(req, res) {
	var _id = req.params._id.replace(/"/g, '')
	Article.remove({
		_id: _id
	}).then(() => {
		res.json({
			status: 0,
			message: 'delete success.'
		})
	})
})

router.post('/updateArticle', function(req, res) {
	var body = req.body;
	Article.update({
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
			err:err
				
			})
		})
})

router.get('/articleInit', function(req, res) {

	Article.insertMany([{
		img_url: '/public/img/recommend1.png',
		title: '桌面“小冰箱”，给你随时随刻的冰爽畅享',
		content: `<p>夏日里的一杯冰镇饮品，绝对是让人从内至外凉爽的最佳法宝。无奈快乐总是短暂的，冰镇饮品还没喝完就开始升温了。如果加冰的话，喝到最后总是忘记了自己喝的到底是饮品还是水。</p>
			<p>为了延长冰爽快感，同时保留饮品的原汁原味，Cupcooler快速冷却杯诞生了。它可以说是放在桌面上的冰箱，实现了冰镇饮品随时喝，想喝多久喝多久的夏日梦幻心愿。	</p>
		<p>	CupCooler比冰箱的制冷速度快6倍，60秒就能将表盘冷却至-18℃。如果饮料从25℃降温，可在10分钟内达到15℃或10℃，最低还可降到5℃，速度之快，扼杀等待的焦躁，快速畅饮冰爽。	</p>`,
		zhaiyao: '放在桌面上的冰箱，冰镇饮品随时喝，想喝多久喝多久',
		type: 'recommend'
	}, {
		img_url: '/public/img/recommend2.png',
		title: '“空调”手表，控制体温让你冬暖夏凉',
		content: `<p>夏天来临，想到烈日炎炎、汗流不止，怕热的小伙伴坐在空调房里又是心里一紧。终于熬过寒冬，难不成要热晕在夏天？别怕，今天安利的这个“空调”手表，帮你控制体温，“空调”随身带。	</p>
	<p>Aircon Watch是一款能够调整人体体温的黑科技手表，表盘下方有一个开关键与两个模式键，只需触摸一个按钮就能改变你的体温，只要设置好手表模式，就能让你感觉温度适宜。	</p>
	<p>这个小装置贴近手腕内部，因为该区域的神经组织最靠近皮肤表面这样就能可以最大程度的传达温度，手表可以在任何温度，时区使用，所以十分方便。	</p>`,
		zhaiyao: '这个“空调”手表，帮你控制体温，“空调”随身带',
		type: 'recommend'
	}, {
		img_url: '/public/img/newsimg1.jpg',
		title: '淘宝心选首次专访 用平台“数造”新品牌',
		content: `<p>很多人说为什么阿里巴巴做自有品牌了，是不是跟商家抢市场？其实想多了。”淘宝心选负责人张棣（花名：钧源）一开场就直接回应了外界的传闻。	</p>
			<p>最近， 钧源在天下网商主办的新网商营销大会亮相， 这也是淘宝心选第一次正式对外分享。而就在4月28日， 淘宝心选首家线下店开业。 淘宝心选希望， 通过提供线上线下的完整服务， 探索新零售玩法。	</p>
		<p>淘宝心选2017年年中开始线上试运营， 一直很低调。 有着十几年零售品牌业务经验的钧源告诉天下网商， 淘宝心选低调这一年， 其实是在探索一套品牌经营方法论。	</p>
		<p>据了解， 淘宝心选已经研发出一整套系统， 通过大数据能够有效地把供给侧的资源和需求侧的需求转化成更精准的开发诉求， 并且把下单、 领料、 上线、 品控、 验货、 物流、 交付等整个生产环节在线化、 可视化， 通过手机就能了解到产品所处状态。	</p>`,
		zhaiyao: "摘要1",
		type: 'news'

	}, {
		img_url: '/public/img/newsimg2.png',
		title: '微软等百余国际大牌加入阿里打假联盟',
		content: `<p>AACA是所有联盟成员的共同大家庭，我们会持续不断地投入更多资源，联合更多联盟成员打造知识产权保护的健康社会。”5月4日，阿里巴巴首席平台治理官郑俊芳在出席阿里巴巴打假联盟（以下简称AACA）春季会议时表示，希望更多权利人能为此提出丰富的想法和创意，“大家一起努力，知识产权保护这件事就没那么难了。	</p>
	<p>当天，包括Microsoft、HP、Levi's等在内的百余名权利人代表，在杭州参与了这次春季会议讨论。会上公布数据称，联盟成员目前已从去年成立初的30名创始成员扩增至105个，覆盖行业包括奢侈品、珠宝、服饰、智能设备等12个。	</p>
	<p>为加大保护知产力度，今年AACA将推多种新举措。如新增的“鉴定专案”项目中，阿里巴巴将设置专门资金，基于大数据发现的售假线索，联合权利人发起购买鉴定。	</p>`,
		zhaiyao: "摘要2",
		type: 'news'
	}]).then((data) => {
		res.json({
			status: 0,
			message: 'ok'
		})
	}).catch((err) => {
		res.json({
			status: 1,
			message: 'Internet error.',
			err:err
		})

	})
})

router.get('/clearArticle', function(req, res) {
	Article.remove({}).then(() => {
		res.json({
			status: 0,
			message: 'clearRecom.'
		})
	})
})
module.exports = router