import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {BeheerPage} from './beheer.page';
import {PageModule} from '../shared/page/page.module';

const routes: Routes = [
  {
    path: '',
    component: BeheerPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    PageModule
  ],
  declarations: [BeheerPage]
})
export class BeheerPageModule {
}
