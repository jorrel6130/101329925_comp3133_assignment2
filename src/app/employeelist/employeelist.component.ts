import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { GET_ALL } from '../graphql/graphql.queries';
import { Employee } from '../models/employee';

@Component({
  selector: 'app-employeelist',
  imports: [],
  templateUrl: './employeelist.component.html',
  styleUrl: './employeelist.component.css'
})
export class EmployeelistComponent implements OnInit {

  employees: Employee[] = [];
  loading = true;
  error: any;

  constructor(private readonly apollo: Apollo) { }

  ngOnInit(): void {
    this.apollo
      .watchQuery({
        query: GET_ALL
      }).valueChanges.subscribe((result: any) => {
        this.employees = result.data?.getAll
        this.loading = result.loading
        this.error = result.error
      })
  }

  deleteEmployee(id: any) {
    console.log(id)
    this.apollo.mutate({
      mutation: gql`
                mutation {
                  deleteEmployee: delEmp(_id: "${id}")
                }
              `
    }).subscribe((result: any) => {
      alert(`Employee ID ${id} successfully deleted`)
      window.location.reload()
    })
  }

}
