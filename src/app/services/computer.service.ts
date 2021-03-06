import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Computer } from '../models/Computer';

@Injectable({
  providedIn: 'root'
})
export class ComputerService {
  private BASE_URL = environment.BASE_URL;
  constructor(private http: HttpClient) { }

  getComputers() {
    return this.http.get<Computer[]>(`${this.BASE_URL}/computers`);
  }
  getComputer(id: string) {
    return this.http.get<Computer>(`${this.BASE_URL}/computers/${id}`);
  }
  deleteComputer(id: string) {
    return this.http.delete(`${this.BASE_URL}/computers/${id}`);
  }
  addComputer(computer: Partial<Computer>) {
    return this.http.post(`${this.BASE_URL}/computers`, computer);
  }
  modifyComputer(computer: Partial<Computer>) {
    return this.http.put(`${this.BASE_URL}/computers`, computer);
  }
}
