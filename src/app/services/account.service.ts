import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const baseUrl = 'http://localhost:8080/accounts';
//const baseUrl = 'https://evening-plateau-59541.herokuapp.com/accounts';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(baseUrl);
  }

  get(id) {
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(data) {
    return this.http.post(baseUrl, data);
  }

  update(id, data) {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id) {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll() {
    return this.http.delete(baseUrl);
  }

  findByNickname(nickname) {
    return this.http.get(`${baseUrl}?nickname=${nickname}`);
  }
  getAllTransactions(id){
    return this.http.get(`${baseUrl}/${id}/transactions`);
  }

  deposit(id, amount, data) {
    return this.http.put(`${baseUrl}/${id}/deposit?amount=${amount}`, data);
  }

  withdraw(id, amount, data) {
    return this.http.put(`${baseUrl}/${id}/withdraw?amount=${amount}`, data);
  }

}
