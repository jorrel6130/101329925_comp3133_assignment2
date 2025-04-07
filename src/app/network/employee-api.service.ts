import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeApiService {

  constructor(private readonly apollo: Apollo) { }

  employeeQuery(query: any): Observable<any> {
    return this.apollo.watchQuery({
      query: query
    }).valueChanges
  }

  employeeMutation(mutation: any): Observable<any> {
    return this.apollo.mutate({
      mutation: mutation
    })
  }
}
