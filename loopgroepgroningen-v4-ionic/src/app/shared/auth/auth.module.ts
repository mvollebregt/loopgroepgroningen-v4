import {NgModule} from '@angular/core';
import {SignInFormComponent} from './sign-in-form/sign-in-form.component';
import {SharedModule} from '../shared.module';
import {LgFormsModule} from '../lg-forms/lg-forms.module';
import {AuthPromptService} from './auth-prompt.service';

@NgModule({
  declarations: [SignInFormComponent],
  entryComponents: [SignInFormComponent],
  imports: [SharedModule, LgFormsModule],
  providers: [AuthPromptService]
})
export class AuthModule {
}
