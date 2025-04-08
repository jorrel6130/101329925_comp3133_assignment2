import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeApiService {

  constructor(private readonly apollo: Apollo) { }

  query(query: any): Observable<any> {
    return this.apollo.watchQuery({
      query: query,
      errorPolicy: 'all'
    }).valueChanges
  }

  mutation(mutation: any): Observable<any> {
    return this.apollo.mutate({
      mutation: mutation,
      errorPolicy: 'all'
    })
  }
}
