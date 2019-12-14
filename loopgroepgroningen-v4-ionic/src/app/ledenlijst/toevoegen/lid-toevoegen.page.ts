import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'lg-toevoegen',
  templateUrl: './lid-toevoegen.page.html'
})
export class LidToevoegenPage {

  form: FormGroup;

  constructor(fb: FormBuilder) {
    this.form = fb.group({
      voornaam: ['', Validators.required],
      achternaam: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {
    console.log(this.form.value);
  }

}
