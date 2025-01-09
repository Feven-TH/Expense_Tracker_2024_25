export interface creatExpenseParma {
  id: number;
  amount: bigint;
  description: string;
  createdAt: Date;
  userId?: number; 
}
