import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, of } from 'rxjs/index';
import {catchError , tap} from 'rxjs/internal/operators';
import { Champ } from '../models/Champ.model';
import { Injectable } from '@angular/core';
import {MessageService } from '../message/message.service';

@Injectable()
export class HomeService {



  private listChamp = '/api/champ';

  constructor(private http: HttpClient, private messageService: MessageService) { }

  getListChamp(): Observable<Champ[]> {
    return this.http.get<Champ[]>(this.listChamp)
      .pipe(
        tap(champ => this.log(`fetched list champ`)),
        catchError(this.handleError('getListChamp', [] ))
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
