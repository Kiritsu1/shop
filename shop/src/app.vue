<template>
	<div class="app">
		<transition mode="out-in" name="router">
			<router-view></router-view>
		</transition>
	</div>
</template>
<script>
	export default {
		data() {
			return {

			}
		},
		created() {
			var u = this.$usertools.getLoginedUser();
			if(u != null && u != "")
				this.$store.commit('loginedUser/addlogin', u);
		},
		methods: {

		},

	}
</script>

<style scoped="scoped">
	@import "./static/css/app.css"
</style>