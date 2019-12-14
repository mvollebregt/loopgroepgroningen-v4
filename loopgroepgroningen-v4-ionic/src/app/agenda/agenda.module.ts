import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {AgendaPage} from './agenda.page';
import {FormattingModule} from '../shared/formatting/formatting.module';
import {GroupedListModule} from '../shared/grouped-list/grouped-list.module';
import {SharedModule} from '../shared/shared.module';

const routes: Routes = [
  {path: '', component: AgendaPage},
  {path: 'toevoegen', loadChildren: './toevoegen/evenement-toevoegen.module#EvenementToevoegenPageModule'},
  {path: ':id', loadChildren: './detail/evenement-detail.module#EvenementDetailPageModule'}
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    FormattingModule,
    GroupedListModule,
    SharedModule
  ],
  declarations: [AgendaPage]
})
export class AgendaPageModule {
}
