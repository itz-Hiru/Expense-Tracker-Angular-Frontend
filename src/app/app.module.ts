import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideNzI18n } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { DemoNgZorroAntdModule } from './DemoNgZorroAntdModule';
import { ExpenseComponent } from './components/expense/expense.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UpdateExpensesComponent } from './components/update-expenses/update-expenses.component';
import { IncomeComponent } from './components/income/income.component';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    ExpenseComponent,
    DashboardComponent,
    UpdateExpensesComponent,
    IncomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DemoNgZorroAntdModule
  ],
  providers: [
    provideClientHydration(withEventReplay()),
    provideNzI18n(en_US),
    provideAnimationsAsync(),
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
