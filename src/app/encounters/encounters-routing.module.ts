import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EncounterDetailComponent} from './encounter-detail/encounter-detail.component';
import {EncounterListComponent} from './encounter-list/encounter-list.component';

const routes: Routes = [
  {path: 'encounters', component: EncounterListComponent},
  {path: 'encounters/:id', component: EncounterDetailComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EncountersRoutingModule {
}
