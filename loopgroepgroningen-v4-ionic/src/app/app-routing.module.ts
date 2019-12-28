import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: 'agenda', pathMatch: 'full'},
  {path: 'agenda', loadChildren: './agenda/agenda.module#AgendaPageModule'},
  {path: 'trainingsschema', loadChildren: './trainingsschema/trainingsschema.module#TrainingsschemaPageModule'},
  {path: 'ledenlijst', loadChildren: './ledenlijst/ledenlijst.module#LedenlijstPageModule'},
  {path: 'beheer', loadChildren: './beheer/beheer.module#BeheerPageModule'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
