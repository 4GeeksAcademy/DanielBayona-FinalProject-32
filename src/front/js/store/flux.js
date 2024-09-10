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
					if (response.status == 200) {
						setStore({
							token: data.token
						})
						localStorage.setItem("token", data.token)
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
					let response = await fetch(p`${process.env.BACKEND_URL}/api/register`, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(user)
					})
					let data = await response.json()
					if (response.ok) {
						return true;
					}
					return data;
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
