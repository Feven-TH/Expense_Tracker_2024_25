import { updateApi } from './api/expense' // Import the API

class UpdateExpense {
    private updateForm: HTMLFormElement | null;

    constructor() {
        this.updateForm = document.getElementById('updateForm') as HTMLFormElement | null;
        if (this.updateForm) {
            this.addEventListeners();
        }
    }

    private addEventListeners(): void {
        this.updateForm?.addEventListener('submit', async (event) => {
            event.preventDefault();
            await this.handleUpdate();
        });
    }

    private async handleUpdate(): Promise<void> {
        const typeSelect = document.getElementById('type') as HTMLSelectElement;
        const descriptionInput = document.getElementById('description') as HTMLInputElement;
        const dateInput = document.getElementById('date') as HTMLInputElement;
        const amountInput = document.getElementById('amount') as HTMLInputElement;

        const type = typeSelect.value
        const description = descriptionInput.value;
        const date = dateInput.value;
        const amount = parseFloat(amountInput.value);

        if (type && description && date && !isNaN(amount)) {
            try {
                const response = await updateApi.updateExpense(type, { description, date, amount });
                alert('Expense updated successfully!');
                window.location.reload();
            } catch (error) {
                alert('Failed to update expense. Please try again.');
            }
        } else {
            alert('Please fill in all fields.');
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new UpdateExpense();
});
