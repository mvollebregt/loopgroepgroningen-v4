import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BeheerPage} from './beheer.page';

describe('BeheerPage', () => {
  let component: BeheerPage;
  let fixture: ComponentFixture<BeheerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BeheerPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeheerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
