import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../../srevices/auth/auth.service";
import {IUser} from "../../../models/users";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";
import { UserService } from 'src/app/srevices/user/user.service';

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
              private userService: UserService) {

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
      login: this.login
    }
    if (this.authService.checkUser(authUser)) {
      this.userService.setUser(authUser)
      this.router.navigate(['tickets/tickets-list'])
    } else {
     this.messageService.add({severity: 'error', summary: 'Check the entered data'})
    }

  }

}
