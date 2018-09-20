<template>
	<div class="tmpl success">
		<myheader title="成功"></myheader>
		<div class="box">
			<p>
				订单提交成功 </p>
			<router-link :to="{name:'home'}">点此返回主页</router-link>
		</div>

	</div>

</template>
<script>
	export default {
		data() {
			return {}
		},
		created() {

		},
		methods: {}
	}
</script>
<style scoped>
	.success .box {
		color: #0086B3;
		text-align: center;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translateX(-50%);
	}
	
	.success .box a {
		color: #0086B3;
	}
	/*.success a {}*/
</style>