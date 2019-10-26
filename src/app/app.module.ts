import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatExpansionModule,
  MatFormFieldModule, MatIconModule,
  MatButtonToggleModule,
  MatInputModule,
  MatListModule,
  MatMenuModule, MatRadioModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatToolbarModule, MatSliderModule
} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {MonsterComponent} from './monster/monster.component';
import {AttakComponent} from './attak/attak.component';
import {WebsocketService} from './websocket.service';
import {BoardServiceService} from './board-service.service';
import {CharactersModule} from './characters/characters.module';
import {EncountersModule} from './encounters/encounters.module';
import { PriceidComponent } from './priceid/priceid.component';
import { FretboardComponent } from './fretboard/fretboard.component';
import { MetronomeComponent } from './metronome/metronome.component';
import { UiComponent } from './ui/ui.component';

@NgModule({
  declarations: [
    AppComponent,
    MonsterComponent,
    AttakComponent,
    PriceidComponent,
    FretboardComponent,
    MetronomeComponent,
    UiComponent,
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
    CharactersModule,
    EncountersModule,
    AppRoutingModule,
    MatIconModule,
    MatRadioModule,
    MatButtonToggleModule,
    MatSliderModule
  ],
  entryComponents: [AttakComponent],
  providers: [WebsocketService, BoardServiceService],
  bootstrap: [AppComponent]
})

export class AppModule {
}
