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
import {ButtonModule} from 'primeng/button';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {DropdownModule} from 'primeng/dropdown';
import {GrowlModule} from 'primeng/growl';
import {MessageService} from 'primeng/components/common/messageservice';
import {SplitButtonModule} from 'primeng/splitbutton';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {AutoCompleteModule} from 'primeng/autocomplete';

import { HomeComponent } from './home/home.component';
import { HomeService } from './home/home.service';
import { HomeResolver } from './home/home.resolver';

import { FicheComponent } from './fiche/fiche.component';
import { FicheService } from './fiche/fiche.service';
import { SearchComponent } from './search/search.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FicheComponent,
    SearchComponent
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
    FormsModule,
    InputTextareaModule,
    ButtonModule,
    DropdownModule,
    GrowlModule,
    SplitButtonModule,
    ConfirmDialogModule,
    AutoCompleteModule
  ],
  providers: [
    HomeService,
    HomeResolver,
    FicheService,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
