import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { EmployeeApiService } from '../network/employee-api.service';

@Component({
  selector: 'app-addemployee',
  imports: [ReactiveFormsModule],
  templateUrl: './addemployee.component.html',
  styleUrl: './addemployee.component.css'
})
export class AddemployeeComponent implements OnInit{

  form: any;
  error: any;

  constructor(private readonly apollo: Apollo, private formBuilder: FormBuilder, private router: Router, private employeeApi: EmployeeApiService) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      first_name: new FormControl(),
      last_name: new FormControl(),
      email: new FormControl(),
      gender: new FormControl(),
      designation: new FormControl(),
      salary: new FormControl(),
      doj: new FormControl(),
      department: new FormControl(),
      photo: new FormControl()
    })
  }

  addEmployee() {
      if (this.form?.valid) {
        let mutation = ''
        const first_name = this.form.value.first_name
        if(first_name) {
          mutation += `first_name: "${first_name}", `
        }
        const last_name = this.form.value.last_name
        if(last_name) {
          mutation += `last_name: "${last_name}", `
        }
        const email = this.form.value.email
        if(email) {
          mutation += `email: "${email}", `
        }
        const gender = this.form.value.gender
        if(gender) {
          mutation += `gender: "${gender}", `
        }
        const designation = this.form.value.designation
        if(designation) {
          mutation += `designation: "${designation}", `
        }
        const salary = this.form.value.salary
        if(salary) {
          mutation += `salary: ${salary}, `
        }
        if(this.form.value.doj) {
          const doj = new Date(this.form.value.doj)
          console.log(this.form.value.doj)
          mutation += `date_of_joining: "${doj}", `
        }
        const department = this.form.value.department
        if(department) {
          mutation += `department: "${department}", `
        }
        const photo = this.form.value.photo
        if(photo) {
          mutation += `employee_photo: "${photo}", `
        }
        const apiInput = gql`
            mutation {
              addEmployee: addEmp(${mutation}) {
                _id
              }
            }
          `
        this.employeeApi.employeeMutation(apiInput).subscribe((result: any) => {
          this.router.navigateByUrl(`/employee/view/${result.data?.addEmployee._id}`)
        })
      }
    }

}
