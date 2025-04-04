import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { IncomeService } from '../../services/income/income.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-incomes',
  standalone: false,
  templateUrl: './update-incomes.component.html',
  styleUrl: './update-incomes.component.scss'
})
export class UpdateIncomesComponent {

  id!: number;

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
    private fb: FormBuilder,
    private messageService: NzMessageService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private incomeService: IncomeService,
  ) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];

    this.incomeForm = this.fb.group({
      title: [null, Validators.required],
      amount: [null, Validators.required],
      date: [null, Validators.required],
      category: [null, Validators.required],
      description: [null, Validators.required]
    });

    this.getIncomeById();
  }

  getIncomeById() {
    this.incomeService.getIncomeById(this.id).subscribe(
      res => {
        this.incomeForm.patchValue(res);
      },
      error => {
        this.messageService.error("Something went wrong", { nzDuration: 5000 })
      }
    );
  }

  submitForm() {
    this.incomeService.updateIncome(this.id, this.incomeForm.value).subscribe(
      res => {
        this.messageService.success("Income updated successfully", { nzDuration: 5000 });
        this.router.navigateByUrl("/income")
      },
      error => {
        this.messageService.error("Error while updating income", { nzDuration: 5000 });
      }
    );
  }
}
