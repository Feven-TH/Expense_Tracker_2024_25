import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Expense } from '../entity/expense.entity';
import { CreateExpenseDto } from './dtos/create.Expense.dto';
import { UpdateExpenseDto } from './dtos/updateExpense.dto';

@Injectable()
export class ExpenseService {
  constructor(
    @InjectRepository(Expense)
    private  expenseRepository: Repository<Expense>,
  ) {}
  // Create a new expense
  createExpense(createExpenseDto: CreateExpenseDto): Promise<Expense> {
    const expense = this.expenseRepository.create(createExpenseDto);
    return this.expenseRepository.save(expense);
  }
  // findall expense
  findAllExpenses(): Promise<Expense[]> {
    return this.expenseRepository.find();
  }
  // get a single expense  byid
  findOneExpenseById(id: number): Promise<Expense | null> {
    return this.expenseRepository.findOne({ where: { id } });
  }
  // update an  expense by id 
  updateExpenseById(id: number, updateExpenseDto: UpdateExpenseDto): Promise<Expense> {
    return this.expenseRepository.findOne({ where: { id } }).then(expense => {
      if (!expense) {
        throw new Error('Expense not found');
      }
      const updatedExpense = Object.assign(expense, updateExpenseDto);
      return this.expenseRepository.save(updatedExpense);
    });
  }
  // delete expense by id
  deleteExpenseById(id: number): Promise<void> {
    return this.expenseRepository.delete(id).then(() => undefined);
  }
  
  
  
}




