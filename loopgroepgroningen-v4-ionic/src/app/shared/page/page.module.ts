import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {NgModule} from '@angular/core';
import {PageComponent} from './page.component';
import {RouterModule} from '@angular/router';

const exports = [PageComponent];

@NgModule({
  declarations: exports,
  imports: [CommonModule, IonicModule, RouterModule.forChild([])],
  exports
})
export class PageModule {
}
