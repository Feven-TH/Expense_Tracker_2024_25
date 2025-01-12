import { expenseApi } from './api/expense'; // Importing the modular Fetch API for expenses

class ExpenseTracker {
    private expenses: Expense[] = [];
    private totalIncome: number = 0;
    private totalExpense: number = 0;

    constructor() {
        this.fetchAndRenderExpenses();
        this.addEventListeners();
    }

    private async fetchAndRenderExpenses(): Promise<void> {
        try {
            this.expenses = await expenseApi.getExpenses();
            this.calculateTotals();
            this.renderExpenses();
            this.updateBalance();
        } catch (error) {
            console.error('Failed to fetch expenses:', error);
            alert('Unable to load expenses. Please try again later.');
        }
    }

    private calculateTotals(): void {
        this.totalIncome = this.expenses
            .filter(expense => expense.type === 'income')
            .reduce((total, expense) => total + expense.amount, 0);

        this.totalExpense = this.expenses
            .filter(expense => expense.type === 'expense')
            .reduce((total, expense) => total + expense.amount, 0);
    }

    private updateBalance(): void {
        const totalBalanceElement = document.querySelector('.total-balance') as HTMLElement;
        const incomeElement = document.querySelector('.income') as HTMLElement;
        const expenseElement = document.querySelector('.expense') as HTMLElement;

        if (totalBalanceElement && incomeElement && expenseElement) {
            totalBalanceElement.textContent = (this.totalIncome - this.totalExpense).toFixed(2);
            incomeElement.textContent = this.totalIncome.toFixed(2);
            expenseElement.textContent = this.totalExpense.toFixed(2);
        }
    }

    private renderExpenses(): void {
        const expenseList = document.getElementById('expenseList') as HTMLTableSectionElement;
        if (expenseList) {
            expenseList.innerHTML = ''; // Clear existing rows
            this.expenses.forEach((expense, index) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${expense.description}</td>
                    <td>${new Date(expense.date).toLocaleDateString()}</td>
                    <td>$${expense.amount.toFixed(2)}</td>
                    <td><button class="btn btn-danger btn-sm" data-id="${expense.id}">Delete</button></td>`;
                expenseList.appendChild(row);
            });

            // Add delete button event listeners
            const deleteButtons = document.querySelectorAll('.btn-danger');
            deleteButtons.forEach(button => {
                button.addEventListener('click', async (event) => {
                    const id = (event.target as HTMLButtonElement).dataset.id!;
                    await this.deleteExpense(id);
                });
            });
        }
    }

    private addEventListeners(): void {
        const expenseForm = document.getElementById('expenseForm') as HTMLFormElement;
        if (expenseForm) {
            expenseForm.addEventListener('submit', async (event) => {
                event.preventDefault();
                await this.addExpense();
            });
        }
    }

    private async addExpense(): Promise<void> {
        const typeSelect = document.getElementById('type') as HTMLSelectElement;
        const descriptionInput = document.getElementById('description') as HTMLInputElement;
        const dateInput = document.getElementById('date') as HTMLInputElement;
        const amountInput = document.getElementById('amount') as HTMLInputElement;

        const newExpense: Expense = {
            type: typeSelect.value as 'income' | 'expense',
            description: descriptionInput.value,
            date: dateInput.value,
            amount: parseFloat(amountInput.value),
        };

        if (newExpense.type && newExpense.description && newExpense.date && !isNaN(newExpense.amount)) {
            try {
                await expenseApi.addExpense(newExpense);
                alert('Expense added successfully!');
                await this.fetchAndRenderExpenses();

                // Reset form fields
                typeSelect.value = '';
                descriptionInput.value = '';
                dateInput.value = '';
                amountInput.value = '';
            } catch (error) {
                console.error('Failed to add expense:', error);
                alert('Unable to add expense. Please try again.');
            }
        } else {
            alert('Please fill in all fields correctly.');
        }
    }

    private async deleteExpense(id: string): Promise<void> {
        try {
            await expenseApi.deleteExpense(id);
            alert('Expense deleted successfully!');
            await this.fetchAndRenderExpenses();
        } catch (error) {
            console.error('Failed to delete expense:', error);
            alert('Unable to delete expense. Please try again.');
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ExpenseTracker();
});
