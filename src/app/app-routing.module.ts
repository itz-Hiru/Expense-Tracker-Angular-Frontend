import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { IncomeComponent } from './components/income/income.component';
import { UpdateIncomesComponent } from './components/update-incomes/update-incomes.component';
import { ExpenseComponent } from './components/expense/expense.component';
import { UpdateExpensesComponent } from './components/update-expenses/update-expenses.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'income', component: IncomeComponent },
  { path: 'income/:id/edit', component: UpdateIncomesComponent },
  { path: 'expense', component: ExpenseComponent },
  { path: 'expense/:id/edit', component: UpdateExpensesComponent },
  { path: '**', redirectTo: 'dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
