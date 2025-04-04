import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExpenseService } from '../../services/expense/expense.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ActivatedRoute, Router } from '@angular/router';
import { error } from 'console';

@Component({
  selector: 'app-update-expenses',
  standalone: false,
  templateUrl: './update-expenses.component.html',
  styleUrls: ['./update-expenses.component.scss']
})
export class UpdateExpensesComponent {

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
  id!: number;  // Declare without initializing

  constructor(
    private fb: FormBuilder,
    private expenseService: ExpenseService,
    private messageService: NzMessageService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.expenseForm = this.fb.group({
      title: [null, Validators.required],
      amount: [null, Validators.required],
      date: [null, Validators.required],
      category: [null, Validators.required],
      description: [null, Validators.required],
    });
    this.getExpenseById();
  }

  getExpenseById() {
    this.expenseService.getExpenseById(this.id).subscribe(res => {
      this.expenseForm.patchValue(res);
    }, error => {
      this.messageService.error("Something went wrong!", { nzDuration: 5000 });
    })
  }

  submitForm() {
    this.expenseService.updateExpense(this.id, this.expenseForm.value).subscribe( res => {
      this.messageService.success("Expense updated successfully", { nzDuration: 5000 });
      this.router.navigateByUrl("/expense");
    }, error => {
      this.messageService.error("Error while updating expense", { nzDuration: 5000 });
    })
  }
}
