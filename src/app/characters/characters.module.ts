import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CharactersRoutingModule} from './characters-routing.module';
import {CharactersListComponent} from './character-list/characters-list.component';
import {CharactersDetailComponent} from './character-detail/characters-detail.component';
import {MatCardModule, MatFormFieldModule, MatInputModule, MatOptionModule, MatSelectModule} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {MdePopoverModule} from '@material-extended/mde';

@NgModule({
  declarations: [
    CharactersListComponent,
    CharactersDetailComponent,
  ],
  imports: [
    CommonModule,
    CharactersRoutingModule,
    MatFormFieldModule,
    FormsModule, MdePopoverModule,
    MatCardModule,
    MatInputModule, MatOptionModule, MatSelectModule,
  ]
})
export class CharactersModule {
}
