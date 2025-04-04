import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { IncomeService } from '../../services/income/income.service';
import { error } from 'console';

@Component({
  selector: 'app-income',
  standalone: false,
  templateUrl: './income.component.html',
  styleUrl: './income.component.scss'
})
export class IncomeComponent {

  incomes: any;

  incomeForm!: FormGroup;

  listOfCategory: any[] = [
    "Salary",
    "Freelancing",
    "Investments",
    "Stocks",
    "Bitcoin",
    "Bank Transfer",
    "Youtube",
    "Other"
  ];

  constructor(
    private fb:FormBuilder,
    private messageService: NzMessageService,
    private router: Router,
    private incomeService: IncomeService,
  ) {}

  ngOnInit() {
    this.getAllIncomes();
    this.incomeForm = this.fb.group({
      title: [null, Validators.required],
      amount: [null, Validators.required],
      date: [null, Validators.required],
      category: [null, Validators.required],
      description: [null, Validators.required]
    })
  }

  submitForm() {
    if (this.incomeForm.invalid) {
      this.messageService.warning("Please fill in all required fields", { nzDuration: 5000 });
      return;
    }
  
    this.incomeService.postIncome(this.incomeForm.value).subscribe(
      res => {
        this.messageService.success("Income added successfully", { nzDuration: 5000 });
        this.incomeForm.reset();
        this.getAllIncomes();
      },
      error => {
        this.messageService.error("Error while adding income", { nzDuration: 5000 });
      }
    );
  }

  getAllIncomes() {
    this.incomeService.getAllIncomes().subscribe(
      res => {
        this.incomes = res;
      }
    )
  }

  deleteIncome(id: number) {
    this.incomeService.deleteIncome(id).subscribe(
      res => {
        this.messageService.success("Income deleted successfully", { nzDuration: 5000 });
        this.getAllIncomes();
      },
      error => {
        this.messageService.error("Error while deleting income", { nzDuration: 5000 });
      }
    )
  }
}
