import { Component } from '@angular/core';
import { EmployeeApiService } from '../network/employee-api.service';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  
  constructor(private employeeApi: EmployeeApiService) {}

  login() {
    throw new Error('Method not implemented.');
  }

}
