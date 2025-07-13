const API_URL = import.meta.env.VITE_API_URL;

export const login = async (data) => {
	try {
		const response = await fetch(`${API_URL}/signin`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});

		if (!response.ok) {
			const error = await response.json();
			throw error.message;
		}

		const result = await response.json();

		if (!result.token) {
			throw new Error("Token not found in response.");
		}
		return result.token; // Return token
	} catch (error) {
		throw error || "Login failed.";
	}
};

export const signup = async (data) => {
	try {
		const response = await fetch(`${API_URL}/signup`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});

		if (!response.ok) {
			const error = await response.json();
			throw error.message;
		}

		const result = await response.json();
		return result.message;  
	} catch (error) {
		throw error || "Signup failed.";
	}
};

export const resetLink = async (email) => {
	try {
		const response = await fetch(`${API_URL}/forgot-password`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email,
				redirectUrl: API_URL,
			}),
		});

		if (!response.ok) {
			const error = await response.json();
			throw error.message;
		}

		return await response.json();

	} catch (error) {
		throw error || "Failed to sent reset link.";
	}
};

export const validateResetToken = async (token) => {
    try {
        const response = await fetch(`${API_URL}/reset-password/${token}`, {
            method: "GET",
        });

        if (!response.ok) {
            const error = await response.json();
            throw error.message || "Invalid or expired token.";
        }

        return await response.json();
    } catch (error) {
        throw error || "Failed to validate token.";
    }
};

export const resetPassword = async (token, password) => {
	try {
		const response = await fetch(`${API_URL}/reset-password/${token}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({password}),
		});

		if (!response.ok) {
			const error = await response.json();
			throw error.message;
		}

		return await response.json();

	} catch (error) {
		throw error || "Failed to reset password.";
	}
};

export const logout = () => {
	localStorage.removeItem("token");
};

