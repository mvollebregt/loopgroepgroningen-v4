import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {PageService} from './page.service';

@Component({
  selector: 'lg-page',
  templateUrl: './page.component.html'
})
export class PageComponent implements OnChanges {

  @Input() pageTitle: string;
  @Input() back: string;

  @Input() actionIcon: string;
  @Input() actionRouterLink: string;
  @Input() actionTitle: string;

  constructor(private pageService: PageService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.actionIcon || changes.actionRouterLink || changes.actionTitle) {
      this.pageService.setAction(
        this.actionIcon ? {
          icon: this.actionIcon,
          routerLink: this.actionRouterLink,
          title: this.actionTitle
        } : null);
    }
  }
}
