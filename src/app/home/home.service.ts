import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, of } from 'rxjs/index';
import {catchError , tap} from 'rxjs/internal/operators';
import { Champ } from '../models/Champ.model';
import { Injectable } from '@angular/core';
import {MessageService } from '../message/message.service';

@Injectable()
export class HomeService {



  private champUrl = '/api/champ';

  constructor(private http: HttpClient, private messageService: MessageService) { }

  getListChamp(): Observable<Champ[]> {
    return this.http.get<Champ[]>(this.champUrl)
      .pipe(
        tap(champ => this.log(`fetched list champ`)),
        catchError(this.handleError('getListChamp', [] ))
      );
  }

  getChamp(techid: number): Observable<Champ> {
    const url = `${this.champUrl}/${techid}`;
    return this.http.get<Champ>(url).pipe(
      tap(_ => this.log(`fetched champ id=${techid}`)),
      catchError(this.handleError<Champ>(`getChamp techId=${techid}`))
    );
  }



  private log(message: string) {
    this.messageService.add('HomeService : ' + message);
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

}
