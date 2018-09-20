<template>
	<div class="shopcart">
		<header class="mint-header">
			<div class="mint-header-button is-left">
				<a href="#/" class="is-selected">
					<button class="mint-button mint-button--default mint-button--normal">
						<span class="mint-button-icon"><i class="mintui mintui-back"></i></span>
					</button>
				</a>
			</div>
			<h1 class="mint-header-title">购物车</h1>
			<div class="mint-header-button is-right">
				<button class="mint-button mint-button--default mint-button--normal" @click="showcartcontro=!showcartcontro">
					<label class="mint-button-text">管理</label>
				</button>
			</div>
		</header>
		<transition name="cart-contro">
			<div class="cart-contro clearfix" v-if="showcartcontro">
				<mt-button type="danger" size="small" plain @click="del">删除</mt-button>
				<mt-button type="danger" size="small" plain>移入收藏夹</mt-button>
			</div>
		</transition>
		<div class="shopcartList">
			<ul>
				<li v-for="(prod,index) in prodList" :key="prod.prodid">
					<div :class="['myswitch',{'isPicked':prod.isPicked}]" @click="prod.isPicked=!prod.isPicked">
						<input type="checkbox" v-model="prod.isPicked" />
					</div>
					<img :src="prod.img_url">

					<div class="pay-contro">
						<p>{{prod.prodname}}</p>
						<i>{{prod.other}}</i>
						<span>￥{{prod.sell_price*prod.discount}}</span>
						<div class="contro">
							<span @click="add(index)">+</span>
							<span>{{prod.num}}</span>
							<span @click="sub(index)">-</span>
						</div>
					</div>
				</li>

			</ul>
		</div>
		<div class="cartfooter">
			<div class="selectAll">
				<div :class="['myswitch',{'isPicked':pickall}]" @click="pickall=!pickall">
					<input type="checkbox" v-model="pickall" />
				</div>
				<span>全选</span>
			</div>
			<div class="sum">
				<p>合计:<b>{{payment.sum}}</b></p>
			</div>
			<mt-button type="danger" size="large" @click="goOrder()">去结算({{payment.num}})</mt-button>

		</div>
		<p v-if="cartIsEmpty" class="cartIsEmpty">
			购物车里什么也没有
		</p>
		<bottomnav></bottomnav>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				cartIsEmpty: false,
				prodList: [],
				pickall: false,
				showcartcontro: false
			}
		},
		created() {
			let prods = this.$prodtools.getProds();
			//判断如果没有商品，则return

			if(JSON.stringify(prods) == "{}") {
				this.cartIsEmpty = true
				return
			}

			let ids = JSON.stringify(Object.keys(prods))
			this.$ajax.post("/my/getprodByids", {
				ids
			}).then(data => {
				data = data.data.message;
				data.forEach(el => {
					this.$set(el, 'num', prods[el.prodid])
					this.$set(el, 'isPicked', true)
				})
				this.prodList = data;
			})
		},
		methods: {

			add(i) {
				this.prodList[i].num++;
				//				connect.$emit('addShopcart', 1);
				this.$prodtools.addOrUpdate({
					prodid: this.prodList[i].prodid,
					num: 1 //如果存在就追加1  ，否则就设置为1
				})
			},
			sub(i) {
				if(this.prodList[i].num <= 1) return //如果数量为1则中断执行
				this.prodList[i].num--;
				//				connect.$emit('addShopcart', -1)
				this.$prodtools.addOrUpdate({
					prodid: this.prodList[i].prodid,
					num: -1
				})
			},
			del() {
				this.$messagebox.confirm('确认要删除该商品吗', '提示', {
					confirmButtonText: '确认',
					cancelButtonText: '取消'
				}).then(action => {
					this.prodList.forEach((e, i) => {
						if(e.isPicked == true) {
							this.$prodtools.delete(e.prodid)
							this.prodList.splice(i, 1);
						}
					})
					//				connect.$emit("addShopcart", -goods.num)
					let prods = this.$prodtools.getProds();
					if(JSON.stringify(prods) == "{}") {
						this.cartIsEmpty = true
						return
					}
				}).catch(err => {});

			},

			goOrder() {
				if(this.$store.getters['loginedUser/getUsername']) {
					var params = [];
					this.prodList.forEach(e => {
						
					})
//					this.$ajax.post("/my/addmoreOrder", )
					this.$router.push({
						name: "order",
						query: {
							payment: this.payment,
							prodList: this.prodList,
							from: "cart"
						}
					})
				} else {
					this.$messagebox.confirm('结算前请登录，是否跳转到登录页面', '提示', {
						confirmButtonText: '是',
						cancelButtonText: '否'
					}).then(action => {
						this.$router.push({
							name: "user",
						})
					}).catch(err => {});
				}

			}
		},
		computed: {
			payment() { //如果商品没有被选中，遍历数组中，哪些商品被选中，如果被选中，计算总金额\n
				//将总金额累计
				let num = 0; //总件数
				let sum = 0; //总价格
				this.prodList.forEach(el => {
					if(el.isPicked) {
						sum += el.num * el.sell_price * el.discount;
						num += el.num;
					}
				})
				return {
					num,
					sum
				}
			}

		},
		watch: {
			pickall: function(newval, oldval) {
				this.prodList.forEach(e => {
					e.isPicked = newval;
				})
			}
		}
	}
</script>

<style scoped>
	@import url("../../static/css/shopcart.css");
</style>