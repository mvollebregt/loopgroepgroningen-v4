import {Component, forwardRef, Input, OnDestroy} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
  ValidatorFn
} from '@angular/forms';
import {skip, take, takeUntil, tap} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'lg-input',
  templateUrl: './input.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    }]
})
export class InputComponent implements ControlValueAccessor, Validator, OnDestroy {

  @Input() label: string;
  @Input() error: string;
  @Input() type = 'text';

  control: AbstractControl;

  private errors = new Subject<ValidationErrors | null>();
  private validator: ValidatorFn;
  private destroy = new Subject<void>();
  private onBlur: () => any;

  constructor() {
    this.control = new FormControl(null, null, () => this.errors.pipe(skip(1), take(1)));
  }

  registerOnChange(fn: any): void {
    this.control.valueChanges.pipe(
      tap(() => this.errors.next(this.validator(this.control))),
      takeUntil(this.destroy)
    ).subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    this.onBlur = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.control.disable();
    } else {
      this.control.enable();
    }
  }

  writeValue(obj: any): void {
    this.control.setValue(obj);
  }

  registerOnValidatorChange(fn: () => void): void {
  }

  validate(control: AbstractControl): ValidationErrors | null {
    if (control.validator) {
      this.validator = control.validator;
      this.errors.next(this.validator(this.control));
    }
    return null;
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

}
