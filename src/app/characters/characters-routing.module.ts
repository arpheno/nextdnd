import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CharactersListComponent} from './character-list/characters-list.component';
import {CharactersDetailComponent} from './character-detail/characters-detail.component';


const routes: Routes = [
  { path: 'characters',  component: CharactersListComponent },
  { path: 'characters/:id', component: CharactersDetailComponent }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CharactersRoutingModule { }
