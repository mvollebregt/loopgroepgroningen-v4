import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {ToevoegenPage} from './toevoegen.page';

const routes: Routes = [
  {
    path: '',
    component: ToevoegenPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ToevoegenPage]
})
export class ToevoegenPageModule {
}
