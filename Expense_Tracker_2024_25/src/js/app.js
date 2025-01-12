var ExpenseTracker = /** @class */ (function () {
    function ExpenseTracker() {
        this.expenses = [];
        this.totalIncome = 0;
        this.totalExpense = 0;
        this.loadExpenses();
        this.renderExpenses();
        this.updateBalance();
        this.addEventListeners();
    }
    ExpenseTracker.prototype.loadExpenses = function () {
        var expensesJson = localStorage.getItem('expenses');
        if (expensesJson) {
            this.expenses = JSON.parse(expensesJson);
            this.calculateTotals();
        }
    };
    ExpenseTracker.prototype.saveExpenses = function () {
        localStorage.setItem('expenses', JSON.stringify(this.expenses));
    };
    ExpenseTracker.prototype.calculateTotals = function () {
        this.totalIncome = this.expenses
            .filter(function (expense) { return expense.type === 'income'; })
            .reduce(function (total, expense) { return total + expense.amount; }, 0);
        this.totalExpense = this.expenses
            .filter(function (expense) { return expense.type === 'expense'; })
            .reduce(function (total, expense) { return total + expense.amount; }, 0);
    };
    ExpenseTracker.prototype.updateBalance = function () {
        var totalBalanceElement = document.querySelector('.total-balance');
        var incomeElement = document.querySelector('.income');
        var expenseElement = document.querySelector('.expense');
        if (totalBalanceElement && incomeElement && expenseElement) {
            totalBalanceElement.textContent = " ".concat((this.totalIncome - this.totalExpense).toFixed(2));
            incomeElement.textContent = " ".concat(this.totalIncome.toFixed(2));
            expenseElement.textContent = "".concat(this.totalExpense.toFixed(2));
        }
    };
    ExpenseTracker.prototype.renderExpenses = function () {
        var _this = this;
        var expenseList = document.getElementById('expenseList');
        if (expenseList) {
            expenseList.innerHTML = '';
            this.expenses.forEach(function (expense, index) {
                var row = document.createElement('tr');
                row.innerHTML = "\n                    <td>".concat(expense.description, "</td>\n                    <td>").concat(new Date(expense.date).toLocaleDateString(), "</td>\n                    <td>$").concat(expense.amount.toFixed(2), "</td>\n                    <td><button class=\"btn btn-danger btn-sm\" data-index=\"").concat(index, "\">Delete</button></td>");
                expenseList.appendChild(row);
            });
            var deleteButtons = document.querySelectorAll('.btn-danger');
            deleteButtons.forEach(function (button) {
                button.addEventListener('click', function (event) {
                    var index = parseInt(event.target.dataset.index);
                    _this.deleteExpense(index);
                });
            });
        }
    };
    ExpenseTracker.prototype.addEventListeners = function () {
        var _this = this;
        var expenseForm = document.getElementById('expenseForm');
        if (expenseForm) {
            expenseForm.addEventListener('submit', function (event) {
                event.preventDefault();
                _this.addExpense();
            });
        }
    };
    ExpenseTracker.prototype.addExpense = function () {
        var typeSelect = document.getElementById('type');
        var descriptionInput = document.getElementById('description');
        var dateInput = document.getElementById('date');
        var amountInput = document.getElementById('amount');
        var type = typeSelect.value;
        var description = descriptionInput.value;
        var date = dateInput.value;
        var amount = parseFloat(amountInput.value);
        if (type && description && date && !isNaN(amount)) {
            var newExpense = { description: description, date: date, amount: amount, type: type };
            this.expenses.push(newExpense);
            this.saveExpenses();
            this.calculateTotals();
            this.renderExpenses();
            this.updateBalance();
            typeSelect.value = '';
            descriptionInput.value = '';
            dateInput.value = '';
            amountInput.value = '';
        }
        else {
            alert("Please fill in all fields correctly.");
        }
    };
    ExpenseTracker.prototype.deleteExpense = function (index) {
        if (index >= 0 && index < this.expenses.length) {
            this.expenses.splice(index, 1);
            this.saveExpenses();
            this.calculateTotals();
            this.renderExpenses();
            this.updateBalance();
        }
    };
    return ExpenseTracker;
}());
document.addEventListener('DOMContentLoaded', function () {
    new ExpenseTracker();
});
