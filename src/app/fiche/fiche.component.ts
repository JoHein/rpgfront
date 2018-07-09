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
  data: any;
  options: any;

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
        this.updateRadar();
      } else {
        this.champ = new Champ;
        console.log('si pas de techId:: ', this.champ);
        // this.data = {
        //   labels: ['Agilité', 'Force', 'Intelligence', 'Magie', 'Endurance', 'Charisme'],
        //   datasets: [
        //     {
        //       label: 'Stats',
        //       backgroundColor: 'rgba(86, 97, 255,0.2)',
        //       borderColor: 'rgba(11, 22, 183,1)',
        //       pointBackgroundColor: 'rgba(11, 22, 183,1)',
        //       pointBorderColor: '#fff',
        //       pointHoverBackgroundColor: '#fff',
        //       pointHoverBorderColor: 'rgba(11, 22, 183,1)',
        //       data: [0, 0, 0, 0, 0, 0]
        //     }
        //   ]
        // };
        //
        // this.options = {
        //   spanGaps: false,
        //   elements: {
        //     line: {
        //       tension: 0.000001
        //     }
        //   },
        //   scale: {
        //     ticks: {
        //       beginAtZero: true
        //     }
        //   },
        //   plugins: {
        //     filler: {
        //       propagate: false
        //     },
        //     'samples-filler-analyser': {
        //       target: 'chart-analyser'
        //     }
        //   }
        // };
        this.updateRadar();
      }
    });

  }

  updateRadar() {
    this.data = {
      labels: ['Agilité', 'Force', 'Intelligence', 'Magie', 'Endurance', 'Charisme'],
      datasets: [
        {
          label: 'Stats',
          backgroundColor: 'rgba(86, 97, 255,0.2)',
          borderColor: 'rgba(11, 22, 183,1)',
          pointBackgroundColor: 'rgba(73, 181, 244,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(11, 22, 183,1)',
          pointRadius: 5,
          pointHoverRadius: 6,
          data: [this.champ.agilite, this.champ.force, this.champ.intelect, this.champ.magie, this.champ.endurance, this.champ.charisme]
        }
      ]
    };

    this.options = {
      spanGaps: false,
      elements: {
        line: {
          tension: 0.000001
        },
      },
      scale: {
        ticks: {
          beginAtZero: true
        }
      },
    };

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
