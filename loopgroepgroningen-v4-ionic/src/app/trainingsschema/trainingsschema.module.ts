import {NgModule} from '@angular/core';
import {TrainingsschemaPage} from './trainingsschema.page';
import {SharedModule} from '../shared/shared.module';
import {RouterModule, Routes} from '@angular/router';
import {DateTimeModule} from '../shared/datetime/date-time.module';

const routes: Routes = [
  {path: '', component: TrainingsschemaPage}
];

@NgModule({
  declarations: [TrainingsschemaPage],
  imports: [SharedModule, RouterModule.forChild(routes), DateTimeModule]
})
export class TrainingsschemaPageModule {
}
