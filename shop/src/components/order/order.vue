<template>
	<div class="order tmpl">
		<myheader title="确认支付"></myheader>
		<div class="address">
			<router-link :to="{name:'address'}">
				<span class="address_left iconfont icon-dizhi"></span>
				<div class="address_center">
					<p>收货人：某某某</p>
					<p>收货地址：江西省南昌市江西省南昌市江西省南昌市江西省南昌市</p>
					<span class="phone">13000000000</span>

				</div>
				<span class="address_right iconfont2 icon-previewright"></span>
			</router-link>

		</div>
		<ul class="order_info">
			<li v-for="prod in orderList" :key="prod.u_id">
				<router-link :to="{name:'product', query:{prodid:prod.prodid}}" class="goods clearfix">
					<div class="left">
						<img :src="prod.img_url" />
					</div>
					<div class="right">
						<p class="ellipsis2">{{prod.prodname}}</p>
						<p>{{prod.other}}</p>
						<p>¥{{prod.sell_price*prod.discount}}</p>
						<p>x{{prod.num}}</p>
					</div>
				</router-link>
			</li>

			<li>
				<a href="#" class="other">
					<span>运费</span>
					<p>¥10.00</p>
				</a>
			</li>
			<li>
				<a href="#" class="other">
					<span>买付款（含运费）</span>
					<p>¥{{payment.sum}}</p>
				</a>
			</li>
			<li>
				<div href="#" class="comments">
					<p>留言</p>
					<textarea name="comments" rows="" cols="" placeholder="输入留言"></textarea>
				</div>
			</li>

		</ul>

		<div class="orderfooter">
			<div class="sum">
				<p>合计:<b>{{payment.sum}}</b></p>
			</div>

			<mt-button type="danger" size="large" :disabled="!isMoneyEnough" @click="subOrder">提交订单({{payment.num}})</mt-button>
		</div>
	</div>

</template>

<script>
	export default {
		data() {
			return {
				orderList: [],
				payment: {},
				user: {},
				isMoneyEnough: false,
				wallet: {}
			}
		},
		created() {
			this.payment = this.$route.query.payment;

			this.payment.sum += 10;
			//如果是对已有订单进行付款
			if(this.$route.query.orderid != null) {
				var order = this.$route.query.order;
				this.orderList.push(order.prod)
				this.orderList[0].sum = order.sum;
				this.orderList[0].orderid = order.orderid;
			} else {
				this.$route.query.prodList.forEach(el => {
					if(el.isPicked == true) {
						this.orderList.push(el)
					}
				})

				this.user = this.getUsername;

			}
			this.$ajax.get("/my/getwalletById/" + this.getUid).then(data => {
				data = data.data.message[0];
				this.wallet = data;
				if(this.wallet.money > this.payment.sum) {

					this.isMoneyEnough = true
				}
			})
		},

		methods: {

			subOrder() {
				var paramsArr = [];
				this.orderList.forEach(e => {
					let obj = {
						u_id: this.getUid,
						shopid: e.shopid,
						prodid: e.prodid,
						state: 1,
						num: e.num,
						sum: e.num * e.sell_price * e.discount,
						addressid: 1
					};

					paramsArr.push(JSON.stringify(obj))

				})
				this.$messagebox.confirm('是否确定付款', '提示', {
					confirmButtonText: '是',
					cancelButtonText: '否'
				}).then(action => {

					if(this.orderList[0].orderid != null && this.orderList[0].orderid != '') {
						this.$ajax.post('/my/updateOrder', {
							orderid: this.orderList[0].orderid,
							state: 1
						})
					} else {
						this.$ajax.post("/my/addmoreOrder", {
							paramsArr
						})
					}

					this.$ajax.all([
							this.$ajax.post("/my/Recharge", {
								u_id: this.getUid,
								money: -this.payment.sum
							}),
							this.$ajax.post("/my/Recharge", {
								u_id: this.getUid,
								alreadysettled: this.payment.sum
							}),
							this.$ajax.post("/my/addMoneyDetail", {
								u_id: this.getUid,
								changenumber: -this.payment.sum,
								changeOrigin: "购物"
							})

						])
						.then(this.$ajax.spread((res1, res2, res3) => {
							var arg = [];
							arg.push(res1);
							arg.push(res2);
							arg.push(res3);
							arg.forEach((e, i) => {
								if(e.data.status != 0) {
									console.log(e.data + "第" + i + "个")
								}

							})

							if(this.$route.query.from == "cart") {
								this.$prodtools.clear();
							}

							this.$router.push({
								name: "success"
							})
						}))
						.catch(err => {
							console.log(err);
						})
				}, err => {
					paramsArr.forEach((e, i) => {
						let obj = JSON.parse(e);
						obj.state = 0;
						paramsArr[i] = JSON.stringify(obj);
					})

					this.$ajax.all([
							this.$ajax.post("/my/addmoreOrder", {
								paramsArr
							}), this.$ajax.post("/my/Recharge", {
								u_id: this.getUid,
								foraccount: this.payment.sum
							}),
						])
						.then(this.$ajax.spread((res1, res2) => {

							if(res1.data.status == 0 && res2.data.status == 0)
								this.$router.push({
									name: "shopcart"
								})
							else {
								console.log(data.data)
							}
						}))
						.catch(err => {
							console.log(err);
						})

				})

			}

		},
		computed: {
			getUsername() {
				return this.$store.getters['loginedUser/getUsername'];
			},
			getUid() {
				return this.$store.getters['loginedUser/getUid'];

			}
		}
	}
</script>

<style scoped>
	@import url("../../static/css/order.css");
</style>