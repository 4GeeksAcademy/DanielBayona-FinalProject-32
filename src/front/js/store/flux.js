const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			token: localStorage.getItem("token") || null,
			user: localStorage.getItem("user") || null
		},
		actions: {
			// Use getActions to call a function within a fuction
			login: async (user) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/login`, {
						method: "POST",
						headers: {
							"content-type": "application/json"
						},
						body: JSON.stringify(user)
					})

					const data = await response.json()
					console.log(data);

					if (response.status == 200) {
						setStore({
							token: data.access_token
						})
						localStorage.setItem("access_token", data.access_token)
						getActions().getUser()
						return data.role
					} else {
						return false
					}
				} catch (error) {
					console.log(error);
				}
			},
			logout: () => {
				setStore({
					token: null
				})
				localStorage.removeItem("token")
				localStorage.removeItem("user")

				return true
			},
			getUser: async () => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/valid-token`, {
						"method": "GET",
						"headers": {
							"Authorization": `Bearer ${getStore().token}`
						}
					})
					const data = await response.json()

					if (response.ok) {
						setStore({
							user: data.role
						})
						localStorage.setItem('user', JSON.stringify(data))
					} else {
						return false
					}

				} catch (error) {
					console.log(error)
				}
			},
			// SIGNUP / REGISTRO
			register: async (user) => {
				try {
					let response = await fetch(`${process.env.BACKEND_URL}/api/user`, {
						method: 'POST',
						body: user
					})

					return response.status
				}
				catch (error) {
					console.log(error);
					return { 'error': 'unexpected error' };
				}
			},


		}

	}
};


export default getState;
