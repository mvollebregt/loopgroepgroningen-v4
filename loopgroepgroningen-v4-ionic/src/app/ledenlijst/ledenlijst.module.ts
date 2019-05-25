import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {LedenlijstPage} from './ledenlijst.page';

const routes: Routes = [
  {path: '', component: LedenlijstPage},
  {path: 'toevoegen', loadChildren: './ledenlijst/toevoegen/toevoegen.module#ToevoegenPageModule'}
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LedenlijstPage]
})
export class LedenlijstPageModule {
}
