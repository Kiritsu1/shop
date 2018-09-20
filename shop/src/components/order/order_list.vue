<template>
	<div class="order_list tmpl">
		<myheader title="我的订单"></myheader>
		<ul class="ordercardlist">
			<li class="" v-for="(order,i) in orderList">
				<div class="order_title">
					<span class="time">{{order.add_time|convertDate}}</span>
					<span class="state">{{prodState[order.state]}}</span>
				</div>
				<div class="order_center clearfix">
					<div class="order_center_left">
						<img :src="order.prod.img_url" alt="" />

					</div>
					<div class="order_center_right">
						<p class="ellipsis2">{{order.prod.prodname}}</p>
						<p>{{order.prod.other}}</p>
						<p>¥{{order.prod.sell_price}}</p>
						<p>x{{order.num}}</p>
					</div>

				</div>
				<div class="sum">
					<span>¥{{order.num*order.prod.sell_price*order.prod.discount}}</span>
					<p>商品总额</p>

				</div>
				<div class="btns clearfix">
					<mt-button type="danger" class="gopayment" v-if="order.state==0" @click.prevent='goOrder(i)'>去支付</mt-button>
					<mt-button type="danger" class="confirm_receipt" v-if="order.state==2" @click.prevent='confirmReceipt(order.orderid)'>确认收货</mt-button>
					<mt-button type="default" class="refund" v-if="order.state==1||order.state==2" @click.prevent='refund(order.orderid)'>申请退款</mt-button>
					<mt-button type="default" class="order_detail" plain v-if="order.state==1||order.state==2">物流信息</mt-button>
					<mt-button type="default" class="order_detail" plain>订单详情</mt-button>

				</div>
			</li>
		</ul>
	</div>

</template>

<script>
	import prodState from '../../static/vendor/prodState.json'
	export default {
		data() {
			return {
				prodState,
				orderList: ''
			}
		},
		created() {
			this.load();

		},

		methods: {
			load() {
				var params = {
					u_id: this.getUid
				};
				if(this.$route.query.state != null) {
					params.state = this.$route.query.state;
				}
				this.$ajax.post("/my/getOrder/", params).then(data => {
						data = data.data
						if(data.status == 0) {
							this.orderList = data.message;
							var ids = [];
							this.orderList.forEach(e => {
								e.prod = JSON.parse(e.prod)
							})
						} else if(data.status == 2) {
							this.orderList = '';
						} else {
							console.log(data)
						}
					})
					.catch(err => {
						console.log(err)
					})
			},
			confirmReceipt(orderid) {
				this.$ajax.post('/my/updateOrder', {
					orderid,
					state: 3
				}).then(data => {
					data = data.data;
					this.load();
					this.$toast({
						message: '收货成功',
						position: 'center',
						duration: 1000
					});

				})
			},
			refund(orderid) {
				this.$ajax.post('/my/updateOrder', {
					orderid,
					state: 4
				}).then(data => {
					data = data.data;
					this.load();
					this.$toast({
						message: '已申请',
						position: 'center',
						duration: 1000
					});

				})
			},
			goOrder(i) {
				var order = this.orderList[i];
				this.$router.push({
					name: "order",
					query: {
						payment: {
							num: order.num,
							sum: order.sum
						},
						orderid:order.orderid,
						order:order
					}
				})

			}
		},

		computed: {
			getUid() {
				return this.$store.getters['loginedUser/getUid'];
			}
		}
	}
</script>

<style scoped>
	@import url("../../static/css/order_list.css");
</style>