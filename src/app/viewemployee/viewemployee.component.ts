import { Component, OnInit } from '@angular/core';
import { Employee } from '../models/employee';
import { Apollo, gql } from 'apollo-angular';
import { ActivatedRoute } from '@angular/router';
import { formatDate } from '@angular/common';
import { EmployeeApiService } from '../network/employee-api.service';

@Component({
  selector: 'app-viewemployee',
  imports: [],
  templateUrl: './viewemployee.component.html',
  styleUrl: './viewemployee.component.css'
})
export class ViewemployeeComponent implements OnInit {

  employee: Employee | undefined;
  loading = true;
  error: any;
  id: any = ''
  doj: any;
  created: any;
  updated: any;
  
  constructor(private readonly apollo: Apollo, private route: ActivatedRoute, private employeeApi: EmployeeApiService) {}

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
          created_at
          updated_at
        }
      }
    `

    this.employeeApi.employeeQuery(query).subscribe((result: any) => {
      this.employee = result.data?.searchById
      this.loading = result.loading
      this.error = result.error
      this.doj = formatDate(this.employee!.date_of_joining!, 'dd/MM/yyyy', 'en-US')
      this.created = formatDate(this.employee!.created_at!, 'dd/MM/yyyy', 'en-US')
      this.updated = formatDate(this.employee!.updated_at!, 'dd/MM/yyyy', 'en-US')
    })
  }
}
