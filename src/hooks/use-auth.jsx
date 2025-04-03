import { useContext, createContext } from "react";
import { useLocalStorage } from "./use-local-storage";

const authContext = createContext();

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({ children }) {
	const auth = useProvideAuth();
	return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export function useAuth() {
	return useContext(authContext);
}

// Provider hook that creates auth object and handles state
function useProvideAuth() {
	const [user, setUser] = useLocalStorage("user-info", false);

	// ... to save the user to state.
	const signin = (user) => {
		return setUser(user);
	};

	const signout = () => {
		return setUser(false);
	};

	return {
		user,
		signin,
		signout,
	};
}
