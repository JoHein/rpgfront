import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppRoutingHash } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import {AccordionModule} from 'primeng/accordion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {KeyFilterModule} from 'primeng/keyfilter';
import {InputTextModule} from 'primeng/inputtext';
import {RadioButtonModule} from 'primeng/radiobutton';
import {InputSwitchModule} from 'primeng/inputswitch';

import { HomeComponent } from './home/home.component';
import { HomeService } from './home/home.service';
import { HomeResolver } from './home/home.resolver';

import { MessageComponent } from './message/message.component';
import { FicheComponent } from './fiche/fiche.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MessageComponent,
    FicheComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppRoutingHash,
    HttpClientModule,
    AccordionModule,
    BrowserAnimationsModule,
    KeyFilterModule,
    InputTextModule,
    RadioButtonModule,
    InputSwitchModule,
    FormsModule
  ],
  providers: [
    HomeService,
    HomeResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
