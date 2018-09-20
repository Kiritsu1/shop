<template>
	<div class="tmpl login">
		<myheader title="登录"></myheader>

		<mt-field label="用户名" class="username" placeholder="请输入4-12位用户名" :state="userstate" v-model="username" disableClear></mt-field>
		<mt-field label="密码" class="password" placeholder="请输入6-12位密码" type="password" :state="pwdstate" v-model="password" disableClear></mt-field>
		<mt-cell title="自动登录" value="说明文字" class="autologin">
			<mt-switch v-model="autologin"></mt-switch>
		</mt-cell>

		<mt-button type="primary" size="large" @click="login" class="loginbtn">登录</mt-button>
		<p class="options">
			<router-link :to="{name:'register'}">注册账号 </router-link>
			<a href="#">忘记密码</a>
		</p>
	</div>

</template>

<script>
	export default {
		data() {
			return {
				username: '',
				password: '',
				autologin: false
			}
		},
		created() {},
		methods: {
			login() {
				if(this.userstate == "success" && this.pwdstate == "success") {
					this.$ajax.post('/my/login', {
						username: this.username,
						password: this.password
					}).then(data => {
						data = data.data
						if(data.status == 2) {
							this.$messagebox('提示', '用户名或密码错误');
						} else if(data.status == 1) {
							this.$messagebox('提示', '登录错误');
						} else {
							if(this.autologin)
								this.$usertools.savelogin(data.message[0]);
							this.$store.commit('loginedUser/addlogin', data.message[0]);
							this.$router.push({
								name: 'user'
							})
						}

					}).catch(err => {
						console.log(err)
						this.$messagebox('提示', '登录出错');
					})
				} else {
					this.$messagebox('提示', '请按要求输入信息');
				}
			}
		},
		computed: {
			userstate() {
				if(this.username.length < 4) {
					return "error"
				} else {
					return "success"
				}
			},
			pwdstate() {
				if(this.password.length < 6) {
					return "error"
				} else {
					return "success"
				}
			}
		}
	}
</script>

<style scoped>
	@import url("../../static/css/login.css");
</style>