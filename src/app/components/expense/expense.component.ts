import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExpenseService } from '../../services/expense/expense.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';

@Component({
  selector: 'app-expense',
  standalone: false,
  templateUrl: './expense.component.html',
  styleUrl: './expense.component.scss'
})

export class ExpenseComponent {

  expenseForm!: FormGroup;

  listOfCategory: any[] = [
    "Education",
    "Groceries",
    "Health",
    "Subscriptions",
    "Takeaways",
    "Clothing",
    "Travelling",
    "Other"
  ];

  expenses: any;

  constructor(private fb: FormBuilder,
    private expenseService: ExpenseService,
    private messageService: NzMessageService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getAllExpenses();

    this.expenseForm = this.fb.group({
      title: [null, Validators.required],
      amount: [null, Validators.required],
      date: [null, Validators.required],
      category: [null, Validators.required],
      description: [null, Validators.required],
    })
  }

  submitForm() {
    if (this.expenseForm.invalid) {
      this.messageService.warning("Please fill in all required fields", { nzDuration: 5000 });
      return;
    }

    this.expenseService.postExpense(this.expenseForm.value).subscribe(
      res => {
        this.messageService.success("Expense added successfully", { nzDuration: 5000 });
        this.expenseForm.reset();
        this.getAllExpenses();
      },
      error => {
        this.messageService.error("Error while posting expense", { nzDuration: 5000 });
      }
    )
  }

  getAllExpenses() {
    this.expenseService.getAllExpenses().subscribe(res => {
      this.expenses = res;
    })
  }

  updateExpense(id: number) {
    this.router.navigateByUrl(`/expense/${id}/edit`);
  }

  deleteExpense(id: number) {
    this.expenseService.deleteExpense(id).subscribe(
      res => {
        this.messageService.success("Expense deleted successfully", { nzDuration: 5000 });
        this.getAllExpenses();
      },
      error => {
        this.messageService.error("Error while deleting expense", { nzDuration: 5000 });
      }
    )
  }
}
