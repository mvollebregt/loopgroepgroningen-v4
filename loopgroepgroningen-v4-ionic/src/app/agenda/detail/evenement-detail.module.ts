import {NgModule} from '@angular/core';
import {EvenementDetailPage} from './evenement-detail.page';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';

const routes: Routes = [
  {path: '', component: EvenementDetailPage}
];

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EvenementDetailPage]
})
export class EvenementDetailPageModule {

}
