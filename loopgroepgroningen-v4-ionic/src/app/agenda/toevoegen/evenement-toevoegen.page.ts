import {Component, HostListener} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {EvenementService} from '../evenement.service';

@Component({
  selector: 'lg-toevoegen',
  templateUrl: './evenement-toevoegen.page.html'
})
export class EvenementToevoegenPage {

  form: FormGroup;

  constructor(private evenementService: EvenementService, private router: Router, fb: FormBuilder) {
    this.form = fb.group({
      datum: ['', Validators.required],
      naam: ['', Validators.required],
    });
  }

  onSubmit(): void {
    this.evenementService.save(this.form.value);
    this.back();
  }

  @HostListener('document:keydown.escape', ['$event'])
  back() {
    this.router.navigate(['/agenda']);
  }
}
