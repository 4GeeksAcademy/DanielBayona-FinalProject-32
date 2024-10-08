import { faChalkboardTeacher } from "@fortawesome/free-solid-svg-icons";
import { faPersonMilitaryToPerson } from "@fortawesome/free-solid-svg-icons/faPersonMilitaryToPerson";
import { resolvePath } from "react-router-dom";

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
			token: localStorage.getItem("access_token") || null,
			user: localStorage.getItem("user") || null,
			workers: [],
			supervisors: []

		},
		actions: {
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
				localStorage.removeItem("access_token")
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
					console.log("Token validation response:", data);
					if (response.ok) {
						setStore({
							id: data.id,
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
			getUserProfile: async () => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/profile`, {
						method: "GET",
						headers: {
							"Authorization": `Bearer ${getStore().token}`
						}
					});
					const data = await response.json();

					if (response.ok) {

						setStore({
							id: data.id || null,
							username: data.username || null,
							role: data.role || null,
							pic: data.pic || null,
							name: data.name || null,
							last_name: data.last_name || null,
							position: data.position || null,
							mail: data.mail || null,
							address: data.address || null,
							phone: data.phone || null,
							identification: data.identification || null,
						});
						localStorage.setItem('user', JSON.stringify(data));
						return data;
					} else {
						console.error("Error fetching user data:", data);
						return null;
					}
				} catch (error) {
					console.log("Network error:", error);
					return null;
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
			// CREATE ISSUE
			createIssue: async (issue) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/issue`, {
						method: 'POST',
						"headers": {
							"Authorization": `Bearer ${getStore().token}`
						},
						body: issue
					})

					return response.status
				}
				catch (error) {
					console.log(error);
					return { 'error': 'unexpected error' };
				}
			},

			createWorker: async (worker) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/worker`, {
						method: 'POST',
						"headers": {
							"Authorization": `Bearer ${getStore().token}`,
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(worker)
					})
					return response.status
				}
				catch (error) {
					console.log(error);
					return { 'error': 'unexpected error' };

				}
			},
			getUserWorkers: async () => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/user/workers`, {
						method: 'GET',
						headers: {
							"Authorization": `Bearer ${getStore().token}`
						}
					});

					if (!response.ok) {
						throw new Error("Failed to fetch workers");

					}
					const data = await response.json();
					setStore({ workers: data });
					return data;
				}
				catch (error) {
					console.log(error);
					return { 'error': 'unexpected error' };
				}
			},

			assignWorker: async (id) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/user/assign/${id}`, {
						method: 'PUT',
						headers: {
							"Authorization": `Bearer ${getStore().token}`,
							"Content-Type": "application/json"
						}
					});

					if (!response.ok) {
						throw new Error("Failed to assign worker");
					}

					const data = await response.json();
					if (response.status === 200) {
						console.log(data.message);
						await actions.getWorkers();
					}
				} catch (error) {
					console.log(error);
				}
			},
			createSupervisor: async (supervisor) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/supervisor`, {
						method: 'POST',
						"headers": {
							"Authorization": `Bearer ${getStore().token}`,
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(supervisor)
					})
					return response.status
				}
				catch (error) {
					console.log(error);
					return { 'error': 'unexpected error' };

				}
			},
			getSupervisors: async () => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/user/supervisors`, {
						method: 'GET',
						headers: {
							"Authorization": `Bearer ${getStore().token}`
						}
					});

					if (!response.ok) {
						throw new Error("Failed to fetch supervisors");
					}

					const data = await response.json();
					setStore({ supervisors: data });
					return data;
				} catch (error) {
					console.log(error);
					return { 'error': "unexpected error" };
				}
			},
			assignSupervisor: async (id) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/user/assign/${id}`, {
						method: 'PUT',
						headers: {
							"Authorization": `Bearer ${getStore().token}`,
							"Content-Type": "application/json"
						}
					});
					if (!response.ok) {
						throw new Error('Failed to assign supervisor');
					}

					const data = await response.json();
					if (response.status === 200) {
						console.log(data.message);
						await actions.getSupervisors();
					}
				} catch (error) {
					console.log(error);

				}
			},
			createCompany: async (company) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/company`, {
						method: 'POST',
						"headers": {
							"Authorization": `Bearer ${getStore().token}`,
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(company)
					})
					return response.status
				} catch (error) {
					console.log(error);
					return { 'error': 'error while creating company' }
				}
			},
			getCompanies: async () => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/company`, {
						method: 'GET',
					});
					if (response.ok) {
						const data = await response.json();
						return data;
					} else {
						return response.status
					}
				} catch (error) {
					console.log(error);

				}
			},
			getUsers: async () => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/user`, {
						method: 'GET',
					});
					if (response.ok) {
						const data = await response.json();
						return data;
					} else {
						return response.status
					}
				} catch (error) {
					console.log(error);

				}
			},

			getBugs: async () => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/issue`, {
						method: 'GET',
					});
					if (response.ok) {
						const data = await response.json();
						return data;
					} else {
						return response.status
					}

				} catch (error) {
					console.log(error);

				}
			},

			getWorkers: async () => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/workers`, {
						method: 'GET',
					});
					if (response.ok) {
						const data = await response.json();
						return data;
					} else {
						return response.status
					}
				} catch (error) {
					console.log(error);

				}
			},
			editUser: async (id, user) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/user/${id}`, {
						method: "PUT",
						headers: {
							"Authorization": `Bearer ${getStore().token}`,

						},
						body: user
					});
					if (response.ok) {
						getActions().getUsers();
						return true
					} else {
						console.log('error while updating user');
						return false
					}
				} catch (error) {
					console.log(error);
					return false
				}
			},
			editCompany: async (id, company) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/company/${id}`, {
						method: "PUT",
						headers: {
							"Authorization": `Bearer ${getStore().token}`
						},
						body: company
					});
					if (response.ok) {
						getActions().getCompanies();
						return true
					} else {
						console.log('error while updating company');
						return false;

					}
				} catch (error) {
					console.log(error);
					return false;

				}
			},
			editIssue: async (id, issue) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/issue/${id}`, {
						method: "PUT",
						headers: {
							"Authorization": `Bearer ${getStore().token}`,

						},
						body: issue
					});
					if (response.ok) {
						getActions().getBugs();
						return true
					} else {
						console.log('error while updating issue');
						return false
					}
				} catch (error) {
					console.log(error);
					return false
				}
			},
			editWorker: async (id, worker) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/worker/${id}`, {
						method: "PUT",
						headers: {
							"Authorization": `Bearer ${getStore().token}`,
						},
						body: worker
					});
					if (response.ok) {
						getActions().getWorkers();
						return true;
					} else {
						console.log('error while updating worker');
						return false
					}
				} catch (error) {
					console.log(error);
					return false
				}
			},
			companyInfo: async (id) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/company/${id}`, {
						method: "GET",
						headers: {
							"Authorization": `Bearer ${getStore().token}`,
							"Content-Type": "application/json"
						}
					});
					if (response.ok) {
						const data = await response.json();
						return data
					} else {
						const errorData = await response.json();
						console.log("Error fetching company", errorData);
						return response.status

					}
				} catch (error) {
					console.log(error);

				}
			},
			userInfo: async (id) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/user/${id}`, {
						method: 'GET',
						headers: {
							"Authorization": `Bearer ${getStore().token}`,
							"Content-Type": "application/json"
						}
					});
					if (response.ok) {
						const data = await response.json();
						return data
					} else {
						const errorData = await response.json();
						console.error("Error fetching user:", errorData);
						return response.status;
					}

				} catch (error) {
					console.log(error);
				}
			},
			issueInfo: async (id) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/issue/${id}`, {
						method: 'GET',
						headers: {
							"Authorization": `Bearer ${getStore().token}`,
							"Content-Type": "application/json"
						}
					});
					if (response.ok) {
						const data = await response.json();
						return data
					} else {
						const errorData = await response.json();
						console.error("Error fetching issue:", errorData);
						return response.status;
					}

				} catch (error) {
					console.log(error);
				}
			},
			workerInfo: async (id) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/worker/${id}`, {
						method: 'GET',
						headers: {
							"Authorization": `Bearer ${getStore().token}`,
							"Content-Type": "application/json"
						}
					});
					if (response.ok) {
						const data = await response.json()
						return data
					} else {
						const errorData = await response.json()
						console.log("Error fetching issue:", errorData);
						return response.status;
					}
				} catch (error) {
					console.log(error);

				}
			},
			deleteUser: async (id) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/user/${id}`, {
						method: "DELETE"
					})
					if (response.ok) {
						getActions().getUsers();
						return true;
					} else {
						console.log('error while deleting user');
						return false
					}
				} catch (error) {
					console.log(error);
					return false
				}
			},
			deleteCompany: async (id) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/company/${id}`, {
						method: "DELETE"
					});
					if (response.ok) {
						getActions().getCompanies();
						return true;
					} else {
						console.log('error while deleting Company');
						return false;
					}
				} catch (error) {
					console.log(error);
					return false;
				}
			},
			deleteIssue: async (id) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/issue/${id}`, {
						method: "DELETE"
					})
					if (response.ok) {
						getActions().getBugs();
						return true;
					} else {
						console.log('error while deleting issue');
						return false
					}
				} catch (error) {
					console.log(error);
					return false
				}
			},
			deleteWorker: async (id) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/worker/${id}`, {
						method: "DELETE"
					});
					if (response.ok) {
						getActions().getWorkers();
						return true;
					} else {
						console.log('error while deleting worker');
						return false
					}
				} catch (error) {
					console.log(error);
					return false
				}
			},
			createTask: async (task) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/task`, {
						method: 'POST',
						"headers": {
							"Authorization": `Bearer ${getStore().token}`
						},
						body: task
					})

					return response.status
				}
				catch (error) {
					console.log(error);
					return { 'error': 'unexpected error' };
				}
			},
			getTasks: async () => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/task`, {
						method: "GET",
					});
					if (response.ok) {
						const data = await response.json();
						return data;
					} else {
						return response.status
					}
				} catch (error) {
					console.log(error);

				}
			},
			getInfoTask: async (id) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/task/${id}`, {
						method: "GET",
						headers: {
							"Authorization": `Bearer ${getStore().token}`,
							"Content-Type": "application/json"
						}
					});
					if (response.ok) {
						const data = await response.json();
						return data
					} else {
						const errorData = await response.json();
						console.log("Error fetching tasks", errorData);
						return response.status
					}
				} catch (error) {
					console.log(error);

				}
			},
			deleteTask: async (id) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/task/${id}`, {
						method: "DELETE"
					});
					if (response.ok) {
						getActions().getTasks();
						return true;
					} else {
						console.log('error while deleting task');
						return false
					}
				} catch (error) {
					console.log(error);
					return false
				}
			},
			editTask: async (id, task) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/task/${id}`, {
						method: "PUT",
						headers: {
							"Authorization": `Bearer ${getStore().token}`,
						},
						body: task
					});
					if (response.ok) {
						getActions().getTasks();
						return true
					} else {
						console.log('error while updating issue');
						return false
					}
				} catch (error) {
					console.log(error);
					return false
				}
			},
			getWorkerTasks: async () => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/task/worker`, {
						method: "GET",
						headers: {
							"Authorization": `Bearer ${getStore().token}`,
							"Content-Type": "application/json"
						}
					});
					if (response.ok) {
						const data = await response.json();
						return data
					} else {
						const errorData = await response.json();
						console.log("Error fetching tasks", errorData);
						return response.status
					}
				} catch (error) {
					console.log(error);

				}
			},
		}
	}
};


export default getState;
