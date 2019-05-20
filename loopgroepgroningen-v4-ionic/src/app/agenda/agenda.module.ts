import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {AgendaPage} from './agenda.page';
import {FormattingModule} from '../shared/formatting/formatting.module';
import {GroupedListModule} from '../shared/grouped-list/grouped-list.module';

const routes: Routes = [
  {
    path: '',
    component: AgendaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    FormattingModule,
    GroupedListModule
  ],
  declarations: [AgendaPage]
})
export class AgendaPageModule {
}
