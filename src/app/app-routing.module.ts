import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PriceidComponent} from "./priceid/priceid.component";
import {FretboardComponent} from "./fretboard/fretboard.component";
import {UiComponent} from "./ui/ui.component";

const routes: Routes = [
  {path: '', redirectTo: '/characters', pathMatch: 'full'},
  {path: '', redirectTo: '/encounters', pathMatch: 'full'},
  {path: 'price_id', component: PriceidComponent},
  {path: 'fretboard', component: FretboardComponent},
  {path: 'ui', component: UiComponent},

];


@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: true} // <-- debugging purposes only
  )],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
