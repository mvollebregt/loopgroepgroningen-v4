import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ToevoegenPage} from './toevoegen.page';
import {SharedModule} from '../../shared/shared.module';
import {LgFormsModule} from '../../shared/lg-forms/lg-forms.module';

const routes: Routes = [
  {
    path: '',
    component: ToevoegenPage
  }
];

@NgModule({
  imports: [
    SharedModule,
    LgFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ToevoegenPage]
})
export class ToevoegenPageModule {
}
