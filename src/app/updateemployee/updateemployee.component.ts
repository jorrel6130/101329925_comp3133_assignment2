import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { FormBuilder, Validator, ReactiveFormsModule, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../models/employee';
import { formatDate } from '@angular/common';
import { EmployeeApiService } from '../network/employee-api.service';

@Component({
  selector: 'app-updateemployee',
  imports: [ReactiveFormsModule],
  templateUrl: './updateemployee.component.html',
  styleUrl: './updateemployee.component.css'
})
export class UpdateemployeeComponent implements OnInit {

  form: any;
  employee: Employee | undefined;
  loading = true;
  error: any;
  mutationError: any;
  id: any;
  doj: string = '';

  constructor(private readonly apollo: Apollo, private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private employeeApi: EmployeeApiService) {}

  ngOnInit(): void {

    this.route.params.subscribe(value => {
      this.id = value["id"]
    })

    const query = gql`
    query GetEmployee {
        searchById(_id:"${this.id}") {
          _id
          first_name
          last_name
          email
          gender
          designation
          salary
          date_of_joining
          department
          employee_photo
        }
      }
    `
    
    this.employeeApi.query(query).subscribe((result: any) => {
      this.error = JSON.stringify(result.errors)
      this.employee = result.data?.searchById
      this.loading = result.loading
      this.doj = formatDate(this.employee!.date_of_joining!, 'yyyy-MM-dd', 'en-US')
    })

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

  updateEmployee() {
    if (this.form?.valid) {
      let mutation = `_id: "${this.id}", `
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
          updateEmployee: updEmp(${mutation}) {
            _id
          }
        }
      `
      this.employeeApi.mutation(apiInput).subscribe((result: any) => {
        this.mutationError = JSON.stringify(result.errors)
        if(this.mutationError) {
          alert(`Failed to update profile.\n${this.mutationError}`)
        } else {
          alert("Profile updated!")
          this.router.navigateByUrl(`/employee/view/${result.data?.updateEmployee._id}`)
        }
      })
    }
  }

}
