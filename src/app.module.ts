import { Module } from '@nestjs/common';
import { CategoryModule } from './modules/category/category.module';
import { AuthModule } from './modules/auth/auth.module';
import { ExpenseModule } from './modules/expense/expense.module';
import { AccountModule } from './modules/account/account.module';

@Module({
	imports: [AuthModule, AccountModule, CategoryModule, ExpenseModule],
	controllers: [],
	providers: []
})
export class AppModule {}
