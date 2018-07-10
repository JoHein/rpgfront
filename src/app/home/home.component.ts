import { Component, OnInit, Input } from '@angular/core';
import { HomeService } from './home.service';
import { Champ } from '../models/Champ.model';
import {ActivatedRoute} from '@angular/router';
import {ConfirmationService} from 'primeng/api';
import {Router} from '@angular/router';
import {MessageService} from 'primeng/components/common/messageservice';
import { Message } from 'primeng/primeng';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ConfirmationService],
})
export class HomeComponent implements OnInit {

  champList: Champ[];
  items: MenuItem[];
  msgs: Message[] = [];
  champ: Champ;
  data: any;
  listDataGraph = [];
  options: any;


  constructor(private homeService: HomeService,
              private route: ActivatedRoute,
              private confirmationService: ConfirmationService,
              private router: Router,
              private messageService: MessageService) { }

  ngOnInit() {

    this.route.data.subscribe(data => this.champList = data.champListRes);
    this.items = [
      {label: 'Suppression', icon: 'fa-close', command: () => { this.delete(this.champ); }},
    ];

    this.listDataGraph = new Array(this.champList.length);
  }

  selectedChamp(item: Champ): void {
    this.champ = item;
  }

  update(champ: Champ): void {
    this.router.navigate(['fiche', champ.techid]);
  }

  delete(champ: Champ): void {
    console.log('in delete', champ);
    this.confirmationService.confirm(
      {
        message: 'Etes vous sur de vouloir supprimer ce personnage?',
        header: 'Suppression',
        icon: 'fa fa-trash',
        accept: () => {
          this.homeService.deleteChamp(champ).subscribe(
            succ => {
              this.champList = this.champList.filter(c => c !== champ);
              this.messageService.add({severity: 'success', summary: 'Suppression Personnage', detail: champ.prenom + ' ' + champ.nom});
            },
            err => {
              this.messageService.add({severity: 'error', summary: 'Suppression Personnage', detail: err.message});
            }
          );
        },
        reject: () => {
          console.log('champ', champ);
          this.messageService.add({severity: 'warning', summary: 'Suppression Personnage', detail: 'Annulé'});
        }
      }
    );
  }

  onBized(listchampssearch: Champ[]) {
    console.log('in controller dat is not' , listchampssearch);
    this.champList = [];
    this.champList = listchampssearch;
  }

  onTabOpen(event) {

    console.log(event.index);

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
          data: [this.champList[event.index].agilite, this.champList[event.index].force, this.champList[event.index].intelect,
            this.champList[event.index].magie, this.champList[event.index].endurance, this.champList[event.index].charisme]
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

    this.listDataGraph[event.index] = this.data;

  }

}
