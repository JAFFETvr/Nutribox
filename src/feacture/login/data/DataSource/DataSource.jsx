
export class LoginDataSource {
    async login(username, password) {
        
        const response = await fetch('https://miapi.sytes.net/api/v1/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            const errorMessage = errorData?.detail || 'Error en el inicio de sesión. Inténtalo de nuevo.';
            throw new Error(errorMessage);
        }

        return await response.json();
    }
}