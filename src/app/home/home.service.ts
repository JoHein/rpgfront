import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs/index';
import {catchError , tap} from 'rxjs/internal/operators';
import { Champ } from '../models/Champ.model';
import { Injectable } from '@angular/core';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class HomeService {

  private champUrl = '/api/champ';

  constructor(private http: HttpClient) { }

  getListChamp(): Observable<Champ[]> {
    return this.http.get<Champ[]>(this.champUrl)
      .pipe(
        tap(champ => console.log(`fetched list champ`)),
        catchError(this.handleError('getListChamp', [] ))
      );
  }

  getChamp(techid: number): Observable<Champ> {
    const url = `${this.champUrl}/${techid}`;
    return this.http.get<Champ>(url).pipe(
      tap(_ => console.log(`fetched champ id=${techid}`)),
      catchError(this.handleError<Champ>(`getChamp techId=${techid}`))
    );
  }

  deleteChamp(champ: Champ | number): Observable<Champ> {
    const techid = typeof champ === 'number' ? champ : champ.techid;
    const url = `${this.champUrl}/${techid}`;

    return this.http.delete<Champ>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted champ techid=${techid}`)),
      catchError(this.handleError<Champ>('deleteChamp'))
    );
  }


  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      console.log(`${operation} failed: ${error.message}`);

      return  throwError(error);
    };
  }

}
