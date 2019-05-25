import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PageModule} from './page/page.module';
import {IonicModule} from '@ionic/angular';

@NgModule({
  exports: [CommonModule, IonicModule, PageModule]
})
export class SharedModule {
}
