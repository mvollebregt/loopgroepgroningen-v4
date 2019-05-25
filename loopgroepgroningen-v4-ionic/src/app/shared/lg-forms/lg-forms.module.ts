import {NgModule} from '@angular/core';
import {SharedModule} from '../shared.module';
import {ReactiveFormsModule} from '@angular/forms';
import {InputComponent} from './input.component';

const exports = [InputComponent];

@NgModule({
  declarations: exports,
  imports: [ReactiveFormsModule, SharedModule],
  exports: [ReactiveFormsModule, ...exports]
})
export class LgFormsModule {
}
