import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: '/characters', pathMatch: 'full'},
  {path: '', redirectTo: '/encounters', pathMatch: 'full'},

];


@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: true} // <-- debugging purposes only
  )],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
