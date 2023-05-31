import {Component, OnInit} from '@angular/core';
import {MessageService} from 'primeng/api';
import {IUser} from "../../../models/users";
import {AuthService} from "../../../srevices/auth/auth.service";
import {ConfigService} from "../../../srevices/config/config.service";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {ServerError} from "../../../models/error";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  login: string
  psw: string
  pswRepeat: string
  email: string
  cardNumber: string
  click: boolean
  showCardNumber: boolean
  saveUserInStore: boolean = false

  constructor(private messageService: MessageService, private authService: AuthService, private http: HttpClient) {
  }

  ngOnInit(): void {
    this.showCardNumber = ConfigService.config.useUserCard
    this.click = false
  }

  registration(ev: Event): boolean | void {
    if (this.psw !== this.pswRepeat) {
      this.messageService.add({severity: 'error', summary: 'Password mismatch'});
      return false
    }

    const userObj: IUser = {
      login: this.login,
      psw: this.psw,
      email: this.email,
      cardNumber: this.cardNumber
    }

    this.http.post<IUser>('http://localhost:3000/users/', userObj).subscribe((data) => {
      if (this.saveUserInStore) {
      const objUserJsonStr = JSON.stringify(userObj);
      window.localStorage.setItem('user_' + userObj.login, objUserJsonStr);
      }
      this.messageService.add({severity: 'success', summary: 'Регистрация прошла успешно'});

    }, (err: HttpErrorResponse) => {
      console.log('err', err)
      const serverError = <ServerError>err.error
      this.messageService.add({severity: 'warn', summary: serverError.errorText});
    });

    // if (!this.authService.isUserExists(userObj)) {
    //   this.authService.setUser(userObj)
    //   this.messageService.add({severity: 'success', summary: 'Success'});
    // } else {
    //   this.messageService.add({severity: 'warn', summary: 'User already registered'});
    // }
  }

  saveInLocalStorage(): boolean | void {
    if (!this.click) {
      const userObj: IUser = {
        login: this.login,
        psw: this.psw,
        email: this.email,
        cardNumber: this.cardNumber
      }
      if (!this.authService.isUserExistsInLocalStorage(userObj)) {
        if (userObj.login && userObj.psw) {
          this.authService.setUserInLocalStorage(userObj)
          this.messageService.add({severity: 'success', summary: 'Success'});
        }
        if (userObj.login == null || userObj.psw == null) {
          this.messageService.add({severity: 'error', summary: 'Error'});
        }
      } else {
        this.messageService.add({severity: 'warn', summary: 'User already registered'});
      }
    }
  }
}
