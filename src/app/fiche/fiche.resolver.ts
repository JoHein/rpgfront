import {Injectable} from '@angular/core';
import { Router, ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {FicheService} from './fiche.service';
import {Observable} from 'rxjs/index';

import {Champ} from '../models/Champ.model';
import {map, take} from 'rxjs/internal/operators';

@Injectable()
export class FicheResolver implements Resolve<Champ> {
  constructor(private ficheService: FicheService, private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    const techid = route.paramMap.get('techid');

    return this.ficheService.getChamp(techid).pipe(
      take(1),
      map( champ => {
        if (champ) {
          return champ;
        } else { // id not found
          this.router.navigate(['/fiche']);
          return null;
        }
      }
    ));
  }
}

