import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../../srevices/auth/auth.service";
import {IUser} from "../../../models/users";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {UserService} from 'src/app/srevices/user/user.service';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {ServerError} from "../../../models/error";

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})

export class AuthorizationComponent implements OnInit, OnDestroy {
  psw: string
  login: string
  selectedValue: boolean
  cardNumber: string
  authTextButton: string

  constructor(private authService: AuthService,
              private messageService: MessageService,
              private router: Router,
              private userService: UserService,
              private http: HttpClient) {

  }

  ngOnInit(): void {
    this.authTextButton = 'Log in'
  }

  ngOnDestroy(): void {
    console.log('destroy')
  }

  vipStatusSelected(): void {

  }

  onAuth(ev: Event): void {
    const authUser: IUser = {
      psw: this.psw,
      login: this.login,
      cardNumber: this.cardNumber
    }
    // if (this.authService.checkUser(authUser)) {
    //   this.userService.setUser(authUser)
    //   this.userService.setToken('user-private-token')
    //   this.router.navigate(['tickets/tickets-list'])
    // } else {
    //  this.messageService.add({severity: 'error', summary: 'Check the entered data'})
    // }


    this.http.post<{ access_token: string, id: string }>('http://localhost:3000/users/' + authUser.login, authUser).subscribe((data) => {
      console.log('token', data.access_token)
      authUser.id = data.id
      this.userService.setUser(authUser);
      const token: string = data.access_token;
      //const token = 'user-private-token'
      this.userService.setToken(token);
      this.userService.setToStore(token); //не используется


      this.router.navigate(['tickets/tickets-list']);

    }, (err: HttpErrorResponse) => {
      const serverError = <ServerError>err.error
      this.messageService.add({severity: 'warn', summary: serverError.errorText});
      //this.messageService.add({severity: 'warn', summary: "Ошибка"});
    });

  }

}
