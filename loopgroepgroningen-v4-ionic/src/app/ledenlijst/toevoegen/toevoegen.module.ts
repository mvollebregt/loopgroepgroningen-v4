import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ToevoegenPage} from './toevoegen.page';
import {SharedModule} from '../../shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: ToevoegenPage
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ToevoegenPage]
})
export class ToevoegenPageModule {
}
