<template>
	<div class="tmpl home">
		<header>
			<div class="center">
				<div class="fdj iconfont icon-sousuo1"></div>
				<input class="search" type="text" placeholder="搜索" />
				<a href="#" class="header_icon">
					<span class="iconfont icon-xiaoxi"></span>
				</a>
				<a href="#" class="header_icon">
					<span class="iconfont icon-gouwuche1"></span>
				</a>

			</div>

		</header>
		<mt-swipe :auto="4000" class="swipe">
			<mt-swipe-item><img src="../../static/img/banner1.jpg" /></mt-swipe-item>
			<mt-swipe-item><img src="../../static/img/banner2.jpg" /></mt-swipe-item>
			<mt-swipe-item><img src="../../static/img/banner1.jpg" /></mt-swipe-item>
			<mt-swipe-item><img src="../../static/img/banner2.jpg" /></mt-swipe-item>
		</mt-swipe>
		<!--图标选项区域-->
		<ul class="icon_btn clearfix">
			<li>
				<a href="#">
					<span class="iconfont icon-remenshangpin"></span>
					<span>热门商品</span>
				</a>
			</li>
			<li>
				<a href="#">
					<span class="iconfont icon-yooxi"></span>
					<span>新款推荐</span>
				</a>
			</li>
			<li>
				<a href="#">
					<span class="iconfont icon-yushou-huang"></span>
					<span>预售款</span>
				</a>
			</li>
			<li>
				<a href="#">
					<span class="iconfont icon-fendi_shuangjianbao"></span>
					<span>双肩包</span>
				</a>
			</li>
			<li>
				<a href="#">
					<span class="iconfont icon-dabaozhuang"></span>
					<span>大包&小包</span>
				</a>
			</li>
			<li>
				<a href="#">
					<span class="iconfont icon-qianbao"></span>
					<span>钱包&手机</span>
				</a>
			</li>
			<li>
				<a href="#">
					<span class="iconfont icon-prada_danjianbao"></span>
					<span>单肩包</span>
				</a>
			</li>
			<li>
				<a href="#">
					<span class="icon iconfont icon-gucci_shoutibao"></span>
					<span>手提包</span>
				</a>
			</li>

		</ul>

		<!--每日新款-->
		<div class="new_pattern">
			<img src="../../static/img/hometit1.jpg" alt="" />
			<ul class="new_pattern_list clearfix">
				<li>
					<a href="#">
						<img src="../../static/img/list-ph01.png" />
						<p>
							青少年休闲修身上衣啦啦啦啦啦啦啦啦啦
						</p>
						<b>¥168</b>
						<span>库存：111</span>
					</a>
				</li>
				<li>
					<a href="#"><img src="../../static/img/list-ph01.png" />
						<p>
							青少年休闲修身上衣啦啦啦啦啦啦啦啦啦
						</p>
						<b>¥168</b>
						<span>库存：111</span>
					</a>
				</li>
				<li>
					<a href="#"><img src="../../static/img/list-ph01.png" />
						<p>
							青少年休闲修身上衣aaaa
						</p>
						<b>¥168</b>
						<span>库存：111</span>
					</a>
				</li>
				<li>
					<a href="#"><img src="../../static/img/list-ph01.png" />
						<p>
							青少年休闲修身上衣aaaa
						</p>
						<b>¥168</b>
						<span>库存：111</span>
					</a>
				</li>
			</ul>
		</div>
		<bottomnav></bottomnav>
	</div>
</template>

<script>
	export default {
		data() {
			return {}
		},
		created() {

		}
	}
</script>

<style scoped="scoped">
	@import "../../static/css/home.css"
</style>