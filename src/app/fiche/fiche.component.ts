import { Component, OnInit } from '@angular/core';
import { Champ } from '../models/Champ.model';
import { FicheService } from './fiche.service';
import {SelectItem} from 'primeng/api';
import {MessageService} from 'primeng/components/common/messageservice';
import { Message } from 'primeng/primeng';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-fiche',
  templateUrl: './fiche.component.html',
  styleUrls: ['./fiche.component.css'],
  providers: [MessageService]
})
export class FicheComponent implements OnInit {

  champ = new Champ;
  spe: SelectItem[];
  msgs: Message[] = [];

  constructor(private ficheService: FicheService,
              private messageService: MessageService,
              private route: ActivatedRoute) {
    this.spe = [
      {label: 'Guerrier', value: 'GUERRIER'},
      {label: 'Mage', value: 'MAGE'},
      {label: 'Scout', value: 'SCOUT'},
      {label: 'Bandit', value: 'BANDIT'},
      {label: 'Pretre', value: 'PRETRE'}
    ];
  }

  ngOnInit() {
    this.route.data.subscribe(data => {
      if (data.champ) {
        console.log('cahmp coming from data :: ', data);
        console.log('cahmp coming from data :: ', this.champ);

        this.champ = data.champ;
      } else {
        this.champ = new Champ;
        console.log('si pas de techId:: ', this.champ);

      }
    });

  }

  addChampForm(item: Champ): void {
    console.log('item', item);
    this.ficheService.addChamp(item)
      .subscribe(
        succ => {
          this.messageService.add({severity: 'success', summary: 'Ajout Personnage', detail: succ.prenom + ' ' + succ.nom});
        },
        err => {
          this.messageService.add({severity: 'error', summary: 'Ajout Personnage', detail: err});
        }
      );
  }

}
