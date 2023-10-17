import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NotifierModule } from 'angular-notifier';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { TermsComponent } from './terms/terms.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddTermComponent } from './terms/add-term.component';
import { EditTermComponent } from './terms/edit-term.component';
import { RegleComponent } from './regles/regle.component';
import { EditRegleComponent } from './regles/edit-regle.component';
import { AddRegleComponent } from './regles/add-regle.component';
@NgModule({
  declarations: [
    AppComponent,
    RegleComponent,
    TermsComponent,
    EditTermComponent,
    AddTermComponent,
    EditRegleComponent,
    AddRegleComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    AppRoutingModule,
    NgbModule,
    NotifierModule.withConfig({
      position: {
        horizontal: {
          position: 'right',
          distance: 12
        },
        vertical: {
          position: 'top',
          distance: 12
        }
      },
      behaviour: {
        autoHide: 2000,
        onClick: false,
        stacking: 2
      }
      
    }),
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }