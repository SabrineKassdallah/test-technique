import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TermsComponent } from './terms/terms.component';
import { AddTermComponent } from './terms/add-term.component';
import { EditTermComponent } from './terms/edit-term.component';
import { RegleComponent } from './regles/regle.component';
import { EditRegleComponent } from './regles/edit-regle.component';
import { AddRegleComponent } from './regles/add-regle.component';

const routes: Routes = [
  { path: '', redirectTo: 'regles', pathMatch: 'full'},
  {
    path: 'terms', component: TermsComponent
  },
  { path: 'terms/add', component: AddTermComponent },
  { path: 'terms/edit/:termId', component: EditTermComponent } ,

  {
    path: 'regles',
    component: RegleComponent
  },
  { path: 'regles/add', component: AddRegleComponent },
  { path: 'regles/edit/:regleId', component: EditRegleComponent } 


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
