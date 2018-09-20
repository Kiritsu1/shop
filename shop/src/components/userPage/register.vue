<template>
	<div class="tmpl reg">
		<myheader title="注册"></myheader>
		<ul class="regmsg">
			<li>
				<mt-field label="用户名" placeholder="请输入4-12位用户名" :state="userstate" v-model="username" disableClear></mt-field>
			</li>
			<li>
				<mt-field label="密码" placeholder="请输入6-12位密码" type="password" :state="pwdstate" v-model="password" disableClear></mt-field>
			</li>
			<li>
				<mt-field label="邮箱" placeholder="请输入邮箱" type="email" :state="emailstate" v-model="email" disableClear></mt-field>
			</li>
			<li>
				<mt-field label="手机号" placeholder="请输入手机号" type="tel" :state="phonestate" v-model="telephone" disableClear></mt-field>
			</li>

		</ul>
		<mt-button type="danger" size="large" @click="register" class="regbtn">注册</mt-button>

	</div>

</template>

<script>
	export default {
		data() {
			return {
				username: '',
				password: '',
				email: '',
				telephone: ''
			}
		},
		created() {},
		methods: {
			register() {
				if(this.userstate == "success" && this.pwdstate == "success" && this.emailstate == "success" && this.phonestate == "success") {
					this.$ajax.post("/my/reg", {
						username: this.username,
						password: this.password,
						email: this.email,
						telephone: this.telephone,
					}).then(data => {
						data = data.data
						if(data.status == 0) {
							this.$messagebox('提示', '注册成功');
							this.$router.push({
								name: 'user'
							})
						} else if(data.status == 2) {
							this.$messagebox('提示', '用户名已存在');
							this.username = ''
							this.password = ''
							this.email = ''
							this.telephone = ''

						} else {
							this.$messagebox('提示', '登陆失败');

						}
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
			},
			emailstate() {
				if(this.email.indexOf("@") > 0) {
					return "success"
				} else {
					return "error"
				}
			},
			phonestate() {
				if(!isNaN(Number(this.telephone)) && this.telephone.length == 11) {
					return "success"

				} else {
					return "error"
				}
			}
		}
	}
</script>

<style scoped>
	@import url("../../static/css/reg.css");
</style>