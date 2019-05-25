import {browser, by, element} from 'protractor';

export class AppPage {
  navigateTo(destination) {
    return browser.get(destination);
  }

  getTitle() {
    return browser.getTitle();
  }

  getPageOneTitleText() {
    return element(by.tagName('lg-home')).element(by.deepCss('ion-title')).getText();
  }
}
