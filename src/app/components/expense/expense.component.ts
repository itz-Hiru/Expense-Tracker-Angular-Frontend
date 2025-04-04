import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExpenseService } from '../../services/expense/expense.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { error } from 'console';

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

  constructor(private fb: FormBuilder,
    private expenseService: ExpenseService,
    private messageService: NzMessageService,
  ) { }

  ngOnInit() {
    this.expenseForm = this.fb.group({
      title: [null, Validators.required],
      amount: [null, Validators.required],
      date: [null, Validators.required],
      category: [null, Validators.required],
      description: [null, Validators.required],
    })
  }

  submitForm() {
    this.expenseService.postExpense(this.expenseForm.value).subscribe(res => {
      this.messageService.success("Expense added successfully", { nzDuration: 5000 });
    }, error => {
      this.messageService.error("Error while posting expense", { nzDuration: 5000 });
    })  
  }
}
