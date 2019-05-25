import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DatePipe} from './date.pipe';

const exports = [DatePipe];

@NgModule({
  declarations: exports,
  imports: [CommonModule],
  exports
})
export class FormattingModule {
}