<template>
	<div class="tmpl clearfix sort">
		<header>
			<div class="center">
				<div class="fdj iconfont icon-sousuo1"></div>
				<input class="search" type="text" placeholder="搜索" />
				<mt-button size="small" class="searchBtn">搜索</mt-button>
			</div>
		</header>
		<div class="prodSortBox">
			<mt-navbar v-model="selected" class="prodSort">
				<mt-tab-item id="1">热门商品</mt-tab-item>
				<mt-tab-item id="2">新款推荐</mt-tab-item>
				<mt-tab-item id="3">预售款</mt-tab-item>
				<mt-tab-item id="4">双肩包</mt-tab-item>
				<mt-tab-item id="5">热门商品</mt-tab-item>
				<mt-tab-item id="6">新款推荐</mt-tab-item>
				<mt-tab-item id="7">预售款</mt-tab-item>
				<mt-tab-item id="8">双肩包</mt-tab-item>
				<mt-tab-item id="1">热门商品</mt-tab-item>
				<mt-tab-item id="2">新款推荐</mt-tab-item>
				<mt-tab-item id="3">预售款</mt-tab-item>
				<mt-tab-item id="4">双肩包</mt-tab-item>
				<mt-tab-item id="5">热门商品</mt-tab-item>
				<mt-tab-item id="6">新款推荐</mt-tab-item>
				<mt-tab-item id="7">预售款</mt-tab-item>
				<mt-tab-item id="8">双肩包</mt-tab-item>
			</mt-navbar>
		</div>
		<mt-tab-container v-model="selected" class="prodList">
			<mt-tab-container-item id="1">
				<a href="#"><img src="../../static/img/list-ph01.png" />
					<p>
						1青少年休闲修身上衣aaaa
					</p>
					<b>¥168</b>
					<span>库存：111</span>
				</a>
				<a href="#"><img src="../../static/img/list-ph01.png" />
					<p>
						1青少年休闲修身上衣aaaa
					</p>
					<b>¥168</b>
					<span>库存：111</span>
				</a>
					<a href="#"><img src="../../static/img/list-ph01.png" />
					<p>
						1青少年休闲修身上衣aaaa
					</p>
					<b>¥168</b>
					<span>库存：111</span>
				</a>
				<a href="#"><img src="../../static/img/list-ph01.png" />
					<p>
						1青少年休闲修身上衣aaaa
					</p>
					<b>¥168</b>
					<span>库存：111</span>
				</a>	<a href="#"><img src="../../static/img/list-ph01.png" />
					<p>
						1青少年休闲修身上衣aaaa
					</p>
					<b>¥168</b>
					<span>库存：111</span>
				</a>
				<a href="#"><img src="../../static/img/list-ph01.png" />
					<p>
						1青少年休闲修身上衣aaaa
					</p>
					<b>¥168</b>
					<span>库存：111</span>
				</a>	<a href="#"><img src="../../static/img/list-ph01.png" />
					<p>
						1青少年休闲修身上衣aaaa
					</p>
					<b>¥168</b>
					<span>库存：111</span>
				</a>
				<a href="#"><img src="../../static/img/list-ph01.png" />
					<p>
						1青少年休闲修身上衣aaaa
					</p>
					<b>¥168</b>
					<span>库存：111</span>
				</a>	<a href="#"><img src="../../static/img/list-ph01.png" />
					<p>
						1青少年休闲修身上衣aaaa
					</p>
					<b>¥168</b>
					<span>库存：111</span>
				</a>
				<a href="#"><img src="../../static/img/list-ph01.png" />
					<p>
						1青少年休闲修身上衣aaaa
					</p>
					<b>¥168</b>
					<span>库存：111</span>
				</a>	<a href="#"><img src="../../static/img/list-ph01.png" />
					<p>
						1青少年休闲修身上衣aaaa
					</p>
					<b>¥168</b>
					<span>库存：111</span>
				</a>
				<a href="#"><img src="../../static/img/list-ph01.png" />
					<p>
						1青少年休闲修身上衣aaaa
					</p>
					<b>¥168</b>
					<span>库存：111</span>
				</a>	<a href="#"><img src="../../static/img/list-ph01.png" />
					<p>
						1青少年休闲修身上衣aaaa
					</p>
					<b>¥168</b>
					<span>库存：111</span>
				</a>
				<a href="#"><img src="../../static/img/list-ph01.png" />
					<p>
						1青少年休闲修身上衣aaaa
					</p>
					<b>¥168</b>
					<span>库存：111</span>
				</a>
			</mt-tab-container-item>
			<mt-tab-container-item id="2">
				<a href="#"><img src="../../static/img/list-ph01.png" />
					<p>
						2青少年休闲修身上衣aaaa
					</p>
					<b>¥168</b>
					<span>库存：111</span>
				</a>
			</mt-tab-container-item>
			<mt-tab-container-item id="3">
				<a href="#"><img src="../../static/img/list-ph01.png" />
					<p>
						3青少年休闲修身上衣aaaa
					</p>
					<b>¥168</b>
					<span>库存：111</span>
				</a>
			</mt-tab-container-item>
			<mt-tab-container-item id="4">
				<a href="#"><img src="../../static/img/list-ph01.png" />
					<p>
						4青少年休闲修身上衣aaaa
					</p>
					<b>¥168</b>
					<span>库存：111</span>
				</a>
			</mt-tab-container-item>
			<mt-tab-container-item id="5">
				<a href="#"><img src="../../static/img/list-ph01.png" />
					<p>
						5青少年休闲修身上衣aaaa
					</p>
					<b>¥168</b>
					<span>库存：111</span>
				</a>
			</mt-tab-container-item>
			<mt-tab-container-item id="6">
				<a href="#"><img src="../../static/img/list-ph01.png" />
					<p>
						6青少年休闲修身上衣aaaa
					</p>
					<b>¥168</b>
					<span>库存：111</span>
				</a>
			</mt-tab-container-item>
			<mt-tab-container-item id="7">
				<a href="#"><img src="../../static/img/list-ph01.png" />
					<p>
						7青少年休闲修身上衣aaaa
					</p>
					<b>¥168</b>
					<span>库存：111</span>
				</a>
			</mt-tab-container-item>
			<mt-tab-container-item id="8">
				<a href="#"><img src="../../static/img/list-ph01.png" />
					<p>
						8青少年休闲修身上衣aaaa
					</p>
					<b>¥168</b>
					<span>库存：111</span>
				</a>
			</mt-tab-container-item>
		</mt-tab-container>
		<bottomnav></bottomnav>
		
	</div>

</template>

<script>
	export default {
		data() {
			return {
				selected: "1",
				flag: true
			}
		},
		created() {}
	}
</script>

<style scoped>
	@import url("../../static/css/sort.css");
</style>