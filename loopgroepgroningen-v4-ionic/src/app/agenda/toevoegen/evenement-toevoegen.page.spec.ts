import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EvenementToevoegenPage} from './evenement-toevoegen.page';

describe('ToevoegenPage', () => {
  let component: EvenementToevoegenPage;
  let fixture: ComponentFixture<EvenementToevoegenPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EvenementToevoegenPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvenementToevoegenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
