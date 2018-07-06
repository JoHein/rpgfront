/**
 * https://angular.io/tutorial/toh-pt5#refactor-routes-to-a-routing-module
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { HomeResolver } from './home/home.resolver';
import { FicheComponent } from './fiche/fiche.component';
import {FicheResolver} from './fiche/fiche.resolver';

const routes: Routes = [
  { path: 'home', component: HomeComponent, resolve: {champListRes: HomeResolver}},
  { path: 'fiche', component: FicheComponent},
  { path: 'fiche/:techid', component: FicheComponent, resolve: {champ: FicheResolver} },

  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home', pathMatch: 'full' }
];

export const AppRoutingHash = RouterModule.forRoot(routes, {useHash: true});

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}

