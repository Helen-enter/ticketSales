import {Injectable} from '@angular/core';
import {IUser} from "../../models/users";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: IUser;
  private token: string

  constructor() {
  }


  getUser(): IUser {
    console.log('user', this.user)
    return this.user

    // возвращается user
  };


  setUser(user: IUser) {
    let key = window.localStorage.getItem('user_' + user.login)
    if (key) {
      this.user = JSON.parse(key)
      console.log(key)
    }
    // this.user = user
    // записывается пользователь в this.user
  };

  setToken(token: string): void {
    this.token = token
  }

  getToken(): string {
    return this.token
  }

}
