export default {
	namespaced: true,

	state: {
		u_id: '',
		username: "",
		email: "",
		telephone: '',
		type: '',
		money: '',

	},
	mutations: {

		addlogin(state, user) {
			delete user['password'];
			for(var u in user) {
				state[u] = user[u];

			}

		},
		logout(state) {
			for(var s in state) {
				state[s] = "";

			}
		}

	},
	actions: { //行为-> 触发改变
		//		addUser(store, user) {
		//			store.commit('add', user);
		//		},
	},

	getters: {
		getloginedUser(state) {
			//			return {
			//				username: state.username,
			//				password: state.password
			//			}

			return JSON.stringify(state);
		},
		getUsername(state) {
			return state.username;
		},
		getUid(state) {
			return state.u_id;
		}
	}

}