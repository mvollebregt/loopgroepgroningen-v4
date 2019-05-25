import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LedenlijstPage} from './ledenlijst.page';
import {SharedModule} from '../shared/shared.module';

const routes: Routes = [
  {path: '', component: LedenlijstPage},
  {path: 'toevoegen', loadChildren: './toevoegen/toevoegen.module#ToevoegenPageModule'}
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LedenlijstPage]
})
export class LedenlijstPageModule {
}
