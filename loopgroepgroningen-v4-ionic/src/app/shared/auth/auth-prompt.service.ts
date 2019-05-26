import {Injectable} from '@angular/core';
import {ModalController, ToastController} from '@ionic/angular';
import {SignInFormComponent} from './sign-in-form/sign-in-form.component';
import {AuthService} from './auth.service';
import {filter, tap} from 'rxjs/operators';
import {fromPromise} from 'rxjs/internal-compatibility';
import UserCredential = firebase.auth.UserCredential;

@Injectable()
export class AuthPromptService {

  constructor(
    private modalController: ModalController,
    private toastController: ToastController,
    private authService: AuthService) {
  }

  promptWheneverSignedOut(): void {
    this.authService.getCurrentUser().pipe(
      filter(user => !user),
      tap(() => fromPromise(this.promptSignIn()))
    ).subscribe();
  }

  private async promptSignIn(): Promise<UserCredential> {
    let userCredentials: UserCredential | null = null;
    let errorCode: string | null = null;
    while (!userCredentials) {
      const modal = await this.modalController.create({
        component: SignInFormComponent,
        componentProps: {errorCode}
      });
      await modal.present();
      const {data} = await modal.onDidDismiss();
      // TODO: wat als data === null?
      try {
        userCredentials = await this.authService.signIn(data);
        const toast = await this.toastController.create({
          message: 'Je bent ingelogd',
          duration: 2000
        });
        toast.present();
      } catch (error) {
        errorCode = error.code;
      }
    }
    return userCredentials;
  }
}
