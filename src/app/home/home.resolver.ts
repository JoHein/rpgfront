import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {HomeService} from './home.service';
import {Observable} from 'rxjs/index';

import {Champ} from '../models/Champ.model';

@Injectable()
export class HomeResolver implements Resolve<Champ> {
  constructor(private homeService: HomeService) {
  }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return this.homeService.getListChamp();
  }
}

// @Injectable()
// export class GoogleAccountOneResolver implements Resolve<GoogleAccountModel> {
//   constructor(private googleAccountService: GoogleAccountService) {
//   }
//
//   resolve(route: ActivatedRouteSnapshot,
//           state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
//     return this.googleAccountService.get(route.params.id);
//   }
//
// }
