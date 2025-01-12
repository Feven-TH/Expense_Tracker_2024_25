interface Expense {
    description: string;
    date: string;
    amount: number;
    type: 'income' | 'expense';
}

class ExpenseTracker {
    private expenses: Expense[] = [];
    private totalIncome: number = 0;
    private totalExpense: number = 0;

    constructor() {
        this.loadExpenses();
        this.renderExpenses();
        this.updateBalance();
        this.addEventListeners();
    }

    private loadExpenses(): void {
        const expensesJson = localStorage.getItem('expenses');
        if (expensesJson) {
            this.expenses = JSON.parse(expensesJson);
            this.calculateTotals();
        }
    }

    private saveExpenses(): void {
        localStorage.setItem('expenses', JSON.stringify(this.expenses));
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
            expenseList.innerHTML = ''; 
            this.expenses.forEach((expense, index) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${expense.description}</td>
                    <td>${new Date(expense.date).toLocaleDateString()}</td>
                    <td>$${expense.amount.toFixed(2)}</td>
                    <td><button class="btn btn-danger btn-sm" data-index="${index}">Delete</button></td>`;
                expenseList.appendChild(row);
            });

            const deleteButtons = document.querySelectorAll('.btn-danger');
            deleteButtons.forEach(button => {
                button.addEventListener('click', (event) => {
                    const index = parseInt((event.target as HTMLButtonElement).dataset.index!);
                    this.deleteExpense(index);
                });
            });
        }
    }

    private addEventListeners(): void {
        const expenseForm = document.getElementById('expenseForm') as HTMLFormElement;
        const updateExpenseForm = document.getElementById('updateExpenseForm') as HTMLFormElement;

        if (expenseForm) {
            expenseForm.addEventListener('submit', (event) => {
                event.preventDefault();
                this.addExpense();
            });
        }

        if (updateExpenseForm) {
            updateExpenseForm.addEventListener('submit', (event) => {
                event.preventDefault();
                this.updateExpense();
            });
        }
    }

    private addExpense(): void {
        const typeSelect = document.getElementById('type') as HTMLSelectElement;
        const descriptionInput = document.getElementById('description') as HTMLInputElement;
        const dateInput = document.getElementById('date') as HTMLInputElement;
        const amountInput = document.getElementById('amount') as HTMLInputElement;

        const type = typeSelect.value as 'income' | 'expense';
        const description = descriptionInput.value;
        const date = dateInput.value;
        const amount = parseFloat(amountInput.value);

        if (type && description && date && !isNaN(amount)) {
            const newExpense: Expense = { description, date, amount, type };
            this.expenses.push(newExpense);
            this.saveExpenses();
            this.calculateTotals();
            this.renderExpenses();
            this.updateBalance();

            typeSelect.value = '';
            descriptionInput.value = '';
            dateInput.value = '';
            amountInput.value = '';
        } else {
            alert("Please fill in all fields correctly.");
        }
    }

    private updateExpense(): void {
        const typeSelect = document.getElementById('type') as HTMLSelectElement;
        const descriptionInput = document.getElementById('updateDescription') as HTMLInputElement;
        const dateInput = document.getElementById('updateDate') as HTMLInputElement;
        const amountInput = document.getElementById('updateAmount') as HTMLInputElement;

        const type = typeSelect.value as 'income' | 'expense';
        const description = descriptionInput.value;
        const date = dateInput.value;
        const amount = parseFloat(amountInput.value);

        if (type && description && date && !isNaN(amount)) {
            const updatedExpense: Expense = { description, date, amount, type };
            const index = this.expenses.findIndex(expense => expense.description === description && expense.date === date);

            if (index > -1) {
                this.expenses[index] = updatedExpense;
                this.saveExpenses();
                this.calculateTotals();
                this.renderExpenses();
                this.updateBalance();

                typeSelect.value = '';
                descriptionInput.value = '';
                dateInput.value = '';
                amountInput.value = '';
            } else {
               alert("Expense Not Found!");
                
            }
        } else {
            document.getElementById("update-expense").innerHTML="Updated Successfully!";
            document.getElementById("update-expense").style.backgroundColor='green';
            document.getElementById("update-expense").style.color='white';
            const button = document.getElementById("update-expense"); if (button) { button.addEventListener("click", () => { window.location.href = "index.html"; }); }
        }
    }

    private deleteExpense(index: number): void {
        if (index >= 0 && index < this.expenses.length) {
            this.expenses.splice(index, 1);
            this.saveExpenses();
            this.calculateTotals();
            this.renderExpenses();
            this.updateBalance();
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ExpenseTracker();
});
