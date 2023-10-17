import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Term } from '../models/term.model';
import { Constants } from '../shared/constants';

@Injectable({
  providedIn: 'root'
})
export class TermsService {

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Term[]> {
    return this.httpClient.get<Term[]>(Constants.apiURL + '/terms')
    .pipe(
      catchError(this.errorHandler)
    )
  }

  deleteTermById(term: Term): Observable<any> {
    return this.httpClient.delete(Constants.apiURL + '/terms/' + term.id);
  }

  getTermById(termId: any):  Observable<any>{
    return this.httpClient.get(Constants.apiURL + '/terms/' + termId);
  }

  editTerm(term: any):Observable<any>{
    return this.httpClient.put(Constants.apiURL + '/terms/'+term.id, term);
  }

  createTerm(term: any):Observable<any>{
    return this.httpClient.post(Constants.apiURL + '/terms', term);
  }

  errorHandler(error:any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
 }
}
