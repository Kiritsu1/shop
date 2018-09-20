<template>
	<div id="">
		<div>
			<header class="mint-header">
				<div class="mint-header-button is-left">
					<a href="#/" class="is-selected">
						<button class="mint-button mint-button--default mint-button--normal">
							<span class="mint-button-icon"><i class="mintui mintui-back" @click="goBack()"></i></span>
						</button>
					</a>
				</div>
				<h1 class="mint-header-title">{{title}}</h1>
				<div class="mint-header-button is-right">
				</div>
			</header>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		props: ['title'],
		methods: {
			goBack() {
				this.$router.go(-1);
			}
		}
	}
</script>

<style scoped="scoped">
	.mint-header {
		width: 100%;
		background-color: #fff;
		color: #FC605A;
		font-size: 17px;
		box-shadow: 0px 1px 6px #ccc;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 1;
	}
	
	.mint-header .mint-header-title {
		color: #000;
	}
</style>