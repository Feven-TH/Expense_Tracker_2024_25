import { Injectable, NotFoundException  } from '@nestjs/common';
import { CreateExpenseDto, UpdateExpenseDto } from './expense.dto';
import { Expense } from './expense.interface';
import { v4 as uuidv4 } from 'uuid'; 
@Injectable()
export class ExpenseService {
  private expenses: Expense[] = [];

  // Create a new expense
  create(createExpenseDto: CreateExpenseDto): Expense {
    const { description, amount } = createExpenseDto;

    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

    const newExpense: Expense = {
      id: uuidv4(),
      description,
      amount,
      createdAt: formattedDate, 
      updatedAt: formattedDate, 
    };

    this.expenses.push(newExpense);
    return newExpense;
  }

  // Get all expenses
  findAll(): Expense[] {
    return this.expenses;
  }

  // Get a single expense by ID
  findOne(id: string): Expense {
    const expense = this.expenses.find(exp => exp.id === id);
    if (!expense) {
      throw new Error('Expense not found');
    }
    return expense;
  }
  
  //Update Expense by ID
  update(id: string, updateExpenseDto: UpdateExpenseDto): Expense | null {
    const expenseIndex = this.expenses.findIndex((expense) => expense.id === id);
  
    if (expenseIndex === -1) {
      return null;
    }
  
    const existingExpense = this.expenses[expenseIndex];
  
    const updatedExpense: Expense = {
      ...existingExpense,
      ...updateExpenseDto,
      updatedAt: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }),
    };
  
    this.expenses[expenseIndex] = updatedExpense; 
    return updatedExpense;
  }
  
   // Delete an expense by id
   delete(id: string): void {
    const expenseIndex = this.expenses.findIndex((expense) => expense.id === id);

    if (expenseIndex === -1) {
      throw new NotFoundException(`Expense with id ${id} not found`);
    }

    this.expenses.splice(expenseIndex, 1); 
  }

}