import { Controller, Post, Body, Put, Param, Get, Delete } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { CreateExpenseDto } from './dtos/create.Expense.dto';
import { UpdateExpenseDto } from './dtos/updateExpense.dto';
import { Expense } from 'src/entity/expense.entity';

@Controller('expense')
export class ExpenseController {
  constructor(private  expenseService: ExpenseService) {}

  @Post()
  createExpense(@Body() createExpenseDto: CreateExpenseDto) {
    return this.expenseService.createExpense(createExpenseDto);
  }
  @Get()
  findAllExpenses(): Promise<Expense[]> {
    console.log('Fetching all expenses');
    return this.expenseService.findAllExpenses();
  }
  @Get(':id')
  findOneExpenseById(@Param('id') id: number): Promise<Expense | null> {
    return this.expenseService.findOneExpenseById(id);
  }
  @Put(':id')
  updateExpenseById(
    @Param('id') id: string,
    @Body() updateExpenseDto: UpdateExpenseDto,
  ): Promise<Expense> {
    return this.expenseService.updateExpenseById(Number(id), updateExpenseDto).then(updatedExpense => {
      return updatedExpense; 
    });
  }
  @Delete(':id')
  deleteExpenseById(@Param('id') id: number): Promise<void> {
    return this.expenseService.deleteExpenseById(id);
  }

}

