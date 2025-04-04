import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpenseComponent } from './components/expense/expense.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UpdateExpensesComponent } from './components/update-expenses/update-expenses.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: "expense",
    component: ExpenseComponent
  },
  {
    path: "expense/:id/edit",
    component: UpdateExpensesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
