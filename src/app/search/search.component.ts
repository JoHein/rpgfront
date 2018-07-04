import { Component, OnInit } from '@angular/core';
import { Champ } from '../models/Champ.model';
import { SearchService } from './search.service';
import {ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class SearchComponent implements OnInit {

  seatchchamps: Champ[];
  text: Champ;

  constructor(private searchService: SearchService) { }

  ngOnInit() {
  }

  // search(term: string): void {
  //   this.searchService.searchChamp(term).subscribe( result => this.champs = result);
  // }

  search(event) {
    console.log('query.event', event.query);
    this.searchService.searchChamp(event.query)
      .subscribe(data => {
        this.seatchchamps = data;
    });
  }
  // updateList(text: string): void {
  //
  // }
}
