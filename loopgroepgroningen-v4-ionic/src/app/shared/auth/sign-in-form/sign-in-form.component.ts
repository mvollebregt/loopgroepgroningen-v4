import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'lg-sign-in-form',
  templateUrl: './sign-in-form.component.html'
})
export class SignInFormComponent {

  form: FormGroup;
  errorCode: string;

  constructor(private modalController: ModalController, fb: FormBuilder) {
    this.form = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onCancel() {
    this.modalController.dismiss(null);
  }

  onSubmit() {
    this.modalController.dismiss(this.form.value);
  }

}
