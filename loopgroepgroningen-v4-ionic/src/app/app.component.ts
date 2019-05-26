import {Component} from '@angular/core';

import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {PageService} from './shared/page/page.service';
import {AuthService} from './shared/auth/auth.service';
import {AuthPromptService} from './shared/auth/auth-prompt.service';
import {User} from 'firebase';
import {Observable} from 'rxjs';

@Component({
  selector: 'lg-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  appPages = [
    {title: 'Home', url: '/home', icon: 'home'},
    {title: 'List', url: '/list', icon: 'list'},
    {title: 'Agenda', url: '/agenda', icon: 'calendar'},
    {title: 'Ledenlijst', url: '/ledenlijst', icon: 'contacts'}
  ];

  currentUser: Observable<User | null>;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authPromptService: AuthPromptService,
    public authService: AuthService,
    public PageService: PageService,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.authPromptService.promptWheneverSignedOut();
    });
  }
}
