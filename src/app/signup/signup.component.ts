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
      const username = this.form.value.username
      const email = this.form.value.email
      const password = this.form.value.password
      let mutation = gql`
        mutation {
          signup: signup(username: "${username}", email: "${email}", password: "${password}"){
              username
              email
              password
          }
        }
      `
      this.employeeApi.mutation(mutation).subscribe((result: any) => {
        this.loading = result.loading
        this.error = result.error
        if (result.data?.signup) {
          alert(`Successfully created user ${result.data?.signup.username}!`)
          this.router.navigateByUrl('/login')
        }
      })
    }
  }

}
