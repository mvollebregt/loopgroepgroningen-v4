import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GroupedListComponent} from './grouped-list.component';
import {IonicModule} from '@ionic/angular';

const exports = [GroupedListComponent];

@NgModule({
  declarations: exports,
  imports: [CommonModule, IonicModule],
  exports
})
export class GroupedListModule {
}
