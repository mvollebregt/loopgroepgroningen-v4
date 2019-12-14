import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EvenementToevoegenPage} from './evenement-toevoegen.page';
import {SharedModule} from '../../shared/shared.module';
import {LgFormsModule} from '../../shared/lg-forms/lg-forms.module';

const routes: Routes = [
  {path: '', component: EvenementToevoegenPage}
];

@NgModule({
  imports: [
    SharedModule,
    LgFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EvenementToevoegenPage]
})
export class EvenementToevoegenPageModule {
}
