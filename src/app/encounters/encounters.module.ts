import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EncounterDetailComponent} from './encounter-detail/encounter-detail.component';
import {EncountersRoutingModule} from './encounters-routing.module';
import { EncounterListComponent } from './encounter-list/encounter-list.component';
import {KanvasComponent} from './kanvas/kanvas.component';
import {PartyComponent} from './party/party.component';
import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule, MatInputModule,
  MatMenuModule,
  MatRadioModule
} from '@angular/material';
import {MdePopoverModule} from '@material-extended/mde';
import {FormsModule} from '@angular/forms';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {NgDragDropModule} from 'ng-drag-drop';
import {TraitComponent} from './trait/trait.component';

@NgModule({
  declarations: [
    EncounterDetailComponent,
    EncounterListComponent,
    KanvasComponent,
    PartyComponent,
    TraitComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatRadioModule,
    MdePopoverModule,
    MatIconModule,
    FormsModule,
    EncountersRoutingModule,
    DragDropModule,
    NgDragDropModule.forRoot(),
    MatFormFieldModule,
    MatMenuModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatRadioModule,
    MatInputModule,
  ]
})
export class EncountersModule { }
