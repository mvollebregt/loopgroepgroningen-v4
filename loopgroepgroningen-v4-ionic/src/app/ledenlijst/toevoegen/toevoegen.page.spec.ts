import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ToevoegenPage} from './toevoegen.page';

describe('ToevoegenPage', () => {
  let component: ToevoegenPage;
  let fixture: ComponentFixture<ToevoegenPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ToevoegenPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToevoegenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
