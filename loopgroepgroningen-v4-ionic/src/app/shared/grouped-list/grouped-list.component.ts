import {Component, ContentChild, Input, OnChanges, SimpleChanges, TemplateRef} from '@angular/core';

interface Group<T> {
  name: string;
  items: T[];
}

@Component({
  selector: 'lg-grouped-list',
  templateUrl: './grouped-list.component.html'
})
export class GroupedListComponent<T> implements OnChanges {

  @Input() items: T[];
  @Input() getGroupName: (item: T) => string;

  @ContentChild(TemplateRef) passedInTemplate: TemplateRef<any>;

  groups: Group<T>[];

  ngOnChanges(changes: SimpleChanges): void {
    this.groups = [];
    if (this.items) {
      let group: Group<T> = {name: '', items: []};
      for (const item of this.items) {
        const groupName = this.getGroupName(item);
        if (!group || group.name !== groupName) {
          group = {name: groupName, items: [item]};
          this.groups.push(group);
        } else {
          group.items.push(item);
        }
      }
    }
  }
}
