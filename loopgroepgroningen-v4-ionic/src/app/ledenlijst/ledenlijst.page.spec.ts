import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LedenlijstPage} from './ledenlijst.page';

describe('LedenlijstPage', () => {
  let component: LedenlijstPage;
  let fixture: ComponentFixture<LedenlijstPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LedenlijstPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LedenlijstPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
