import { Regle } from './../models/regle.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Constants } from '../shared/constants';

@Injectable({
  providedIn: 'root'
})
export class ReglesService {

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Regle[]> {
    return this.httpClient.get<Regle[]>(Constants.apiURL + '/regles')
    .pipe(
      catchError(this.errorHandler)
    )
  }

  deleteRegleById(regle: Regle): Observable<any> {
    return this.httpClient.delete(Constants.apiURL + '/regles/' + regle.id);
  }

  getRegleById(regleId: any):  Observable<any>{
    return this.httpClient.get(Constants.apiURL + '/regles/' + regleId);
  }

  createRegle(regle: any):Observable<any>{
    return this.httpClient.post(Constants.apiURL + '/regles', regle);
  }

  editRegle(regle: any, regleId: any):Observable<any>{
    return this.httpClient.put(Constants.apiURL + '/regles/'+regleId, regle);
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
