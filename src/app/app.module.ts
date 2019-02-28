import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDialogModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatRadioModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatToolbarModule
} from '@angular/material';
import {PartyComponent} from './party/party.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {EncounterComponent} from './encounter/encounter.component';
import {TraitComponent} from './trait/trait.component';
import {MonsterComponent} from './monster/monster.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {NgDragDropModule} from 'ng-drag-drop';
import {AttakComponent} from './attak/attak.component';
import {MdePopoverModule} from '@material-extended/mde';
import {KanvasComponent} from './kanvas/kanvas.component';
import {WebsocketService} from './websocket.service';
import {BoardServiceService} from './board-service.service';
import {CharactersModule} from './characters/characters.module';

@NgModule({
  declarations: [
    AppComponent,
    PartyComponent,
    EncounterComponent,
    TraitComponent,
    MonsterComponent,
    AttakComponent,
    KanvasComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatSidenavModule,
    MatMenuModule,
    MatExpansionModule,
    MatListModule,
    MatButtonModule,
    HttpClientModule,
    FormsModule,
    MatCardModule,
    MatSnackBarModule,
    DragDropModule,
    NgDragDropModule.forRoot(),
    MatDialogModule,
    MatRadioModule,
    MdePopoverModule,
    MatIconModule,
    CharactersModule,
    AppRoutingModule,
  ],
  entryComponents: [AttakComponent],
  providers: [WebsocketService, BoardServiceService],
  bootstrap: [AppComponent]
})

export class AppModule {
}
