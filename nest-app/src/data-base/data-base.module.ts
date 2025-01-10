import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Expense } from 'src/entity/expense.entity';
import { user } from 'src/entity/user.entity';

@Module({
    imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',         
    port: 3306,                 
    username: 'root',    
    password: 'hello17!',   
    database: 'nestjs_db',
    entities: [user,Expense] ,     
    synchronize: true,
    })
]         
})
export class DataBaseModule {}

