import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { GET_ALL } from '../graphql/graphql.queries';
import { Employee } from '../models/employee';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeApiService } from '../network/employee-api.service';

@Component({
  selector: 'app-employeelist',
  imports: [ReactiveFormsModule],
  templateUrl: './employeelist.component.html',
  styleUrl: './employeelist.component.css'
})
export class EmployeelistComponent implements OnInit {

  employees: Employee[] = [];
  loading = true;
  error: any;
  form: any;
  desOrDep: any;
  name: any;

  constructor(private readonly apollo: Apollo, private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute, private employeeApi: EmployeeApiService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      desOrDep: new FormControl(),
      name: new FormControl()
    })

    this.desOrDep = this.route.snapshot.queryParamMap.get('desordep')
    this.name = this.route.snapshot.queryParamMap.get('name')

    const query = gql`
      query{
        getAll: searchByDesOrDep(option: "${this.desOrDep}", query: "${this.name}") {
          _id
          first_name
          last_name
          designation
          department
        }
      }
    `
    if (this.name) {
      this.employeeApi.query(query).subscribe((result: any) => {
          this.employees = result.data?.getAll
          this.loading = result.loading
          this.error = result.error
        })
    } else {
      this.employeeApi.query(GET_ALL).subscribe((result: any) => {
          this.employees = result.data?.getAll
          this.loading = result.loading
          this.error = result.error
        })
    }
  }

  deleteEmployee(id: any) {
    const mutation = gql`
      mutation {
        deleteEmployee: delEmp(_id: "${id}")
      }
    `
    this.employeeApi.mutation(mutation).subscribe((result: any) => {
      alert(`Employee ID ${id} successfully deleted`)
      window.location.reload()
    })
  }

  search() {
    if (this.form?.valid) {
      this.desOrDep = this.form.value.desOrDep
      this.name = this.form.value.name
      if (this.name) {
        this.router.navigateByUrl(`/employee?desordep=${this.desOrDep}&name=${this.name}`)
        const query = gql`
          query{
            getAll: searchByDesOrDep(option: "${this.desOrDep}", query: "${this.name}") {
              _id
              first_name
              last_name
              designation
              department
            }
          }
        `
        this.employeeApi.query(query).subscribe((result: any) => {
          this.employees = result.data?.getAll
          this.loading = result.loading
          this.error = result.error
        })
      }
      
    }
  }

}
