<template>
	<div class="tmpl addprod">
		<myheader title="添加商品"></myheader>

		<ul class="prodmsg">
			<li>
				<mt-field label="商品标题" v-model="prodname" :state="titlestate" disableClear></mt-field>
			</li>
			<li>
				<mt-cell class="prodphoto" label="商品图片" :state="titlestate">
					<img :src="img_url" alt="" />
					<div class="upload-file">
						<input v-show="false" id="upload-file-input" type="file" class="input-file" accept="image/png,image/gif,image/jpeg" @change="uploadpic" />
						<label for="upload-file-input">上传图片</label>
					</div>
				</mt-cell>

			</li>

			<li>
				<mt-field label="市场价" placeholder="市场均价,请输入数字" v-model.trim="market_price" :state='numberstate1' disableClear></mt-field>
			</li>
			<li>
				<mt-field label="销售价" placeholder="真正销售的价格，请输入数字" v-model.trim="sell_price" :state='numberstate2' disableClear></mt-field>
			</li>
			<li>
				<mt-field label="折扣" placeholder="请输入0-1之间的数" v-model.trim="discount" disableClear></mt-field>
			</li>
			<li>
				<mt-field label="库存" placeholder="请输入数字" v-model.trim="stock" :state="numberstate3" disableClear></mt-field>
			</li>
			<li>
				<mt-cell title="商品分类" v-model="sortvalue" disableClear @click.native="toggle" is-link></mt-cell>
				<mt-popup v-model="popupVisible" position="bottom" @click.native="toggle">
					<mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
				</mt-popup>
			</li>
			<li>
				<mt-field label="其他" placeholder="其他的信息" v-model="other" disableClear></mt-field>
			</li>
			<li>
				<div href="#" class="comments">
					<p>商品描述</p>
					<textarea name="desc" rows="" cols="" placeholder="商品描述图片" v-model="descr"></textarea>
				</div>
			</li>

		</ul>
		<mt-button type="danger" size="large" @click="add" class="addbtn" v-if="{add:true,update:false}[action]">添加商品</mt-button>
		<mt-button type="danger" size="large" v-else @click="save" class="addbtn">保存修改</mt-button>
	</div>

</template>

<script>
	export default {
		data() {
			return {
				popupVisible: false,
				prodname: '',
				img_url: '',
				market_price: '',
				sell_price: '',
				discount: '',
				stock: '',
				sortid: '',
				sortvalue: '',
				sort: '',
				sortoption: [],
				slots: [{
					values: [],
					className: 'slot1',
					textAlign: 'center',
					value: '',
					defaultIndex: 1,
				}],
				descr: '',
				other: '',
				action: ''
			}
		},
		created() {

			this.$ajax.get('/my/getallsort').then(data => {
				data = data.data.message;
				this.sort = data;
				data.forEach(e => {
					this.sortoption.push(e.sortname);
				})
				this.slots[0].values = this.sortoption;
				this.slots[0].value = this.sortoption[0];
			}).then(data => {
				this.action = this.$route.query.action;
				if(this.action == 'update') {
					this.$ajax.post('/my/getprod', {
						shopid: this.$route.query.shopid,
						prodid: this.$route.query.prodid
					}).then(data => {
						data = data.data.message[0];
						this.prodname = data.prodname;
						this.img_url = data.img_url;
						this.market_price = data.market_price;
						this.sell_price = data.sell_price;
						this.stock = data.stock;
						this.discount = data.discount;
						this.other = data.other;
						this.sort.forEach(e => {
							if(e.sortid == data.sortid) {
								this.sortvalue = e.sortname;
								console.log(this.sortvalue)
							}
						})
					})
				}
			})

		},
		methods: {
			add() {
				if(this.titlestate == "success" && this.numberstate1 == "success" && this.numberstate2 == "success" && this.numberstate3 == "success" &&
					this.numberstate4 == "success") {
					this.sort.forEach(e => {
						if(e.sortname = this.sortvalue)
							this.sortid = e.sortid
					})
					this.$ajax.post("/my/addprod", {
						
						shopid: this.$route.query.shopid,
						prodname: this.prodname,
						img_url: this.img_url,
						market_price: this.market_price,
						sell_price: this.sell_price,
						discount: this.discount,
						stock: this.stock,
						sortid: this.sortid,
						descr: this.descr,
						other: this.other
					}).then(data => {
						data = data.data
						if(data.status == 0) {
							this.$messagebox('提示', '添加成功');
							this.$router.push({
								name: 'user'
							})
						} else if(data.status == 2) {
							this.$messagebox('提示', '商品已存在');

						} else {
							this.$messagebox('提示', '添加失败');

						}
					})
				} else {
					this.$messagebox('提示', '请按要求输入信息');
				}
			},
			save() {
				if(this.titlestate == "success" && this.numberstate1 == "success" && this.numberstate2 == "success" && this.numberstate3 == "success" &&
					this.numberstate4 == "success") {
					this.sort.forEach(e => {
						if(e.sortname = this.sortvalue)
							this.sortid = e.sortid
					})
					this.$ajax.post("/my/updateprod", {
						prodid:this.$route.query.prodid,
						shopid: this.$route.query.shopid,
						prodname: this.prodname,
						img_url: this.img_url,
						market_price: this.market_price,
						sell_price: this.sell_price,
						discount: this.discount,
						stock: this.stock,
						sortid: this.sortid,
						descr: this.descr,
						other: this.other
					}).then(data => {
						data = data.data
						if(data.status == 0) {
							this.$messagebox('提示', '修改成功');
							this.$router.push({
								name: 'user'
							})
						} else {
							this.$messagebox('提示', '保存失败');

						}
					})
				} else {
					this.$messagebox('提示', '请按要求输入信息');
				}
			},
			uploadpic(e) {
				var self = this;
				let file = e.target.files[0];
				let param = new FormData() // 创建form对象
				param.append('file', file, file.name) // 通过append向form对象添加数据
				param.append('chunk', '0') // 添加form表单中其他数据
				let config = {
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				}
				// 添加请求头
				this.$ajax.post('/my/upload', param, config)
					.then(data => {
						if(data.data.status == 0) {
							console.log(data.data.message);
							this.img_url = "http://localhost:5000/public/img/" + data.data.message.filename;
							this.$toast("上传成功")
						} else {
							console.log(data.data)
						}

					})
			}

			,
			onValuesChange(picker, values) {
				this.sortvalue = values[0];
			},
			toggle() {

				this.popupVisible = !this.popupVisible;
			}
		},
		computed: {
			titlestate() {
				if(this.prodname.length < 4) {
					return "error"
				} else {
					return "success"
				}
			},

			numberstate1() {
				if(!isNaN(Number(this.market_price)) && this.market_price.length >= 1) {
					return "success"

				} else {
					return "error"
				}
			},
			numberstate2() {
				if(!isNaN(Number(this.sell_price)) && this.sell_price.length >= 1) {
					return "success"

				} else {
					return "error"
				}
			},
			numberstate3() {
				if(!isNaN(Number(this.stock)) && this.stock.length >= 1) {
					return "success"

				} else {
					return "error"
				}
			},
			numberstate4() {
				if(!isNaN(Number(this.discount)) && Number(this.discount) > 0 && Number(this.discount) <= 1) {
					return "success"

				} else {
					return "error"
				}
			},
			//			sortid() {
			//				this.sort.forEach(e => {
			//					if(e.sortname = this.sortvalue)
			//						return e.sortid
			//				})
			//			}
		}
	}
</script>

<style scoped>
	@import url("../../static/css/addprod.css");
</style>