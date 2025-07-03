export class LoginDataSource {
    async login(phone, password) {
        await new Promise(resolve => setTimeout(resolve, 1500));

        if (phone === 'jaffet' && password === 'password') {
            
            return Promise.resolve({
                userId: 'user-001',
                fullName: ' Carlos Jaffet',
                emailAddress: 'juan.perez@example.com',
                phoneNumber: phone,
                token: 'fake-jwt-token-for-session-management' // Un token de sesión simulado
            });
        } else {
           
            return Promise.reject(new Error('Número telefónico o contraseña incorrectos.'));
        }
    }
}