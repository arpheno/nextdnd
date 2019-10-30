import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CharactersRoutingModule} from './characters-routing.module';
import {CharactersListComponent} from './character-list/characters-list.component';
import {CharactersDetailComponent} from './character-detail/characters-detail.component';
import {
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatOptionModule,
  MatRadioModule,
  MatSelectModule,
  MatStepperModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MdePopoverModule} from '@material-extended/mde';
import { CharacterCreateComponent } from './character-create/character-create.component';
import {SnakecasePipe} from './snakecase.pipe';

@NgModule({
  declarations: [
    CharactersListComponent,
    CharactersDetailComponent,
    CharacterCreateComponent,
    SnakecasePipe
  ],
  imports: [
    CommonModule,
    CharactersRoutingModule,
    MatFormFieldModule,
    FormsModule, MdePopoverModule,
    MatCardModule,
    MatInputModule, MatOptionModule, MatSelectModule, MatStepperModule, ReactiveFormsModule, MatRadioModule
  ]
})
export class CharactersModule {
}
