import { Component } from '@angular/core';
import { EmployeeApiService } from '../network/employee-api.service';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { gql } from 'apollo-angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  
  form: any;
  username: any;
  loading: any;
  error: any;
  returnUrl: any;

  constructor(private employeeApi: EmployeeApiService, private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: new FormControl(),
      password: new FormControl()
    })

    this.returnUrl = this.route.snapshot.queryParamMap.get('returnUrl')
  }

  login() {
    if (this.form?.valid) {
      this.username = this.form.value.username
      const password = this.form.value.password
      let query = gql`
        query {
          login: login(username: "${this.username}", password: "${password}") {
            username
          }
        }
      `
      this.employeeApi.query(query).subscribe((result: any) => {
        this.username = result.data?.login.username
        this.loading = result.loading
        this.error = result.error
        if (result.data?.login.username) {
          localStorage.setItem('token', this.username);
          this.router.navigateByUrl(`/${this.returnUrl}`)
        }
      })
    }
  }

}
