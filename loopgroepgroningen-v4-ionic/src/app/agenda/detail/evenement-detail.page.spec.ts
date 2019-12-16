import {NO_ERRORS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {EvenementDetailPage} from './evenement-detail.page';
import {ActivatedRoute} from '@angular/router';
import {EvenementService} from '../evenement.service';
import {of} from 'rxjs';
import {ReactiveFormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import createSpyObj = jasmine.createSpyObj;

describe('EvenementDetailPage', () => {

  let component: EvenementDetailPage;
  let fixture: ComponentFixture<EvenementDetailPage>;

  const paramMap = new URLSearchParams();
  paramMap.append('id', 'evenement-id');

  const activatedRoute = {paramMap: of(paramMap)};
  const evenementService = createSpyObj<EvenementService>('EvenementService', ['get']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EvenementDetailPage],
      imports: [ReactiveFormsModule, IonicModule],
      providers: [
        {provide: ActivatedRoute, useValue: activatedRoute},
        {provide: EvenementService, useValue: evenementService}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvenementDetailPage);
    component = fixture.componentInstance;
    evenementService.get.and.returnValue(of({datum: '1976-07-13', naam: 'De dag der dagen', auto: true}));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('moet evenementdetails tonen', () => {
    expect(fixture.nativeElement.querySelector('ion-card-title').textContent).toContain('De dag der dagen');
    expect(fixture.nativeElement.querySelector('ion-card-subtitle').textContent).toContain('1976');
    const toggles = fixture.nativeElement.querySelectorAll('ion-toggle');
    expect(toggles.length).toBe(1);
  });
});
