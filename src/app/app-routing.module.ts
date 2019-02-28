import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EncounterComponent} from './encounter/encounter.component';

const routes: Routes = [
  {path: 'encounter', component: EncounterComponent},
  {path: '', redirectTo: '/characters', pathMatch: 'full'},

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
