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
						return data.role
					} else {
						return false
					}
				} catch (error) {
					console.log(error);
				}
			},
			getUser: async () => {
				try {
					let response = await fetch(`${process.env.BACKEND_URL}/api/login`)
					let data = await response.json()

					if (response.status === 200) {
						setStore({
							user: data.role
						})
						return data.rol
					}else{
						return false
					}

				} catch (error) {
					console.log(error)
				}

			}
		}
	};
};

export default getState;
