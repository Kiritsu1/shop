<template>
	<div class="tmpl add_address">
		<myheader title="添加地址"></myheader>
		<mt-field label="收件人" placeholder="请输入姓名" v-model="username" disableClear></mt-field>
		<mt-field label="手机号" placeholder="请输入手机号" type="tel" v-model="phone" disableClear></mt-field>
		<mt-cell title="所在地区" @click.prevent.native="popupVisible=!popupVisible" is-link  >
			<span >{{value[0]}} - {{value[1]}} - {{value[2]}}</span>
		</mt-cell>
		<mt-field label="详细地址" placeholder="请输入详细地址" v-model="number" disableClear></mt-field>
		<mt-cell title="设为默认">
			<mt-switch v-model="addressDefault"></mt-switch>
		</mt-cell> 
		<mt-popup v-model="popupVisible" position="bottom">
			<mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
		</mt-popup>
		<mt-button type="danger" size="large" class="add_address" @click="go('address')">确定</mt-button>

	</div>
</template>

<script>
	import pca from '../../static/vendor/pcs.json'
	export default {
		data() {
			return {
				popupVisible: false,
				username: "",
				phone: "",
				number: 1,
				addressDefault: true,
				slots: [{
					values: Object.keys(pca),
					className: 'slot1',
					textAlign: 'center',
					value:Object.keys(pca)[0],
					defaultIndex: 1,
				}, {
					divider: true,
					content: '-',
					className: 'slot2'
				}, {
					values: Object.keys(pca['北京市']),
					value:Object.keys(pca['北京市'])[0],
					className: 'slot3',
					textAlign: 'center',
				}, {
					divider: true,
					content: '-',
					className: 'slot2'
				}, {
					values: pca['北京市']["市辖区"],
					value: pca['北京市']["市辖区"][0],
					className: 'slot3',
					textAlign: 'center',
				}],

				value: [],
			}
		},
		created() {

		},
		methods: {
			go(link) {
				this.$router.push({
					name: link
				})
			},
			onValuesChange(picker, values) {
				if(pca[values[0]]) {
					this.value = values;
					picker.setSlotValues(1, Object.keys(pca[values[0]]))
					picker.setSlotValues(2, pca[values[0]][values[1]])
				}
			},

		}
	}
</script>

<style scoped="scoped">
	@import url("../../static/css/add_address.css");
</style>