<template>
	<div class="money_detail">
		<myheader title="余额明细"></myheader>
		<ul>
			<li v-for="md in moneyDetail">
				<mt-cell :title="md.changeOrigin"  :label="md.time|convertDate" :value="md.changenumber"></mt-cell>
			
				
			</li>
		</ul>

	</div>
</template>

<script>
	export default {
		data() {
			return {
				moneyDetail: ''
			}
		},
		created() {
			this.$ajax.post('/my/getMD/', {
				u_id: this.getUsers.u_id
			}).then(data => {
				data = data.data;
				if(data.status == 0)
					this.moneyDetail = data.message;
				else
					console.log(data)
			})
		},
		computed: {
			getUsers() {
				return JSON.parse(this.$store.getters['loginedUser/getloginedUser']);
			}
		}
	}
</script>

<style scoped>
	@import url("../../static/css/money_detail.css");
</style>