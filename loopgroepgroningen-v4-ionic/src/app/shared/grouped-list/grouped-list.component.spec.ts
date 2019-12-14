import {Component, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {GroupedListComponent} from './grouped-list.component';

@Component({
  template: `
    <lg-grouped-list [items]="items" [getGroupName]="getGroupName">
      <ion-item>
        <ng-template let-item>
          {{item}}
        </ng-template>
      </ion-item>
    </lg-grouped-list>`
})
class TestHostComponent {
  items: string[];
  getGroupName: (item: string) => string;
}

describe('GroupedListComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestHostComponent, GroupedListComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should group items in a list', () => {
    component.items = ['Aap', 'Ark', 'Boek'];
    component.getGroupName = item => item[0];
    fixture.detectChanges();
    const headersAndItems = Array.from<HTMLElement>(
      fixture.nativeElement.querySelectorAll('ion-list-header, ion-item')
    ).map(element => [element.tagName.toLowerCase(), element.textContent.trim()]);
    expect(headersAndItems).toEqual([
      ['ion-list-header', 'A'],
      ['ion-item', 'Aap'],
      ['ion-item', 'Ark'],
      ['ion-list-header', 'B'],
      ['ion-item', 'Boek']
    ]);
  });
});
