import { Component, OnInit } from '@angular/core';
import { Employee } from '../models/employee';
import { Apollo, gql } from 'apollo-angular';
import { resolveObjMapThunk } from 'graphql';
import { GET_ALL } from '../graphql/graphql.queries';

@Component({
  selector: 'app-employeelist',
  imports: [],
  templateUrl: './employeelist.component.html',
  styleUrl: './employeelist.component.css'
})
export class EmployeelistComponent implements OnInit {
  
  employees: any[] = [];
  loading = true;
  error: any;
  
  constructor(private readonly apollo: Apollo) {}

  ngOnInit(): void {
    this.apollo
    .watchQuery({
      query: GET_ALL
    }).valueChanges.subscribe(( result: any) => {
      this.employees = result.data?.getAll
      this.loading = result.loading
      this.error = result.error
    })
  }

}
