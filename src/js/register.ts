import { registerApi } from './api/auth'; // Import the API

class Register {
    private registerForm: HTMLFormElement | null;

    constructor() {
        this.registerForm = document.getElementById('registerForm') as HTMLFormElement | null;
        if (this.registerForm) {
            this.addEventListeners();
        }
    }

    private addEventListeners(): void {
        this.registerForm?.addEventListener('submit', async (event) => {
            event.preventDefault();
            await this.handleRegister();
        });
    }

    private async handleRegister(): Promise<void> {
        const nameInput = document.getElementById('name') as HTMLInputElement;
        const emailInput = document.getElementById('email') as HTMLInputElement;
        const passwordInput = document.getElementById('password') as HTMLInputElement;

        const name = nameInput.value;
        const email = emailInput.value;
        const password = passwordInput.value;

        if (name && email && password) {
            try {
                const response = await registerApi.register({ name, email, password });
                alert('Registration successful!');
                window.location.href = '/login.html'; // Adjust the path as needed
            } catch (error) {
                alert('Registration failed. Please try again.');
            }
        } else {
            alert('Please fill in all fields.');
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Register();
});
