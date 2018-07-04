import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs/index';
import {catchError , tap} from 'rxjs/internal/operators';
import { Champ } from '../models/Champ.model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private champUrl = '/api/champ';

  constructor(private http: HttpClient) { }

  searchChamp(nom: string): Observable<Champ[]> {
    if (!nom.trim()) {
      return of([]);
    }
    console.log(nom);
    return this.http.get<Champ[]>(`${this.champUrl}/search/?nom=${nom}`)
      .pipe(
        tap(result => console.log(`found champ matching "${nom}"`)),
      catchError(this.handleError<Champ[]>('searchChamp', []))
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
