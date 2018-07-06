import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, of } from 'rxjs/index';
import {catchError , tap} from 'rxjs/internal/operators';
import { Champ } from '../models/Champ.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable()
export class FicheService {
  private champUrl = '/api/champ';

  constructor(private http: HttpClient) { }

  addChamp(item: Champ): Observable<Champ> {
    console.log('dans la request', item);
    return this.http.post<Champ>(this.champUrl, item , httpOptions)
      .pipe(
        tap((champ: Champ ) => console.log(`added hero w/ id=${champ.techid}`)),
        catchError(this.handleError<Champ>('addHero'))
      );
  }

  getChamp(techid: string): Observable<Champ> {
    const url = `${this.champUrl}/${techid}`;
    return this.http.get<Champ>(url).pipe(
      tap(_ => console.log(`fetched champ id=${techid}`)),
      catchError(this.handleError<Champ>(`getChamp techId=${techid}`))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      console.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }
}
