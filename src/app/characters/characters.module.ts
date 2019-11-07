import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CharactersRoutingModule} from './characters-routing.module';
import {CharactersListComponent} from './character-list/characters-list.component';
import {CharactersDetailComponent} from './character-detail/characters-detail.component';
import {
  MatButtonModule,
  MatCardModule, MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatOptionModule,
  MatRadioModule,
  MatSelectModule,
  MatStepperModule
} from '@angular/material';
import {MatChipsModule} from '@angular/material/chips';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MdePopoverModule} from '@material-extended/mde';
import { CharacterCreateComponent } from './character-create/character-create.component';
import {SnakecasePipe} from './snakecase.pipe';
import { CharacterSheetComponent } from './character-sheet/character-sheet.component';
import { GreeterComponent } from './greeter/greeter.component';

@NgModule({
  declarations: [
    CharactersListComponent,
    CharactersDetailComponent,
    CharacterCreateComponent,
    SnakecasePipe,
    CharacterSheetComponent,
    GreeterComponent
  ],
  imports: [
    CommonModule,
    CharactersRoutingModule,
    MatFormFieldModule,
    FormsModule, MdePopoverModule,
    MatCardModule,
    MatInputModule, MatOptionModule, MatSelectModule, MatStepperModule, ReactiveFormsModule, MatRadioModule, MatButtonModule, MatChipsModule, MatDialogModule
  ],
  entryComponents: [GreeterComponent]

})
export class CharactersModule {
}
