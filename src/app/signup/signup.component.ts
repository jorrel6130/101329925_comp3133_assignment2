import { Component } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { EmployeeApiService } from '../network/employee-api.service';
import { Router } from '@angular/router';
import { gql } from 'apollo-angular';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  
  form: any;
  loading: any;
  error: any;

  constructor(private employeeApi: EmployeeApiService, private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: new FormControl(),
      email: new FormControl(),
      password: new FormControl()
    })
  }

  signup() {
    if (this.form?.valid) {
      let mutation = ''
        const username = this.form.value.username
        if(username) {
          mutation += `username: "${username}", `
        }
        const email = this.form.value.email
        if(email) {
          mutation += `email: "${email}", `
        }
        const password = this.form.value.password
        if(password) {
          mutation += `password: "${password}", `
        }
      const apiInput = gql`
        mutation {
          signup: signup(${mutation}){
              username
              email
              password
          }
        }
      `
      this.employeeApi.mutation(apiInput).subscribe((result: any) => {
        this.error = JSON.stringify(result.errors)
        this.loading = result.loading
        if (result.data?.signup) {
          alert(`Successfully created user ${result.data?.signup.username}!`)
          this.router.navigateByUrl('/login')
        }
      })
    }
  }

}
