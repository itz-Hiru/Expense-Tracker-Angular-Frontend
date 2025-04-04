import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASIC_URL = "http://localhost:8080/"

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  constructor(private http: HttpClient) { }

  postExpense(expenseDTO: any): Observable<any> {
    return this.http.post(BASIC_URL + "expense", expenseDTO);
  }

  getAllExpenses(): Observable<any> {
    return this.http.get(BASIC_URL + "expense/all");
  }

  getExpenseById(id: number): Observable<any> {
    return this.http.get(BASIC_URL + `expense/${id}`);
  }

  updateExpense(id: number, expenseDTO: any): Observable<any> {
    return this.http.put(BASIC_URL + `expense/${id}`, expenseDTO);
  }

  deleteExpense(id: number): Observable<any> {
    return this.http.delete(BASIC_URL + `expense/${id}`);
  }
}
