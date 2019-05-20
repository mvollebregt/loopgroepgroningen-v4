import {NO_ERRORS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AgendaPage} from './agenda.page';
import {EvenementService} from './evenement.service';
import {Subject} from 'rxjs';
import {Evenement} from '../api';
import {FormattingModule} from '../shared/formatting/formatting.module';
import {GroupedListModule} from '../shared/grouped-list/grouped-list.module';
import createSpyObj = jasmine.createSpyObj;

describe('AgendaPage', () => {

  let component: AgendaPage;
  let fixture: ComponentFixture<AgendaPage>;
  const evenementen = new Subject<Evenement[]>();

  beforeEach(async(() => {
    const evenementServiceSpy = createSpyObj('EvenementService', ['getEvenementen']);
    evenementServiceSpy.getEvenementen.and.returnValue(evenementen);

    TestBed.configureTestingModule({
      declarations: [AgendaPage],
      providers: [{provide: EvenementService, useValue: evenementServiceSpy}],
      imports: [FormattingModule, GroupedListModule],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgendaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('moet de geladen evenementen tonen', () => {
    evenementen.next([
      {datum: '1976-07-13', naam: 'Geboorte van een topper'},
      {datum: '1976-07-14', naam: 'Een dag later'}
    ]);
    fixture.detectChanges();
    const items = fixture.nativeElement.querySelectorAll('ion-item');
    expect(items.length).toBe(2);
    expect(items[0].textContent).toContain('13');
    expect(items[0].textContent).toContain('Geboorte van een topper');
    expect(items[1].textContent).toContain('14');
    expect(items[1].textContent).toContain('Een dag later');
  });
});
