import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Champ } from '../models/Champ.model';
import { SearchService } from './search.service';
import {ViewEncapsulation} from '@angular/core';
import { Observable } from 'rxjs';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class SearchComponent implements OnInit {

  value = '';
  searchchamps: String[];
  @Input() listchampssearch: Champ[];
  @Output() bized = new EventEmitter<Champ[]>();

  constructor(private searchService: SearchService, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  search(event) {
    // console.log('query.event', event.query);
    console.log('value', this.value);

    if (this.value) {
      this.searchService.searchChamp(this.value)
        .subscribe(data => {
          this.listchampssearch = data;
          console.log('data du value', data);
          this.transfert(data);
          this.value = '';
        });
    } else {
      this.searchService.searchChamp(event.query)
        .subscribe(data => {
          this.listchampssearch = data;
          console.log('data du query', data);
          this.transfert(data);
        });
    }

  }

  transfert(data: Champ[]): void {
    this.searchchamps = [];
    for ( let i = 0, len = data.length; i < len; i++) {
      console.log(data[i].nom);
      if (!this.searchchamps.includes(data[i].nom)) {
        this.searchchamps.push(data[i].nom);
      }
    }
    console.log('this.searchchamps', this.searchchamps);
  }

  updateList(): void {
    this.bized.emit(this.listchampssearch);
  }

  onEnter(value: string) {
    this.value = value;
    this.search(null);
  }

}
