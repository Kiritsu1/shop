<template>
	<div class="tmpl address">
		<myheader title="地址"></myheader>
		<ul class="address_list">
			<li>
				<a href="#">
					<span>张三</span>
					<span>地址：江西省南昌市江西省南昌市江西省南昌市江西省南昌市江西省南昌市江西省南昌市</span>
					<span>13000000000</span>
				</a>
			</li>
			<li>
				<a href="#">
					<span>张三</span>
					<span>地址：江西省南昌市江西省南昌市江西省南昌市江西省南昌市江西省南昌市江西省南昌市</span>
					<span>13000000000</span>
				</a>
			</li>
		</ul>
		<mt-button type="danger" size="large" class="add_address" @click="go('add_address')">添加新地址</mt-button>
	</div>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		created() {
		},
		destroyed() {

		},
		methods: {
			go(link){
				this.$router.push({
					name:link
				})
			}
		}
	}
</script>

<style scoped="scoped">
	@import url("../../static/css/address.css");
</style>