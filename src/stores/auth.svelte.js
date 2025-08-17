// Check if we're running in the browser
const browser = typeof window !== 'undefined';

class AuthStore {
	user = $state(false);

	signin = (userData) => {
		if (browser) {
			localStorage.setItem("user-info", JSON.stringify(userData));
		}
		this.user = userData;
	};

	signout = () => {
		if (browser) {
			localStorage.removeItem("user-info");
		}
		this.user = false;
	};

	init = () => {
		if (browser) {
			try {
				const stored = localStorage.getItem("user-info");
				this.user = stored ? JSON.parse(stored) : false;
			} catch (error) {
				console.error(error);
				this.user = false;
			}
		}
	};
}

export const authStore = new AuthStore();
