import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "expenses" }) 
export class Expense {
    @PrimaryGeneratedColumn({ type: "bigint" })
    id: number;
    @Column('bigint')
    amount: bigint;
    @Column()
    description: string;
    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
    @Column({ nullable: true })
    userId: number; 
}
