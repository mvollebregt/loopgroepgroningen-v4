import {Component, OnDestroy, OnInit} from '@angular/core';
import {EvenementService} from '../evenement.service';
import {ActivatedRoute} from '@angular/router';
import {filter, map, switchMap, takeUntil} from 'rxjs/operators';
import {Evenement} from '../../api'
import {Destroyable} from '../../shared/components/destroyable';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'lg-evenement-detail',
  templateUrl: './evenement-detail.page.html'
})
export class EvenementDetailPage extends Destroyable implements OnInit, OnDestroy {

  evenement: Evenement | undefined;

  formGroup: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private evenementService: EvenementService,
    private fb: FormBuilder
  ) {
    super();
  }

  ngOnInit() {
    this.activatedRoute.paramMap.pipe(
      map(paramMap => paramMap.get('id')),
      filter(id => !!id),
      switchMap((id: string) => this.evenementService.get(id)),
      takeUntil(this.destroy)
    ).subscribe(evenement => {
      this.evenement = evenement;
      this.buildForm();
    });
  }

  private buildForm() {
    const deelname = this.evenement && this.evenement.deelname;
    this.formGroup = this.fb.group({
      neemtDeel: !!deelname && deelname.neemtDeel,
      eigenAuto: deelname && deelname.eigenAuto,
      rijdtMee: deelname && deelname.rijdtMee,
      eigenGelegenheid: deelname && deelname.eigenGelegenheid,
      fiets: deelname && deelname.fiets
    });
    this.formGroup.valueChanges.subscribe(value => {
      if (this.evenement) {
        this.evenementService.saveDeelname(this.evenement.id, value);
      }
    });
  }
}
