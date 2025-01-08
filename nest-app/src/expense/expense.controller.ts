import { Controller, Get, Post, Patch, Param, Body, Delete, UsePipes } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { CreateExpenseDto, UpdateExpenseDto } from './expense.dto';
import { ValidationPipe } from '@nestjs/common';


@Controller('expense')
export class ExpenseController {
    constructor(private readonly expenseService: ExpenseService) {}
  
    // For Create Route (Full Validation)
  @Post()
  @UsePipes(new ValidationPipe({ skipMissingProperties: false })) 
  create(@Body() createExpenseDto: CreateExpenseDto) {
    return this.expenseService.create(createExpenseDto);
  }

  @Get()
  findAll() {
    return this.expenseService.findAll(); 
  }

  // Get Single Expense (GET /expense/:id)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.expenseService.findOne(id); 
    }

  // For Update Route (Partial Update with Optional Fields)
  @Patch(':id')
  @UsePipes(new ValidationPipe({ skipMissingProperties: true })) 
  
  update(@Param('id') id: string, @Body() updateExpenseDto: UpdateExpenseDto) {
    const updatedExpense = this.expenseService.update(id, updateExpenseDto);
    if (!updatedExpense) {
      return {
        message: `Expense with id ${id} not found.`,
        statusCode: 404,
      };
    }
    return updatedExpense;
  }

  // Delete route
  @Delete(':id')
  delete(@Param('id') id: string): void {
    return this.expenseService.delete(id);
  }
}

