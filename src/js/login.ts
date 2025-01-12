import { loginApi } from './api/auth'; // Import the API

class Login {
    private loginForm: HTMLFormElement | null;

    constructor() {
        this.loginForm = document.getElementById('loginForm') as HTMLFormElement | null;
        if (this.loginForm) {
            this.addEventListeners();
        }
    }

    private addEventListeners(): void {
        this.loginForm?.addEventListener('submit', async (event) => {
            event.preventDefault();
            await this.handleLogin();
        });
    }

    private async handleLogin(): Promise<void> {
        const emailInput = document.getElementById('email') as HTMLInputElement;
        const passwordInput = document.getElementById('password') as HTMLInputElement;

        const email = emailInput.value;
        const password = passwordInput.value;

        if (email && password) {
            try {
                const response = await loginApi.login({ email, password });
                alert('Login successful!');
                window.location.href = '/dashboard.html'; // Adjust the path as needed
            } catch (error) {
                alert('Login failed. Please check your credentials.');
            }
        } else {
            alert('Please fill in all fields.');
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Login();
});
