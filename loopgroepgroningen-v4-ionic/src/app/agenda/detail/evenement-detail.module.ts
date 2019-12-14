import {NgModule} from '@angular/core';
import {EvenementDetailPage} from './evenement-detail.page';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../shared/shared.module';

const routes: Routes = [
  {path: '', component: EvenementDetailPage}
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EvenementDetailPage]
})
export class EvenementDetailPageModule {

}
