import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LidToevoegenPage} from './lid-toevoegen.page';
import {SharedModule} from '../../shared/shared.module';
import {LgFormsModule} from '../../shared/lg-forms/lg-forms.module';

const routes: Routes = [
  {
    path: '',
    component: LidToevoegenPage
  }
];

@NgModule({
  imports: [
    SharedModule,
    LgFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LidToevoegenPage]
})
export class LidToevoegenPageModule {
}
