import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CharactersRoutingModule} from './characters-routing.module';
import {CharactersListComponent} from './character-list/characters-list.component';
import {CharactersDetailComponent} from './character-detail/characters-detail.component';
import {
  MatButtonModule,
  MatCardModule, MatDialogModule,
  MatFormFieldModule, MatIconModule,
  MatInputModule,
  MatOptionModule,
  MatRadioModule,
  MatSelectModule,
  MatStepperModule, MatTabsModule, MatTooltipModule
} from '@angular/material';
import {MatChipsModule} from '@angular/material/chips';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CharacterCreateComponent } from './character-create/character-create.component';
import {SnakecasePipe} from './snakecase.pipe';
import { CharacterSheetComponent } from './character-sheet/character-sheet.component';
import { GreeterComponent } from './greeter/greeter.component';
import { PictureRadioComponent } from './character-create/picture-radio/picture-radio.component';
import {MdePopoverModule} from '@material-extended/mde';
import { ChoicechooserComponent } from './character-create/choicechooser/choicechooser.component';
import { LevelupComponent } from './levelup/levelup.component';
import { TooltipModule } from 'ng2-tooltip-directive';

@NgModule({
  declarations: [
    CharactersListComponent,
    CharactersDetailComponent,
    CharacterCreateComponent,
    SnakecasePipe,
    CharacterSheetComponent,
    GreeterComponent,
    PictureRadioComponent,
    ChoicechooserComponent,
    LevelupComponent,
  ],
  imports: [
    CommonModule,
    CharactersRoutingModule,
    MatFormFieldModule,
    FormsModule,
    TooltipModule,
    MatCardModule,
    MatInputModule, MatOptionModule, MatSelectModule, MatStepperModule, ReactiveFormsModule, MatRadioModule, MatButtonModule, MatChipsModule, MatDialogModule, MdePopoverModule, MatTooltipModule, TooltipModule, MatTabsModule, MatIconModule
  ],
  entryComponents: [GreeterComponent]

})
export class CharactersModule {
}
