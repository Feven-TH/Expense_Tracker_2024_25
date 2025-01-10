import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExpenseModule } from './expense/expense.module';
import { UserModule } from './user/user.module';
import { DataBaseModule } from './data-base/data-base.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ExpenseModule, UserModule, DataBaseModule,AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
